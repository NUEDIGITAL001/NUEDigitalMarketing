import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, NumberedGrid, Prose } from "@/components/page/Blocks";
import { ReviewLoop } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/services/reputation-management/";
const description =
  "Online reputation and review management from NÜE Digital. A steady flow of genuine reviews, thoughtful responses and monitoring that builds trust in search and AI answers.";
export const metadata = pageMeta({ path, title: "Online Reputation and Review Management · NÜE Digital", description });

const faqs = [
  { q: "How do you get more Google reviews?", a: "By asking the right customers at the right moment, making it easy with a direct link, and building the ask into your normal process so it happens every time, not only when someone remembers." },
  { q: "Can you write reviews for us?", a: "No. Fake or incentivised reviews break platform rules and can get a profile penalised. Every review we help generate comes from a real customer." },
  { q: "How should we respond to a negative review?", a: "Promptly, calmly and specifically. Acknowledge the experience, take the details offline and show future customers how you handle problems. We draft responses for your approval." },
  { q: "Which review sites matter?", a: "Google matters most for most local businesses, followed by the sites that rank for your name and the platforms specific to your industry. We focus where your customers actually look." },
  { q: "Do reviews affect AI search?", a: "Yes. AI assistants often summarise what reviewers say about a business. A steady stream of detailed, recent reviews improves how you’re described." },
];

export default function Page() {
  return (
    <ServiceShell
      path={path}
      name="Reputation Management"
      serviceType="Online reputation and review management"
      description={description}
      eyebrow="Service · Reputation"
      title="Trust is earned in public."
      lead={<p>Before anyone calls, they read what others say about you. We help you earn more genuine reviews, respond well to every one, and keep your reputation working for you in search and AI answers.</p>}
      visual={<ReviewLoop />}
      faqs={faqs}
      related={["/services/local-seo/", "/services/seo/ai-search-optimization/", "/services/ai-marketing-automation/", "/services/content-email-marketing/"]}
    >
      <Section id="system" eyebrow="The system" title="Reviews as a habit, not a campaign" tone="carbon">
        <NumberedGrid
          items={[
            { title: "Ask at the right moment", body: "Right after a job well done, when the customer is happiest, by text or email with one tap to the review form." },
            { title: "Make it automatic", body: "Requests built into your CRM or job software so every happy customer is asked." },
            { title: "Respond to everything", body: "Thank-you notes for the good, thoughtful replies for the bad, drafted in your voice." },
            { title: "Use what you learn", body: "Themes from reviews feed back into service improvements, website copy and ads." },
          ]}
        />
      </Section>
      <Section id="monitor" eyebrow="Monitoring" title="Know what’s being said">
        <Prose>
          <p>
            We monitor the review sites and listings that matter for your business and flag anything that needs attention quickly. You get a monthly view of rating trends, review volume and recurring themes, plus suggested responses for anything sensitive.
          </p>
        </Prose>
      </Section>
    </ServiceShell>
  );
}
