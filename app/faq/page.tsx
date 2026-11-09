import { PageHero } from "@/components/page/PageHero";
import { CtaBand, FaqList, Section } from "@/components/page/Blocks";
import { JsonLd } from "@/components/page/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { pageMeta } from "@/lib/meta";

const path = "/faq/";
export const metadata = pageMeta({
  path,
  title: "Questions About Working With NÜE Digital · FAQs",
  description: "Answers to common questions about NÜE Digital: cost, how long SEO takes, contracts, reporting, who owns accounts and how we work with Rochester businesses.",
});

const groups = [
  {
    t: "Working together",
    f: [
      { q: "What does NÜE Digital do?", a: "We’re a marketing and consulting firm. We help businesses decide where growth should come from, then plan, execute and measure the marketing to get there: strategy, SEO, AI search, paid ads, social media, websites, content, reputation and automation." },
      { q: "Who do you work with?", a: "Businesses that want marketing to produce measurable results, especially in healthcare and dental, orthodontics, veterinary, home services, automotive, manufacturing and hospitality. We work in person across Rochester and Western New York and remotely across the Eastern US." },
      { q: "How do we get started?", a: "Fill in the contact form with a few details about your business and what you’re having trouble with. We’ll review it and reach out to set up a conversation." },
      { q: "Do you replace our in-house team?", a: "Not necessarily. We can act as your senior marketing lead, support an existing team, or handle specific pieces of work, whichever fits." },
    ],
  },
  {
    t: "Cost and commitment",
    f: [
      { q: "How much does digital marketing cost?", a: "It depends on your goals, market and the work involved, so we don’t publish fixed packages. After a conversation we’ll recommend a plan and give you a clear proposal." },
      { q: "Do I own my accounts and website?", a: "Yes. Ad accounts, analytics, profiles and your website belong to you, and you keep full access." },
    ],
  },
  {
    t: "Results and reporting",
    f: [
      { q: "How long does SEO take?", a: "SEO is ongoing and always changing. In most cases our clients see meaningful early progress in the first 90 days, and results compound from there. We never guarantee specific rankings." },
      { q: "How do you report results?", a: "Monthly, in plain language, tied to calls, forms, bookings and revenue where possible, along with what we did and what we’ll change next." },
      { q: "Do you guarantee results?", a: "We guarantee the work, the transparency and the effort. We don’t guarantee rankings or specific numbers, because no honest agency can." },
    ],
  },
];

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "FAQs", path }];
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(groups.flatMap((g) => g.f))]} />
      <PageHero crumbs={crumbs} eyebrow="FAQs" title="Questions about working with NÜE." lead={<p>Straight answers to what people ask us most. Don’t see yours? Ask us directly.</p>} />
      {groups.map((g, i) => (
        <Section key={g.t} id={`faq-${i}`} eyebrow={`0${i + 1}`} title={g.t} tone={i % 2 ? "carbon" : "obsidian"}>
          <FaqList faqs={g.f} />
        </Section>
      ))}
      <CtaBand source={path} />
    </>
  );
}
