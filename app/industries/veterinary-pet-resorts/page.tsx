import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, NumberedGrid, Prose } from "@/components/page/Blocks";
import { Journey } from "@/components/visuals/IndustryVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/industries/veterinary-pet-resorts/";
const description =
  "Veterinary and pet resort marketing from NÜE Digital: local visibility, reviews, social content and booking systems that earn the trust of pet owners.";
export const metadata = pageMeta({ path, title: "Veterinary and Pet Resort Marketing · NÜE Digital", description });

const faqs = [
  { q: "How do vet clinics attract new clients?", a: "Through local search and word of mouth that shows up online: a strong Google Business Profile, recent reviews, and a website that makes new-client registration and appointments easy." },
  { q: "What works for pet resorts and boarding?", a: "Showing the space and the people. Owners want to see where their pet will stay and who will care for them, so photos, video tours and honest reviews matter most." },
  { q: "Should our clinic be on social media?", a: "Yes. Pet content is some of the most shared on social platforms, and it’s a natural way to show your team’s care and personality." },
  { q: "Can you help fill boarding during slow seasons?", a: "We plan offers, email campaigns and ads ahead of slower periods and holidays to smooth demand." },
  { q: "Do you handle reminders and follow-ups?", a: "We can set up automated reminders for vaccines, checkups and rebooking, in coordination with your practice software." },
];

export default function Page() {
  return (
    <ServiceShell
      kind="industry"
      path={path}
      name="Veterinary & Pet Resorts"
      serviceType="Veterinary and pet resort marketing"
      description={description}
      eyebrow="Industry · Veterinary + pet care"
      title="Earn the trust of people who treat pets like family."
      lead={<p>Pet owners don’t choose on price alone. They choose the clinic or resort they trust with someone they love. We help you show that care online and make it easy to book.</p>}
      visual={<Journey title="Pet owner journey from need to trust to booking to loyalty" stages={["Need", "Search", "See care", "Trust", "Book", "Return"]} focus={2} caption="Trust is built before the first visit" />}
      faqs={faqs}
      related={["/services/social-media-marketing/", "/services/reputation-management/", "/services/photography-video/", "/services/local-seo/"]}
    >
      <Section id="show" eyebrow="Show, don’t tell" title="Let owners see the care" tone="carbon">
        <Prose>
          <p>
            “We love pets” is on every website. What convinces owners is seeing it: your team with patients, the play yards and suites, clean treatment rooms, real reviews from owners who sound like them.
          </p>
          <p>
            We plan content and creative that shows your care honestly, then put it where owners are looking: your profile, your site and their social feeds.
          </p>
        </Prose>
      </Section>
      <Section id="plan" eyebrow="Focus areas" title="What we build">
        <NumberedGrid
          items={[
            { title: "Local discovery", body: "Profile, reviews and pages that win “vet near me” and “dog boarding near me” searches." },
            { title: "Community content", body: "Social posts and short video featuring your team and the pets you care for." },
            { title: "Easy booking", body: "Clear new-client and reservation paths, tracked to the source." },
            { title: "Loyalty & reminders", body: "Automated reminders and seasonal campaigns that keep clients coming back." },
          ]}
        />
      </Section>
    </ServiceShell>
  );
}
