import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { CtaBand, FaqList, Section } from "./Blocks";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd, type Crumb } from "@/lib/seo";

/** Frame for the Rochester pages. Body content is unique per page. */
export function LocalShell({
  path, name, serviceType, description, eyebrow, title, lead, visual, faqs, children, ctaTitle, isHub,
}: {
  path: string; name: string; serviceType: string; description: string; eyebrow: string; title: ReactNode; lead: ReactNode;
  visual?: ReactNode; faqs: { q: string; a: string }[]; children: ReactNode; ctaTitle?: string; isHub?: boolean;
}) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...(isHub ? [] : [{ name: "Rochester, NY", path: "/rochester-ny/" }]), { name, path }];
  return (
    <>
      <JsonLd data={[serviceJsonLd({ path, name, description, serviceType }), breadcrumbJsonLd(crumbs), faqJsonLd(faqs)]} />
      <PageHero crumbs={crumbs} eyebrow={eyebrow} title={title} lead={lead} aside={visual} seed={path.length + 3} />
      {children}
      <Section id="faq" eyebrow="Questions" title="Rochester questions, answered">
        <FaqList faqs={faqs} />
      </Section>
      <CtaBand title={ctaTitle ?? "Let’s meet. Rochester is home."} lead="We work with businesses across Rochester and Western New York in person. Tell us about yours and we’ll set up a time to talk." source={path} />
    </>
  );
}
