import { handleContact, type ContactEnv, type ContactState } from "../../lib/contact";

/**
 * POST /api/contact — Cloudflare Pages Function behind the contact form.
 * RESEND_API_KEY and CONTACT_TO_EMAIL are set as encrypted variables in
 * the Cloudflare dashboard, never in this repository.
 */
const json = (body: ContactState, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export async function onRequestPost({ request, env }: { request: Request; env: ContactEnv }): Promise<Response> {
  // Only accept submissions sent from this site's own pages.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ status: "error", message: "Sorry, that request was not accepted." }, 403);
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ status: "error", message: "Sorry, we could not read that submission. Please try again." }, 400);
  }
  return json(await handleContact((name) => form.get(name), env));
}

export const onRequest = () => new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });
