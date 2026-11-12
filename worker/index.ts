import { handleContact, type ContactEnv, type ContactState } from "../lib/contact";

/**
 * Cloudflare Worker entry. The static site in out/ is served by Cloudflare
 * directly; only /api/* reaches this code (see wrangler.jsonc). Everything
 * else is handed to the static assets.
 *
 * RESEND_API_KEY and CONTACT_TO_EMAIL are encrypted secrets set in the
 * Cloudflare dashboard, never in this repository.
 */
type Env = ContactEnv & { ASSETS: { fetch(request: Request): Promise<Response> } };

const json = (body: ContactState, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

async function contact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });
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

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/contact" || pathname === "/api/contact/") return contact(request, env);
    if (pathname.startsWith("/api/")) return new Response("Not found", { status: 404 });
    return env.ASSETS.fetch(request);
  },
};

export default worker;
