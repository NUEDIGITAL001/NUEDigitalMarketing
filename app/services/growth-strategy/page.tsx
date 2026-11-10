import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, NumberedGrid, CheckList, Prose } from "@/components/page/Blocks";
import { StrategyMatrix } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/services/growth-strategy/";
const description =
  "Growth strategy and business development consulting from NÜE Digital in Rochester, NY: clear priorities and a marketing plan tied to revenue.";
export const metadata = pageMeta({ path, title: "Growth Strategy and Business Development Consulting · NÜE Digital", description });

const faqs = [
  { q: "What is growth strategy consulting?", a: "It is the work of deciding where growth should come from before spending on marketing: which customers, which offers, which channels and in what order. The output is a written plan with priorities, owners and the numbers you will use to judge it." },
  { q: "Do I need a strategy if I already run ads or post on social media?", a: "Usually that is exactly when it helps. Activity without a plan tends to spread budget thin. A strategy tells you what to keep, what to stop and where the next dollar should go." },
  { q: "Is this like having a fractional CMO?", a: "In practice, yes. We act as the senior marketing lead for businesses that do not have one in house, then bring in the right specialists to carry out the plan." },
  { q: "How long does it take to build a plan?", a: "It depends on the size of the business and how much data already exists. We agree a timeline in the first conversation, and you see working priorities early rather than waiting for one large document." },
  { q: "Do you also execute the plan?", a: "Yes. Strategy is the first step of our methodology, and the same team stays accountable for execution and measurement." },
];

export default function Page() {
  return (
    <ServiceShell
      path={path}
      name="Growth Strategy & Business Development"
      serviceType="Marketing strategy consulting"
      description={description}
      eyebrow="Service · Growth strategy"
      title="Decide where growth comes from, then build toward it."
      lead={<p>Most businesses don’t have a marketing problem. They have a priorities problem. We help you choose the customers, offers and channels worth your budget, and turn that into a plan your team can actually run.</p>}
      visual={<StrategyMatrix />}
      faqs={faqs}
      related={["/services/seo/", "/services/search-engine-marketing/", "/services/website-design/", "/services/ai-marketing-automation/"]}
      ctaTitle="Get an outside view of your growth plan."
    >
      <Section id="signs" eyebrow="When it’s time" title="Signs you need a strategy, not another tactic" tone="carbon">
        <NumberedGrid
          items={[
            { title: "Spend is up, results are flat", body: "Budgets have grown across channels, but leads and revenue haven’t moved with them." },
            { title: "Every vendor has a different answer", body: "Your ad agency, web developer and social freelancer each recommend more of what they sell." },
            { title: "You can’t say what a customer is worth", body: "Without margin and lifetime value, there’s no way to know what you can afford to pay for a lead." },
            { title: "Growth depends on the owner", body: "New business still comes mostly from referrals and personal relationships, and that doesn’t scale." },
          ]}
        />
      </Section>
      <Section id="deliverables" eyebrow="What you get" title="A plan built for decisions" intro={<p>Strategy work ends in documents you will use every month, not a slide deck that sits in a folder.</p>}>
        <CheckList
          items={[
            "Ideal customer profiles and the problems they pay to solve",
            "Positioning and messaging that sets you apart locally",
            "Offer and pricing review for your highest-value services",
            "Channel priorities with a realistic budget split",
            "Customer value and target cost per lead",
            "A measurement plan: what we track and how",
            "A 90-day roadmap with owners and milestones",
            "Business development ideas beyond paid marketing: partnerships, referrals, retention",
          ]}
        />
      </Section>
      <Section id="how" eyebrow="How we work" title="Consulting first, then the right specialists" tone="carbon">
        <Prose>
          <p>
            We start by learning the business: how you make money, which customers are most profitable, what capacity you have and where you want to be in a year. Then we look at the market, your competitors and what your current marketing is actually producing.
          </p>
          <p>
            From there we agree priorities using a simple test: impact on revenue against the effort to get there. Quick wins go first. Bigger bets get a plan and a budget. Everything else waits.
          </p>
          <p>
            Because NÜE also executes, the plan doesn’t get handed off and forgotten. The same people who built it stay accountable for results, and the plan is revisited as the numbers come in. See the full <a href="/methodology/">methodology</a>.
          </p>
        </Prose>
      </Section>
    </ServiceShell>
  );
}
