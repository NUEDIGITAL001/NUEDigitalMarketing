"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { NueLogo } from "@/components/brand/NueLogo";
import { approach, industries, services } from "@/lib/site";

type MenuKey = "services" | "industries" | "approach" | null;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<MenuKey>(null);
  const [drawer, setDrawer] = useState(false);
  const lastY = useRef(0);
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > 240 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const hoverOpen = (k: MenuKey) => {
    if (intent.current) clearTimeout(intent.current);
    intent.current = setTimeout(() => setOpen(k), 120);
  };
  const hoverClose = () => {
    if (intent.current) clearTimeout(intent.current);
    intent.current = setTimeout(() => setOpen(null), 180);
  };

  const solid = scrolled || open !== null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-(--dur-ui) ease-(--ease-out-expo) ${
        hidden && !open && !drawer ? "-translate-y-full" : "translate-y-0"
      } ${solid ? "bg-carbon/95 border-b border-graphite backdrop-blur-sm" : "bg-transparent border-b border-transparent"}`}
    >
      <nav ref={navRef} aria-label="Primary" className="container-nue flex h-18 items-center justify-between gap-6">
        <Link href="/" aria-label="NÜE Digital home" className="shrink-0" onClick={close}>
          <NueLogo className="h-9 w-auto lg:h-10" title={null} />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          <MenuTrigger label="Services" k="services" open={open} setOpen={setOpen} hoverOpen={hoverOpen} hoverClose={hoverClose}>
            <MegaPanel title="Services" cols={2} links={services} footer={{ label: "Serving Rochester, NY", href: "/rochester-ny/" }} onNavigate={close} />
          </MenuTrigger>
          <MenuTrigger label="Industries" k="industries" open={open} setOpen={setOpen} hoverOpen={hoverOpen} hoverClose={hoverClose}>
            <MegaPanel
              title="Industries"
              cols={2}
              links={industries.map((i) => ({ label: i.label, href: i.href, blurb: i.challenge }))}
              footer={{ label: "All industries", href: "/industries/" }}
              onNavigate={close}
            />
          </MenuTrigger>
          <MenuTrigger label="Approach" k="approach" open={open} setOpen={setOpen} hoverOpen={hoverOpen} hoverClose={hoverClose}>
            <MegaPanel title="Approach" cols={1} links={approach} onNavigate={close} />
          </MenuTrigger>
          <li>
            <Link href="/insights/" className="ui-text px-4 py-2 text-concrete hover:text-white">
              Insights
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/contact/"
            data-cta="header-start-conversation"
            className="sheen ui-text hidden rounded-xs bg-teal px-5 py-2.5 font-semibold text-obsidian hover:bg-ice sm:inline-flex"
          >
            Start a Conversation
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={drawer}
            aria-controls="mobile-drawer"
            aria-label={drawer ? "Close menu" : "Open menu"}
            onClick={() => setDrawer((d) => !d)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              {drawer ? (
                <path d="M5 5l14 14M19 5L5 19" stroke="white" strokeWidth="1.5" />
              ) : (
                <>
                  <rect x="3" y="5" width="18" height="2" fill="var(--color-teal)" />
                  <rect x="3" y="11" width="16" height="2" fill="white" />
                  <rect x="3" y="17" width="18" height="2" fill="var(--color-teal)" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </header>
  );
}

function MenuTrigger({
  label,
  k,
  open,
  setOpen,
  hoverOpen,
  hoverClose,
  children,
}: {
  label: string;
  k: Exclude<MenuKey, null>;
  open: MenuKey;
  setOpen: (k: MenuKey) => void;
  hoverOpen: (k: MenuKey) => void;
  hoverClose: () => void;
  children: React.ReactNode;
}) {
  const isOpen = open === k;
  const id = `menu-${k}`;
  return (
    <li onMouseEnter={() => hoverOpen(k)} onMouseLeave={hoverClose} className="static">
      <button
        type="button"
        className={`ui-text flex items-center gap-2 px-4 py-2 ${isOpen ? "text-white" : "text-concrete hover:text-white"}`}
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(isOpen ? null : k);
        }}
      >
        {label}
        <svg viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true">
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      <div
        id={id}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-b border-graphite bg-carbon"
      >
        {children}
      </div>
    </li>
  );
}

function MegaPanel({
  title,
  links,
  cols,
  footer,
  onNavigate,
}: {
  title: string;
  links: { label: string; href: string; blurb?: string }[];
  cols: 1 | 2;
  footer?: { label: string; href: string };
  onNavigate: () => void;
}) {
  return (
    <div className="container-nue grid grid-cols-12 gap-6 py-10">
      <div className="col-span-3">
        <p className="eyebrow">{title}</p>
        <svg viewBox="0 0 60 50" className="mt-6 h-10 w-12" aria-hidden="true">
          <rect width="60" height="10" fill="var(--color-teal)" />
          <rect y="20" width="56" height="10" fill="white" />
          <rect y="40" width="60" height="10" fill="var(--color-teal)" />
        </svg>
        {footer && (
          <Link href={footer.href} onClick={onNavigate} className="ui-text mt-8 inline-block text-white underline decoration-teal underline-offset-8">
            {footer.label}
          </Link>
        )}
      </div>
      <ul className={`col-span-9 grid gap-x-10 gap-y-1 ${cols === 2 ? "grid-cols-2" : "grid-cols-1 max-w-md"}`}>
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={onNavigate}
              className="group block border-l border-transparent py-3 pl-4 hover:border-teal focus-visible:border-teal"
            >
              <span className="ui-text block text-white group-hover:text-ice">{l.label}</span>
              {l.blurb && <span className="mt-1 block text-sm text-titanium-light">{l.blurb}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-drawer"
      hidden={!open}
      className="fixed inset-x-0 top-18 bottom-0 overflow-y-auto border-t border-graphite bg-obsidian lg:hidden"
    >
      <div className="container-nue flex min-h-full flex-col py-8">
        <DrawerGroup title="Services" links={services} onClose={onClose} />
        <DrawerGroup title="Industries" links={industries} onClose={onClose} />
        <DrawerGroup title="Approach" links={approach} onClose={onClose} />
        <Link href="/insights/" onClick={onClose} className="h3 border-b border-graphite py-5">
          Insights
        </Link>
        <Link
          href="/contact/"
          onClick={onClose}
          data-cta="drawer-start-conversation"
          className="ui-text mt-10 inline-flex justify-center rounded-xs bg-teal px-6 py-4 font-semibold text-obsidian"
        >
          Start a Conversation
        </Link>
      </div>
    </div>
  );
}

function DrawerGroup({ title, links, onClose }: { title: string; links: { label: string; href: string }[]; onClose: () => void }) {
  return (
    <details className="group border-b border-graphite">
      <summary className="h3 flex cursor-pointer list-none items-center justify-between py-5">
        {title}
        <span aria-hidden="true" className="text-teal transition-transform group-open:rotate-45">+</span>
      </summary>
      <ul className="pb-5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} onClick={onClose} className="block py-2.5 text-concrete hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
