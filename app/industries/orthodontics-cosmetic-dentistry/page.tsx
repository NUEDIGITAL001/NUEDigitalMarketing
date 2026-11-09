import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, Prose, CheckList } from "@/components/page/Blocks";
import { Journey } from "@/components/visuals/IndustryVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/industries/orthodontics-cosmetic-dentistry/";
const description =
  "Orthodontic and cosmetic dentistry marketing from NÜE Digital: nurture campaigns, before-and-after content, Invisalign and treatment pages that convert long consideration into consults.";
export const metadata = pageMeta({ path, title: "Orthodontic and Cosmetic Dentistry Marketing · NÜE Digital", description });

const faqs = [
  { q: "Why is marketing orthodontics different from general dentistry?", a: "Treatment is elective, high-value and often decided over weeks or months, sometimes by parents and teens together. Marketing has to educate and stay in touch, not only capture urgent searches." },
  { q: "Can you market Invisalign and clear aligners?", a: "Yes, within the manufacturer’s brand guidelines. We build treatment pages and campaigns that explain options honestly and invite a consultation." },
  { q: "Should we show before-and-after photos?", a: "Real results are powerful proof. We help you use them with patient consent and in line with professional advertising rules." },
  { q: "How do you follow up with people who aren’t ready yet?", a: "With email and text sequences that answer common questions about cost, comfort and timing, so you stay the trusted choice when they decide." },
  { q: "Do you help with financing messaging?", a: "Yes. Clear information about payment options removes one of the biggest barriers to booking a consult." },
];

export default function Page() {
  return (
    <ServiceShell
      kind="industry"
      path={path}
      name="Orthodontics & Cosmetic Dentistry"
      serviceType="Orthodontic and cosmetic dentistry marketing"
      description={description}
      eyebrow="Industry · Orthodontics + cosmetic"
      title="Turn long consideration into booked consults."
      lead={<p>No one decides on braces, aligners or veneers in an afternoon. We build marketing that educates, reassures and stays in touch until the patient is ready to commit, and makes your practice the obvious choice when they are.</p>}
      visual={<Journey title="Elective treatment journey from first curiosity to treatment start" stages={["Curious", "Research", "Cost?", "Consult", "Decide", "Start"]} focus={2} caption="Elective treatment takes weeks, sometimes months" />}
      faqs={faqs}
      related={["/services/content-email-marketing/", "/services/landing-pages-funnels/", "/services/search-engine-marketing/", "/services/photography-video/"]}
    >
      <Section id="questions" eyebrow="What patients ask" title="Answer the questions behind the search" tone="carbon">
        <Prose>
          <p>
            Before booking, prospective patients want to know what treatment involves, how long it takes, what it costs, whether it hurts and whether it will look natural. Practices that answer these questions openly earn trust before the first visit.
          </p>
          <p>
            We create treatment pages, comparison guides and short videos that answer them honestly, so your consults start with patients who are informed and ready to talk.
          </p>
        </Prose>
      </Section>
      <Section id="levers" eyebrow="Growth levers" title="Where we focus">
        <CheckList items={["Treatment pages for aligners, braces and cosmetic work", "Consult-focused landing pages", "Search and social campaigns for high-value treatments", "Before-and-after content with consent", "Nurture sequences for undecided prospects", "Financing and cost messaging", "Review strategy for elective care", "Consult tracking by source"]} />
      </Section>
    </ServiceShell>
  );
}
