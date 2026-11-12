/**
 * Contact form logic, shared by the browser (types only) and the
 * Cloudflare Pages Function in functions/api/contact.ts that sends the
 * email. Nothing here may import from Next.js or Node.
 */
export type ContactField = "name" | "phone" | "email" | "business" | "location" | "website" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

export type ContactEnv = { RESEND_API_KEY?: string; CONTACT_TO_EMAIL?: string; CONTACT_FROM_EMAIL?: string };

const LIMITS: Record<ContactField, number> = { name: 120, phone: 40, email: 200, business: 160, location: 160, website: 300, message: 5000 };

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Validates an inquiry and sends it to the private inbox in
 * CONTACT_TO_EMAIL through the Resend API. The destination address lives
 * only in the host's encrypted settings and never reaches the browser.
 */
export async function handleContact(get: (name: string) => unknown, env: ContactEnv): Promise<ContactState> {
  // honeypot: real visitors never see or fill this field
  if (clean(get("company_url"), 200)) return { status: "success" };

  const v = Object.fromEntries((Object.keys(LIMITS) as ContactField[]).map((k) => [k, clean(get(k), LIMITS[k])])) as Record<ContactField, string>;

  const errors: ContactState["errors"] = {};
  if (!v.name) errors.name = "Please enter your name.";
  if (!v.email) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = "Please enter a valid email address.";
  if (!v.phone) errors.phone = "Please enter a phone number.";
  else if (v.phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a full phone number.";
  if (!v.business) errors.business = "Please enter your business name.";
  if (!v.location) errors.location = "Please enter where your business is located.";
  if (!v.message) errors.message = "Tell us a little about what you are working through.";
  if (Object.keys(errors).length) return { status: "error", errors, values: v, message: "Please fix the highlighted fields." };

  const key = env.RESEND_API_KEY;
  // One address, or several separated by commas.
  const to = (env.CONTACT_TO_EMAIL ?? "").split(",").map((a) => a.trim()).filter(Boolean);
  const from = env.CONTACT_FROM_EMAIL || "NÜE Digital Website <website@mail.nuedigitalmarketing.com>";
  if (!key || to.length === 0) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not configured");
    return { status: "error", values: v, message: "Sorry, the form is not connected yet. Please call or email us instead." };
  }

  const rows: [string, string][] = [
    ["Name", v.name], ["Phone", v.phone], ["Email", v.email], ["Business", v.business], ["Location", v.location], ["Website", v.website || "(not provided)"],
  ];
  const html = `<h2>New website inquiry</h2><table>${rows.map(([k, val]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(val)}</td></tr>`).join("")}</table><h3>Message</h3><p>${escapeHtml(v.message).replace(/\n/g, "<br>")}</p>`;
  const text = `${rows.map(([k, val]) => `${k}: ${val}`).join("\n")}\n\nMessage:\n${v.message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, reply_to: v.email, subject: `Website inquiry: ${v.business} (${v.name})`, html, text }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      throw new Error("send failed");
    }
  } catch {
    return { status: "error", values: v, message: "Sorry, something went wrong sending your message. Please try again." };
  }
  return { status: "success" };
}
