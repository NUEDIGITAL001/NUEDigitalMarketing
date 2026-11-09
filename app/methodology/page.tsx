import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/Blocks";
import { JsonLd } from "@/components/page/JsonLd";
import { MethodLoop } from "@/components/visuals/MethodLoop";
import { breadcrumbJsonLd } from "@/lib/seo";
import { pageMeta } from "@/lib/meta";

const path = "/methodology/";
export const metadata = pageMeta({
  path,
  title: "The NÜE Methodology: Discover, Strategize, Execute, Optimize",
  description: "How NÜE Digital works: a four-phase marketing process that starts with the business, sets clear priorities, executes with the right specialists and optimizes on real results.",
});

const phases = [
  {
    n: "Discover", q: "Where are we really starting from?",
    body: "We learn the business before we touch the marketing: how you make money, who your best customers are, what capacity you have and what’s already working. We audit tracking, channels, website, search presence and competitors so decisions start from facts.",
    out: ["Business and goals interview", "Customer and competitor review", "Channel and spend audit", "Tracking and data health check", "Findings summary"],
  },
  {
    n: "Strategize", q: "What should we do first, and why?",
    body: "We turn findings into priorities using impact against effort. You get positioning, a channel plan, budget guidance, a measurement plan and a 90-day roadmap with clear owners.",
    out: ["Positioning and messaging", "Channel priorities and budget", "Measurement plan and KPIs", "90-day roadmap", "Agreed success criteria"],
  },
  {
    n: "Execute", q: "Who does the work, and how well?",
    body: "The right specialists carry out the plan: web, SEO, paid media, social, content, creative and automation. One team coordinates it all, so the pieces work together instead of competing.",
    out: ["Launches on a shared calendar", "Specialists matched to each task", "Quality checks before anything goes live", "Tracking in place from day one"],
  },
  {
    n: "Optimize", q: "What’s producing customers, and what isn’t?",
    body: "We review results against the plan every month, tied to calls, forms and bookings. Budget moves toward what works, tests replace guesses, and the roadmap is updated, which starts the loop again.",
    out: ["Monthly reporting tied to outcomes", "Testing and refinement", "Budget reallocation", "Quarterly strategy review"],
  },
];

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Methodology", path }];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Approach · Methodology"
        title="A clear process from first conversation to growth."
        lead={<p>Every engagement follows the same four phases. It keeps the work honest: we don’t execute before we understand, and we don’t call anything a success until the numbers say so.</p>}
        aside={<MethodLoop />}
      />
      {phases.map((ph, i) => (
        <section key={ph.n} id={ph.n.toLowerCase()} aria-labelledby={`${ph.n}-t`} className={`border-b border-graphite ${i % 2 ? "bg-carbon" : "bg-obsidian"}`}>
          <div className="container-nue section-m grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mono-data text-teal">Phase 0{i + 1}</p>
              <h2 id={`${ph.n}-t`} className="mt-4 font-display text-5xl font-bold uppercase tracking-[0.06em] text-white md:text-6xl">{ph.n}</h2>
              <p className="mt-6 font-display text-xl text-ice">{ph.q}</p>
            </div>
            <div className="lg:col-span-7">
              <p className="body-l text-concrete">{ph.body}</p>
              <h3 className="ui-text mt-10 text-white">What comes out of it</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {ph.out.map((o) => (
                  <li key={o} className="flex gap-3 text-titanium-light">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-teal" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
      <CtaBand title="Start with Discover." lead="The first step is a conversation about your business. No pitch deck, just questions and an honest view of what could help." source={path} />
    </>
  );
}
