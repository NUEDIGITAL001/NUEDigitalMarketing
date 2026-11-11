import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, CheckList, Prose } from "@/components/page/Blocks";
import { EmailSequence } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/services/content-email-marketing/";
const description =
  "Content and email marketing from NÜE Digital: content strategy, articles, newsletters and nurture sequences that build trust and keep your business remembered.";
export const metadata = pageMeta({ path, title: "Content and Email Marketing Services · NÜE Digital", description });

const faqs = [
  { q: "What kind of content do you create?", a: "Service and location pages, helpful articles, FAQs, guides, case-style explainers of your process, newsletters and email sequences, planned around what your customers search and ask." },
  { q: "Is email marketing still worth it?", a: "For most businesses, yes. Email reaches people who already know you, costs little to send and is one of the few channels you fully own." },
  { q: "How often should we send emails?", a: "Often enough to stay remembered and rarely enough to stay welcome. For many businesses a monthly newsletter plus automated sequences after key actions works well." },
  { q: "Who writes the content?", a: "Our writers do, with input from you on the expertise only you have. Nothing is published without your approval." },
  { q: "Do you use AI to write content?", a: "We use AI tools to research and speed up drafting, but every piece is shaped, fact-checked and edited by people who understand your business. Generic AI content doesn’t build trust or rankings." },
];

export default function Page() {
  return (
    <ServiceShell
      path={path}
      name="Content & Email Marketing"
      serviceType="Content marketing and email marketing"
      description={description}
      eyebrow="Service · Content + email"
      title="Stay useful. Stay remembered."
      lead={<p>Good content answers the questions customers have before they call. Good email keeps you top of mind until they’re ready. Together they turn one-time visitors into long-standing customers.</p>}
      visual={<EmailSequence />}
      faqs={faqs}
      related={["/services/seo/", "/services/seo/ai-search-optimization/", "/services/ai-marketing-automation/", "/services/social-media-marketing/"]}
    >
      <Section id="content" eyebrow="Content" title="Content with a job to do" tone="carbon">
        <Prose>
          <p>
            Every piece we plan has a purpose: to rank for a search your customers make, to answer a question your sales team hears every week, or to show the expertise that makes you the safer choice.
          </p>
          <p>
            We start with search demand and your customers’ real questions, then build a calendar that supports <a href="/services/seo/">SEO</a>, <a href="/services/seo/ai-search-optimization/">AI search</a>, social and email at the same time, so one good idea works across every channel.
          </p>
        </Prose>
      </Section>
      <Section id="email" eyebrow="Email" title="Sequences and newsletters">
        <CheckList items={["Welcome sequences for new leads", "Follow-up after quotes and estimates", "Post-service and review requests", "Reactivation for past customers", "Monthly newsletters", "List growth and sign-up forms", "Segmentation by interest or service", "Deliverability and compliance setup"]} />
      </Section>
    </ServiceShell>
  );
}
