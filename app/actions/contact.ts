"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
};

type Field = "name" | "phone" | "email" | "business" | "location" | "website" | "message";

const LIMITS: Record<Field, number> = {
  name: 120,
  phone: 40,
  email: 200,
  business: 160,
  location: 160,
  website: 300,
  message: 5000,
};

function clean(v: FormDataEntryValue | null, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/**
 * Sends a contact inquiry to the private inbox in CONTACT_TO_EMAIL via the
 * Resend API. The destination address only lives in server env vars and is
 * never rendered or sent to the browser.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // honeypot: real visitors never see or fill this field
  if (clean(formData.get("company_url"), 200)) return { status: "success" };

  const v = Object.fromEntries(
    (Object.keys(LIMITS) as Field[]).map((k) => [k, clean(formData.get(k), LIMITS[k])]),
  ) as Record<Field, string>;

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

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "NÜE Digital Website <onboarding@resend.dev>";
  if (!key || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not configured");
    return {
      status: "error",
      values: v,
      message: "Sorry, the form is not connected yet. Please try again later.",
    };
  }

  const rows: [string, string][] = [
    ["Name", v.name],
    ["Phone", v.phone],
    ["Email", v.email],
    ["Business", v.business],
    ["Location", v.location],
    ["Website", v.website || "(not provided)"],
  ];
  const html = `<h2>New website inquiry</h2><table>${rows
    .map(([k, val]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(val)}</td></tr>`)
    .join("")}</table><h3>Message</h3><p>${escapeHtml(v.message).replace(/\n/g, "<br>")}</p>`;
  const text = `${rows.map(([k, val]) => `${k}: ${val}`).join("\n")}\n\nMessage:\n${v.message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: v.email,
        subject: `Website inquiry: ${v.business} (${v.name})`,
        html,
        text,
      }),
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
