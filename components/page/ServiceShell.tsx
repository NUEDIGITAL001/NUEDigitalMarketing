import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { CtaBand, FaqList, LinkGrid, Section, StatementBand } from "./Blocks";
import { statements } from "@/lib/statements";
import { pageScenes } from "@/lib/scenes";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd, type Crumb } from "@/lib/seo";
import { services, industries, type NavLink } from "@/lib/site";

const all: NavLink[] = [...services, ...industries];

/**
 * Shared frame for service and industry pages: hero, schema, FAQ, related
 * links and the conversion band. The body between hero and FAQ is written
 * per page so no two pages share the same structure or copy.
 */
export function ServiceShell({
  kind = "service",
  path,
  name,
  serviceType,
  description,
  eyebrow,
  title,
  lead,
  visual,
  faqs,
  related,
  ctaTitle,
  ctaLead,
  parent,
  children,
}: {
  kind?: "service" | "industry";
  path: string;
  name: string;
  serviceType: string;
  description: string;
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  visual?: ReactNode;
  faqs: { q: string; a: string }[];
  related: string[];
  ctaTitle?: string;
  ctaLead?: string;
  parent?: Crumb;
  children: ReactNode;
}) {
  const hub: Crumb = kind === "service" ? { name: "Services", path: "/services/" } : { name: "Industries", path: "/industries/" };
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, hub, ...(parent ? [parent] : []), { name, path }];
  const relatedLinks = related.map((h) => all.find((l) => l.href === h)).filter(Boolean) as NavLink[];
  return (
    <>
      <JsonLd data={[serviceJsonLd({ path, name, description, serviceType }), breadcrumbJsonLd(crumbs), faqJsonLd(faqs)]} />
      <PageHero crumbs={crumbs} eyebrow={eyebrow} title={title} lead={lead} aside={visual} />
      {children}
      {statements[path] && <StatementBand scene={pageScenes[path]?.scene}>{statements[path]}</StatementBand>}
      <Section id="faq" eyebrow="Questions" title="Straight answers" tone="obsidian">
        <FaqList faqs={faqs} />
      </Section>
      {relatedLinks.length > 0 && (
        <Section id="related" eyebrow="Connected work" title={kind === "service" ? "Works best alongside" : "Services that fit"} tone="carbon">
          <LinkGrid links={relatedLinks} />
        </Section>
      )}
      <CtaBand title={ctaTitle} lead={ctaLead} source={path} />
    </>
  );
}
