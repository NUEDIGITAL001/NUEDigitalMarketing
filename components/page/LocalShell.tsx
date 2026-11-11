import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { CtaBand, FaqList, Section, StatementBand } from "./Blocks";
import { statements } from "@/lib/statements";
import { pageScenes } from "@/lib/scenes";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd, type Crumb } from "@/lib/seo";

/** Frame for the Rochester pages. Body content is unique per page. */
export function LocalShell({
  path, name, serviceName, serviceType, description, eyebrow, title, lead, visual, faqs, children, ctaTitle, isHub,
}: {
  path: string; name: string; serviceName?: string; serviceType: string; description: string; eyebrow: string; title: ReactNode; lead: ReactNode;
  visual?: ReactNode; faqs: { q: string; a: string }[]; children: ReactNode; ctaTitle?: string; isHub?: boolean;
}) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...(isHub ? [] : [{ name: "Rochester, NY", path: "/rochester-ny/" }]), { name, path }];
  return (
    <>
      <JsonLd data={[serviceJsonLd({ path, name: serviceName ?? name, description, serviceType, hasFaq: true }), breadcrumbJsonLd(crumbs), faqJsonLd(faqs, { path, about: `${path}#service` })]} />
      <PageHero crumbs={crumbs} eyebrow={eyebrow} title={title} lead={lead} aside={visual} />
      {children}
      {statements[path] && <StatementBand scene={pageScenes[path]?.scene}>{statements[path]}</StatementBand>}
      <Section id="faq" eyebrow="Questions" title="Rochester questions, answered" tone="obsidian">
        <FaqList faqs={faqs} />
      </Section>
      <RelatedPosts path={path} />
      <CtaBand title={ctaTitle ?? "Let’s meet. Rochester is home."} lead="We work with businesses across Rochester and Western New York in person. Tell us about yours and we’ll set up a time to talk." source={path} />
    </>
  );
}
