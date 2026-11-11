import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, NumberedGrid, Prose } from "@/components/page/Blocks";
import { DirectVsOta } from "@/components/visuals/IndustryVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/industries/hospitality-lodging/";
const description =
  "Hotel and hospitality marketing from NÜE Digital: direct booking strategy, search, social and email for hotels, inns, B&Bs and venues.";
export const metadata = pageMeta({ path, title: "Hospitality and Lodging Marketing · NÜE Digital", description });

const faqs = [
  { q: "How can a hotel get more direct bookings?", a: "Make booking direct easy and worthwhile: a fast website with a clear booking engine, a reason to book direct such as perks or flexibility, strong visibility in Google’s hotel results and email to past guests." },
  { q: "Should we stop using online travel agencies?", a: "Usually not. OTAs bring discovery. The goal is to shift more repeat and nearby guests to direct bookings, where you keep more revenue and own the relationship." },
  { q: "Do you market inns, B&Bs and event venues?", a: "Yes. Smaller properties often benefit most from direct booking strategy because each commission matters more." },
  { q: "What content works for hospitality?", a: "Beautiful, honest imagery of rooms and spaces, local guides that show what’s nearby, and reviews that describe the experience." },
  { q: "How do you track bookings from marketing?", a: "We connect analytics to your booking engine where possible, so you can see which channels produce bookings and revenue, not only visits." },
];

export default function Page() {
  return (
    <ServiceShell
      kind="industry"
      path={path}
      name="Hospitality & Lodging"
      serviceType="Hotel and hospitality marketing"
      description={description}
      eyebrow="Industry · Hospitality"
      title="Book more guests direct. Keep more of every stay."
      lead={<p>Online travel agencies are useful for discovery, but every booking through them costs commission and the guest relationship. We help hotels, inns and venues earn more bookings on their own terms.</p>}
      visual={<DirectVsOta />}
      faqs={faqs}
      related={["/services/website-design/", "/services/social-media-marketing/", "/services/content-email-marketing/", "/services/photography-video/"]}
    >
      <Section id="direct" eyebrow="Direct booking strategy" title="Give guests a reason to book with you" tone="carbon">
        <NumberedGrid
          items={[
            { title: "A booking path that’s easier than the OTA", body: "Fast, mobile-first, with clear rates and a few taps to confirm." },
            { title: "A real reason to book direct", body: "Perks, flexibility or packages guests can’t get anywhere else." },
            { title: "Visibility where travellers look", body: "Google Business Profile, hotel search results and local content that ranks." },
            { title: "Guests who come back", body: "Email and offers to past guests, who are the easiest bookings you’ll ever get." },
          ]}
        />
      </Section>
      <Section id="story" eyebrow="Tell the story" title="Sell the stay, not the room">
        <Prose>
          <p>
            Travellers choose an experience: the view, the neighbourhood, the breakfast, the quiet. We help you show it with honest photography, video and local guides, so the guest who arrives is the one who expected exactly what you offer.
          </p>
        </Prose>
      </Section>
    </ServiceShell>
  );
}
