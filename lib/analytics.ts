/**
 * Single tracking helper. Pushes to the GTM dataLayer when GTM is
 * configured (NEXT_PUBLIC_GTM_ID); otherwise a no-op. Event names follow
 * the foundation doc, section 8.
 */
export type TrackEvent =
  | "generate_lead"
  | "qualified_inquiry"
  | "click_phone"
  | "click_email"
  | "cta_click"
  | "form_start"
  | "service_engagement"
  | "scene_view";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  if (!Array.isArray(w.dataLayer)) return;
  w.dataLayer.push({ event, ...params });
}
