"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { track } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP = "(min-width: 1024px)";
const OS_REDUCE = "(prefers-reduced-motion: reduce)";

function reduced() {
  return document.documentElement.classList.contains("reduce-motion") || matchMedia(OS_REDUCE).matches;
}

/**
 * All homepage motion lives here. The page is fully readable without it:
 * GSAP only sets start states once it has loaded, pins are desktop only,
 * and everything is reverted when the visitor reduces motion.
 */
export function HomeMotion() {
  useEffect(() => {
    const root = document.documentElement;
    let ctx: gsap.Context | null = null;
    let mm: gsap.MatchMedia | null = null;

    // analytics, independent of motion
    const sceneTriggers = gsap.utils.toArray<HTMLElement>("[data-scene]").map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        once: true,
        onEnter: () => track("scene_view", { scene: el.dataset.scene }),
      }),
    );

    const build = () => {
      ctx?.revert();
      mm?.revert();
      ctx = null;
      mm = null;
      if (reduced()) {
        root.classList.remove("motion-pending");
        ScrollTrigger.refresh();
        return;
      }

      ctx = gsap.context(() => {
        // Scene 01 intro
        const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
        const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");
        const bars = gsap.utils.toArray<SVGElement>(".hero-e [data-e-bar]");
        gsap.set(lines, { y: 0, yPercent: 105 });
        gsap.set(fades, { opacity: 0, y: 16 });
        gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
        root.classList.remove("motion-pending");
        gsap
          .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
          .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.12 })
          .to(bars, { scaleX: 1, duration: 0.9, stagger: 0.1 }, 0.2)
          .to(fades, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.45);

        // Scene 01 parallax layers
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amt = parseFloat(el.dataset.parallax || "0.1");
          gsap.to(el, {
            yPercent: amt * 100,
            ease: "none",
            scrollTrigger: { trigger: "#scene-opening", start: "top top", end: "bottom top", scrub: true },
          });
        });

        // Generic reveals
        gsap.set("[data-reveal]", { opacity: 0, y: 28 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 88%",
          once: true,
          onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }),
        });

        // Scene 03: E bars extend into the columns
        gsap.from("[data-diff-bar]", {
          scaleX: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.15,
          scrollTrigger: { trigger: "#scene-difference", start: "top 65%", once: true },
        });

        // Scene 06: schematic flows left to right
        gsap.from("[data-measure-item]", {
          opacity: 0,
          x: -12,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: { trigger: "#scene-measurement", start: "top 60%", once: true },
        });

        // Scene 07: E mark builds
        gsap.from(".conv-e [data-e-bar]", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "#scene-conversion", start: "top 70%", once: true },
        });
      });

      mm = gsap.matchMedia();

      // Desktop: pinned Scenes 02 and 04
      mm.add(DESKTOP, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-challenge]");
        const links = gsap.utils.toArray<SVGLineElement>("[data-link]");
        const nodes = gsap.utils.toArray<SVGGElement>("[data-node]");
        const marks = gsap.utils.toArray<HTMLElement>("[data-challenge-bar]");
        gsap.set(links, { strokeDashoffset: 1 });
        gsap.set(nodes, { opacity: 0.5 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "[data-challenge-pin]",
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 0.6,
          },
        });
        items.forEach((_, i) => {
          tl.to(marks[i], { scaleY: 1, duration: 0.4 }, i)
            .to(nodes[i], { opacity: 1, duration: 0.4 }, i)
            .to(links[i], { strokeDashoffset: 0, duration: 0.8 }, i + 0.1);
          if (i > 0) tl.to(marks[i - 1], { opacity: 0.35, duration: 0.3 }, i);
        });
        tl.to("[data-broken]", { opacity: 0, duration: 0.6 }, items.length - 0.6);

        const track = document.querySelector<HTMLElement>("[data-method-track]");
        if (track) {
          const distance = () => Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth ?? window.innerWidth));
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: "[data-method-pin]",
                start: "top top",
                end: () => `+=${distance() + window.innerHeight * 0.4}`,
                pin: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
                  },
            })
            .to(track, { x: () => -distance() }, 0)
            .fromTo("[data-method-progress]", { scaleX: 0 }, { scaleX: 1 }, 0);
        }
      });

      // Smaller screens: draw the network once, no pins
      mm.add(`not all and ${DESKTOP}`, () => {
        gsap.fromTo(
          "[data-link]",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: { trigger: "#scene-challenge figure", start: "top 75%", once: true },
          },
        );
      });

      ScrollTrigger.refresh();
    };

    build();
    const os = matchMedia(OS_REDUCE);
    window.addEventListener("nue:motion-change", build);
    os.addEventListener("change", build);
    return () => {
      window.removeEventListener("nue:motion-change", build);
      os.removeEventListener("change", build);
      ctx?.revert();
      mm?.revert();
      sceneTriggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}
