import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, NumberedGrid, Prose } from "@/components/page/Blocks";
import { Workflow } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/services/ai-marketing-automation/";
const description =
  "AI marketing automation and CRM workflows from NÜE Digital in Rochester, NY. Instant lead response, follow-up, routing and reporting that save time without losing the human touch.";
export const metadata = pageMeta({ path, title: "AI Marketing Automation and CRM Workflows · NÜE Digital", description });

const faqs = [
  { q: "What is AI marketing automation?", a: "Using software and AI to handle repetitive marketing tasks: replying to new inquiries instantly, routing leads, sending follow-ups, drafting content and building reports, so your team can focus on customers." },
  { q: "Will automation make us sound robotic?", a: "Not if it’s done well. We write every message in your voice, keep people in the loop for anything personal, and use automation for speed and consistency, not to replace real conversations." },
  { q: "Which CRM do you work with?", a: "We work with the CRM you have where possible, and recommend one when you don’t. The right choice depends on your team size, sales process and budget." },
  { q: "Is our customer data safe?", a: "We set up tools with appropriate permissions, avoid sending sensitive data where it isn’t needed, and document what each automation does so you stay in control." },
  { q: "Do you serve Rochester businesses in person?", a: "Yes. We work with businesses across Rochester and Western New York in person, and with clients across the Eastern US remotely." },
];

export default function Page() {
  return (
    <ServiceShell
      path={path}
      name="AI Marketing Automation"
      serviceType="Marketing automation and CRM workflow consulting"
      description={description}
      eyebrow="Service · AI + automation"
      title="Answer every lead in minutes, not days."
      lead={<p>The business that responds first often wins. We use AI and automation to reply, route and follow up instantly, keep your CRM clean and report results automatically, with people in the loop where it matters.</p>}
      visual={<Workflow />}
      faqs={faqs}
      related={["/services/landing-pages-funnels/", "/services/content-email-marketing/", "/services/search-engine-marketing/", "/services/growth-strategy/"]}
      ctaTitle="Find the hours automation could give back."
    >
      <Section id="uses" eyebrow="Where it helps" title="Practical automation, not hype" tone="carbon">
        <NumberedGrid
          cols={3}
          items={[
            { title: "Speed to lead", body: "Instant, personal replies to forms, calls and messages, even after hours." },
            { title: "Lead routing", body: "The right inquiry to the right person, with context, based on service, location or value." },
            { title: "Follow-up", body: "Sequences that keep quotes and estimates from going cold." },
            { title: "CRM hygiene", body: "Records created, de-duplicated and tagged automatically, so reports are trustworthy." },
            { title: "Content assistance", body: "AI-assisted drafts for posts, emails and replies, always reviewed by a person." },
            { title: "Reporting", body: "Weekly summaries pulled together automatically from ads, analytics and your CRM." },
          ]}
        />
      </Section>
      <Section id="approach" eyebrow="Our approach" title="Map the process first">
        <Prose>
          <p>
            Automating a messy process just makes the mess faster. We start by mapping how leads arrive, who handles them and where they get stuck. Then we automate the steps that slow you down and keep a person involved wherever judgement or warmth matters.
          </p>
          <p>
            Everything is documented, so you know what runs, when and why, and nothing depends on one person remembering how it was set up.
          </p>
        </Prose>
      </Section>
    </ServiceShell>
  );
}
