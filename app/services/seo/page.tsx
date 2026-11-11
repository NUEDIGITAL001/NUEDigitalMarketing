import Link from "next/link";
import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, CheckList, Prose } from "@/components/page/Blocks";
import { SeoStack } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/services/seo/";
const description =
  "SEO services from NÜE Digital in Rochester, NY: technical SEO, content and authority work built on strategy and measured by leads, not rankings.";
export const metadata = pageMeta({ path, title: "SEO Services Built on Strategy and Measurement · NÜE Digital", description });

const faqs = [
  { q: "How long does SEO take to work?", a: "SEO is ongoing, and search is always changing. In most cases our clients see meaningful early progress within the first 90 days, with results compounding from there. We never promise specific rankings, because no one controls Google." },
  { q: "What does an SEO audit include?", a: "A review of technical health (crawling, indexing, speed, structure), content against real search demand, local signals and authority. You get a prioritised list of fixes, not a 200-page export from a tool." },
  { q: "Do you guarantee first-page rankings?", a: "No. Anyone who guarantees rankings is guessing or misleading you. We commit to the work, to transparency and to measuring what matters: calls, forms and bookings from organic search." },
  { q: "Do you write the content?", a: "Yes. Our team plans and writes content based on how your customers actually search, and you review it before anything is published." },
  { q: "How is SEO different from AI search optimization?", a: "They overlap. Classic SEO earns rankings in search results. AI search optimization makes sure AI assistants and AI Overviews understand, trust and cite your business. We handle both together." },
];

export default function Page() {
  return (
    <ServiceShell
      path={path}
      name="SEO Services"
      serviceType="Search engine optimization"
      description={description}
      eyebrow="Service · SEO"
      title="SEO that compounds, measured by customers, not rankings."
      lead={<p>Search is where most customers start. We build the technical foundation, content and authority that help the right people find you, and we report on the inquiries it produces.</p>}
      visual={<SeoStack />}
      faqs={faqs}
      related={["/services/seo/ai-search-optimization/", "/services/local-seo/", "/services/content-email-marketing/", "/services/website-design/"]}
    >
      <Section id="layers" eyebrow="The three layers" title="What good SEO actually involves" tone="carbon">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { h: "Technical", p: "Your site has to be fast, crawlable and clearly structured before anything else works.", l: ["Crawl and index review", "Core Web Vitals and speed", "Site architecture and internal links", "Structured data (schema)"] },
            { h: "Content", p: "Pages that answer what people actually search, in the order they search it.", l: ["Search demand research", "Service and location pages", "Helpful articles and FAQs", "Refreshing what already ranks"] },
            { h: "Authority", p: "Signals that other people and sites trust you.", l: ["Local citations and listings", "Earned links and mentions", "Review strategy", "Brand searches over time"] },
          ].map((c) => (
            <div key={c.h} className="border-t-2 border-teal pt-6">
              <h3 className="font-display text-2xl font-semibold text-white">{c.h}</h3>
              <p className="mt-3 text-titanium-light">{c.p}</p>
              <ul className="mt-5 space-y-2 text-sm text-concrete">
                {c.l.map((x) => <li key={x}>— {x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <Section id="expect" eyebrow="What to expect" title="A living process, not a one-time project">
        <Prose>
          <p>
            SEO is a living, breathing thing. Search engines change how they rank and display results all the time, competitors keep publishing, and customer behaviour shifts. That’s why we treat SEO as a monthly practice rather than a launch-and-leave project.
          </p>
          <p>
            In most cases our clients see meaningful early progress in the first 90 days with NÜE: technical problems fixed, key pages rebuilt and the first movement in visibility and inquiries. From there, the work compounds.
          </p>
          <p>
            Every month you see what we did, what changed and what it produced, tied to calls, forms and bookings rather than vanity metrics.
          </p>
        </Prose>
      </Section>
      <Section id="scope" eyebrow="Included" title="Typical monthly scope" tone="carbon" intro={<p>Scope is set by your goals and market. Looking for help in Rochester specifically? See <Link className="text-ice underline decoration-teal underline-offset-4" href="/rochester-ny/seo/">SEO in Rochester, NY</Link>.</p>}>
        <CheckList items={["Technical monitoring and fixes", "Keyword and topic planning", "New and improved pages each month", "On-page optimisation", "Schema and AI search readiness", "Local SEO and Google Business Profile", "Link and citation building", "Monthly reporting tied to leads"]} />
      </Section>
    </ServiceShell>
  );
}
