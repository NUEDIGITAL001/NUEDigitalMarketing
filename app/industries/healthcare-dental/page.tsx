import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, NumberedGrid, Prose } from "@/components/page/Blocks";
import { Journey } from "@/components/visuals/IndustryVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/industries/healthcare-dental/";
const description =
  "Dental and healthcare practice marketing from NÜE Digital: local SEO, Google Business Profile, reviews and patient-friendly websites that fill schedules with the right patients.";
export const metadata = pageMeta({ path, title: "Healthcare and Dental Practice Marketing · NÜE Digital", description });

const faqs = [
  { q: "How do dental practices get more new patients online?", a: "Mostly through local search: a complete, active Google Business Profile, strong reviews, service pages for the treatments you want more of, and a website that makes booking easy on a phone." },
  { q: "Can you help us attract specific types of patients?", a: "Yes. We build pages, ads and content around the services you want to grow, such as implants or family dentistry, instead of marketing the practice as a whole." },
  { q: "Do you understand patient privacy requirements?", a: "We design marketing to avoid collecting or exposing protected health information, keep tracking appropriate for healthcare, and work with your compliance guidance on forms and tools." },
  { q: "Should our practice run Google Ads?", a: "Often, for high-value treatments or new locations. Ads work best alongside strong local SEO, so we look at both before recommending a budget." },
  { q: "How do we handle negative patient reviews?", a: "Respond professionally without confirming anyone is a patient or discussing care details. We draft compliant responses for your approval." },
];

export default function Page() {
  return (
    <ServiceShell
      kind="industry"
      path={path}
      name="Healthcare & Dental"
      serviceType="Healthcare and dental practice marketing"
      description={description}
      eyebrow="Industry · Healthcare + dental"
      title="Fill the schedule with the right patients."
      lead={<p>A busy front desk isn’t the same as a healthy practice. We help dental and healthcare practices attract the patients and treatments they want more of, and make it easy for those patients to book.</p>}
      visual={<Journey title="Patient journey from symptom to search to booking to follow-up" stages={["Need", "Search", "Compare", "Book", "Visit", "Review"]} focus={2} caption="The patient journey" />}
      faqs={faqs}
      related={["/services/local-seo/", "/services/reputation-management/", "/services/website-design/", "/services/ai-marketing-automation/"]}
      ctaTitle="Talk about growing your practice."
    >
      <Section id="reality" eyebrow="The reality" title="Patients choose differently now" tone="carbon">
        <Prose>
          <p>
            Most new patients start with a search on their phone, then compare a few nearby practices on the map. Ratings, recent reviews, photos and whether they can book quickly decide who gets the call.
          </p>
          <p>
            Practices that win online usually aren’t the biggest. They’re the ones with the most complete profiles, the most recent reviews and websites that answer patients’ questions clearly.
          </p>
        </Prose>
      </Section>
      <Section id="plan" eyebrow="What we focus on" title="A practice growth plan">
        <NumberedGrid
          items={[
            { title: "Treatment-level visibility", body: "Pages, profile services and ads for the specific treatments you want to grow." },
            { title: "Map and review strength", body: "A Google Business Profile run like a social channel, plus a steady flow of patient reviews." },
            { title: "Easy booking", body: "Mobile-first pages with click-to-call and simple request forms, tracked to the source." },
            { title: "Recall and retention", body: "Email and automated reminders that bring patients back and keep schedules full." },
          ]}
        />
      </Section>
    </ServiceShell>
  );
}
