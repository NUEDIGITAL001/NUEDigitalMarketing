import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, Prose, CheckList } from "@/components/page/Blocks";
import { Seasonality } from "@/components/visuals/IndustryVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/industries/home-services/";
const description =
  "Marketing for HVAC, plumbing, roofing, electrical and other home service businesses: local SEO, Google Ads and fast lead response that win the job.";
export const metadata = pageMeta({ path, title: "Marketing for Home Services and Skilled Trades · NÜE Digital", description });

const faqs = [
  { q: "What’s the best way for contractors to get more leads?", a: "Show up where urgent searches happen (the map pack and search ads), answer fast, and collect reviews after every job. Most trades lose more jobs to slow response than to competitors’ marketing." },
  { q: "Should we pay for lead services or run our own ads?", a: "Shared lead services sell the same lead to several companies. Your own SEO and ads build an asset you own and leads that come only to you. Many businesses use both while they build." },
  { q: "How do we handle seasonal swings?", a: "Plan ahead. We shift budget toward peak demand, run maintenance and tune-up offers in slower months, and use email to bring past customers back." },
  { q: "Do you work with HVAC, plumbing and roofing companies?", a: "Yes, along with electricians, remodelers, landscapers and other skilled trades. The principles are the same; the seasons and searches differ." },
  { q: "Can you track which ads produce booked jobs?", a: "Yes. Call tracking and form tracking tie each inquiry to its source, and we can connect to your scheduling software to see which turn into jobs." },
];

export default function Page() {
  return (
    <ServiceShell
      kind="industry"
      path={path}
      name="Home Services & Skilled Trades"
      serviceType="Home services and contractor marketing"
      description={description}
      eyebrow="Industry · Home services + trades"
      title="Win the urgent search before a competitor picks up."
      lead={<p>When a furnace quits or a pipe bursts, homeowners call the first trustworthy business they find. We make sure that’s you, and we help you plan for the seasons in between.</p>}
      visual={<Seasonality />}
      faqs={faqs}
      related={["/services/local-seo/", "/services/search-engine-marketing/", "/services/ai-marketing-automation/", "/services/reputation-management/"]}
      ctaTitle="Talk about filling your schedule."
    >
      <Section id="two-demands" eyebrow="Two kinds of demand" title="Urgent jobs and planned projects" tone="carbon">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="border-t-2 border-teal pt-6">
            <h3 className="font-display text-2xl font-semibold text-white">Urgent</h3>
            <p className="mt-3 text-titanium-light">Repairs and emergencies. Customers search, scan the map, and call within minutes. Speed, reviews, visible hours and click-to-call win.</p>
          </div>
          <div className="border-t-2 border-white pt-6">
            <h3 className="font-display text-2xl font-semibold text-white">Planned</h3>
            <p className="mt-3 text-titanium-light">Replacements, remodels and installs. Customers research, compare quotes and decide over weeks. Content, proof and follow-up win.</p>
          </div>
        </div>
      </Section>
      <Section id="speed" eyebrow="Speed to lead" title="The fastest answer often gets the job">
        <Prose>
          <p>
            Many homeowners contact more than one company. If your team is on a roof or under a sink, calls and forms can wait hours. We set up instant replies, missed-call text-back and lead routing so every inquiry gets a response right away, then hands off to a person.
          </p>
        </Prose>
      </Section>
      <Section id="plan" eyebrow="Focus areas" title="What we build" tone="carbon">
        <CheckList items={["Map pack and Google Business Profile", "Service and service-area pages", "Google Ads for urgent searches", "Missed-call text-back and instant replies", "Review requests after every job", "Seasonal offers and maintenance plans", "Past-customer email campaigns", "Call and job tracking by source"]} />
      </Section>
    </ServiceShell>
  );
}
