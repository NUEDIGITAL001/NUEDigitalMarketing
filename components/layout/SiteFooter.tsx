import Link from "next/link";
import { NueLogo } from "@/components/brand/NueLogo";
import { approach, industries, legal, rochester, services, site } from "@/lib/site";
import { ReduceMotionToggle } from "./ReduceMotionToggle";

export function SiteFooter() {
  return (
    <footer className="border-t border-graphite bg-obsidian">
      <div className="container-nue py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <NueLogo className="h-12 w-auto" title="NÜE Digital" />
            <p className="eyebrow mt-6 text-concrete!">{site.descriptor}</p>
            <p className="mt-6 max-w-sm text-titanium-light">{site.serviceArea}</p>
            <Link
              href="/contact/"
              data-cta="footer-start-conversation"
              className="ui-text mt-8 inline-flex text-white underline decoration-teal underline-offset-8 hover:text-ice"
            >
              Start a conversation
            </Link>
            <p className="mt-6 text-sm">
              <a href={`mailto:${site.email}`} data-cta="footer-email" className="text-titanium-light hover:text-white">{site.email}</a>
            </p>
          </div>
          <FooterCol title="Services" links={services} className="lg:col-span-3" />
          <FooterCol title="Industries" links={industries} className="lg:col-span-2" />
          <div className="grid gap-12 lg:col-span-3">
            <FooterCol title="Company" links={[...approach, { label: "Blog", href: "/blog/" }, { label: "FAQs", href: "/faq/" }, { label: "Contact", href: "/contact/" }]} />
            <FooterCol title="Rochester, NY" links={rochester} />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-graphite pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 60 50" className="h-5 w-6" aria-hidden="true">
              <rect width="60" height="10" fill="var(--color-teal)" />
              <rect y="20" width="56" height="10" fill="white" />
              <rect y="40" width="60" height="10" fill="var(--color-teal)" />
            </svg>
            <p className="eyebrow text-white!">{site.tagline}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-titanium-light">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
            <li><ReduceMotionToggle /></li>
          </ul>
        </div>
        <p className="mt-6 text-sm text-titanium-light">
          © 2026 {site.legalName}. {site.location}.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = "" }: { title: string; links: { label: string; href: string }[]; className?: string }) {
  return (
    <nav aria-label={title} className={className}>
      <p className="ui-text text-white">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-titanium-light hover:text-white">{l.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
