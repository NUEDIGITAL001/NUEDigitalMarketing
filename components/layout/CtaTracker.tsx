"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * One delegated listener for CTA, phone and email clicks so individual
 * links stay server components. Links opt in with data-cta="label".
 */
export function CtaTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("click_phone", { page_location: location.pathname });
      else if (href.startsWith("mailto:")) track("click_email", { page_location: location.pathname });
      const label = a.dataset.cta;
      if (label) track("cta_click", { cta_label: label, cta_href: href, page_location: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
