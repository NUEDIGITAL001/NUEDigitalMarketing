"use client";

import { useSyncExternalStore } from "react";

const KEY = "nue-reduce-motion";

function subscribe(cb: () => void) {
  window.addEventListener("nue:motion-change", cb);
  return () => window.removeEventListener("nue:motion-change", cb);
}
const getSnapshot = () => document.documentElement.classList.contains("reduce-motion");
const getServerSnapshot = () => false;

/**
 * A visible "Reduce motion" switch for visitors who have not set the OS
 * preference. Adds html.reduce-motion and notifies GSAP code through a
 * custom event. The preference is a per-viewer convenience (localStorage).
 */
export function ReduceMotionToggle() {
  const on = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !on;
    document.documentElement.classList.toggle("reduce-motion", next);
    try {
      localStorage.setItem(KEY, next ? "1" : "0");
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new CustomEvent("nue:motion-change"));
  };

  return (
    <button type="button" onClick={toggle} aria-pressed={on} className="hover:text-white">
      {on ? "Motion reduced" : "Reduce motion"}
    </button>
  );
}

/** Inline script for <head>: applies the saved preference before first paint. */
export const reduceMotionBootScript = `(function(){var d=document.documentElement,r=false;try{r=localStorage.getItem("${KEY}")==="1"}catch(e){}if(r)d.classList.add("reduce-motion");if(!r&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("motion-pending");setTimeout(function(){d.classList.remove("motion-pending")},2500)}})()`;
