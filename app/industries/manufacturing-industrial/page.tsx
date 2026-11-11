import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, Prose, CheckList } from "@/components/page/Blocks";
import { BuyingCommittee } from "@/components/visuals/IndustryVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/industries/manufacturing-industrial/";
const description =
  "Manufacturing and industrial B2B marketing from NÜE Digital: technical content, capability pages, LinkedIn and search that reach engineers and buyers.";
export const metadata = pageMeta({ path, title: "Manufacturing and Industrial B2B Marketing · NÜE Digital", description });

const faqs = [
  { q: "Does digital marketing work for manufacturers?", a: "Yes. Engineers and buyers research suppliers online long before they contact sales. Clear capability pages, technical content and search visibility put you on the shortlist." },
  { q: "Our sales come from relationships. Why market online?", a: "Relationships still close deals, but new relationships increasingly start with a search. Digital marketing opens more doors for your sales team without replacing them." },
  { q: "What content do industrial buyers want?", a: "Specifics: capabilities, tolerances, materials, certifications, capacity, lead times and examples of parts or projects you can share." },
  { q: "Is LinkedIn worth it for B2B manufacturing?", a: "Often, yes, both for company visibility and for targeted ads to specific roles and industries. We recommend it based on who your buyers are." },
  { q: "How do you measure results with long sales cycles?", a: "We track qualified inquiries and RFQs by source, then follow them through your CRM so you can see which channels produce real opportunities, not just form fills." },
];

export default function Page() {
  return (
    <ServiceShell
      kind="industry"
      path={path}
      name="Manufacturing & Industrial B2B"
      serviceType="Industrial and B2B manufacturing marketing"
      description={description}
      eyebrow="Industry · Manufacturing + B2B"
      title="Get on the shortlist before the RFQ goes out."
      lead={<p>Industrial buyers do their homework. By the time they call, they’ve already narrowed the list. We make sure your capabilities are easy to find, easy to understand and credible to every person involved in the decision.</p>}
      visual={<BuyingCommittee />}
      faqs={faqs}
      related={["/services/growth-strategy/", "/services/website-design/", "/services/content-email-marketing/", "/services/seo/"]}
      ctaTitle="Talk about reaching more qualified buyers."
    >
      <Section id="committee" eyebrow="The buying committee" title="One purchase, many people to convince" tone="carbon">
        <Prose>
          <p>
            Engineering cares about capability and tolerances. Quality wants certifications and process control. Procurement looks at cost, capacity and lead time. Leadership weighs risk and long-term partnership.
          </p>
          <p>
            Effective B2B marketing gives each of them what they need, in the format they prefer, and makes it easy for your champion inside the buyer’s company to make the case for you.
          </p>
        </Prose>
      </Section>
      <Section id="plan" eyebrow="Focus areas" title="What we build">
        <CheckList items={["Capability and industry pages", "Technical content and spec sheets", "Search visibility for processes and materials", "LinkedIn presence and targeted ads", "RFQ and quote request paths", "Trade show and event support", "Email nurture for long cycles", "CRM tracking from inquiry to opportunity"]} />
      </Section>
    </ServiceShell>
  );
}
