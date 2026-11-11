import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, CheckList, Prose } from "@/components/page/Blocks";
import { ContentCalendar } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/services/social-media-marketing/";
const description =
  "Social media marketing from NÜE Digital: organic content and paid social advertising planned around business goals, with a network of creators and clear reporting.";
export const metadata = pageMeta({ path, title: "Social Media Marketing Services · NÜE Digital", description });

const faqs = [
  { q: "Which platforms should my business be on?", a: "The ones your customers actually use and that you can keep up with. For many local service businesses that’s Facebook, Instagram and Google Business Profile; for B2B it’s often LinkedIn. We recommend based on your audience, not trends." },
  { q: "Do you create the content?", a: "Yes. We plan, write and design posts, and our network of creators handles photography and short-form video when your package includes creative services." },
  { q: "Organic or paid social?", a: "Usually both. Organic content builds trust with people who already know you. Paid social reaches new people in a defined area or audience and can be measured to the lead." },
  { q: "How often should we post?", a: "Consistency matters more than volume. We set a cadence you can sustain, typically a few quality posts a week per platform, and adjust based on what performs." },
  { q: "How do you measure social media results?", a: "Beyond reach and engagement, we track clicks, messages, calls and form submissions that come from social, so you can see what it contributes to the business." },
];

export default function Page() {
  return (
    <ServiceShell
      path={path}
      name="Social Media Marketing"
      serviceType="Social media marketing and advertising"
      description={description}
      eyebrow="Service · Social media"
      title="Social media with a purpose."
      lead={<p>Posting for the sake of posting doesn’t grow a business. We plan social around what you want people to know, feel and do, and we connect it to the leads it produces.</p>}
      visual={<ContentCalendar />}
      faqs={faqs}
      related={["/services/photography-video/", "/services/content-email-marketing/", "/services/local-seo/", "/services/growth-strategy/"]}
    >
      <Section id="two-jobs" eyebrow="Two jobs" title="Organic builds trust. Paid builds reach." tone="carbon">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="border-t-2 border-teal pt-6">
            <h3 className="font-display text-2xl font-semibold text-white">Organic social</h3>
            <p className="mt-3 text-titanium-light">Content for the people who already follow, review or refer you. It shows who you are, keeps you remembered and gives new prospects proof when they check you out.</p>
          </div>
          <div className="border-t-2 border-white pt-6">
            <h3 className="font-display text-2xl font-semibold text-white">Paid social</h3>
            <p className="mt-3 text-titanium-light">Targeted campaigns on Meta, LinkedIn and other platforms to reach new customers by location, interest or role, measured by cost per inquiry.</p>
          </div>
        </div>
      </Section>
      <Section id="creators" eyebrow="Our creator network" title="People who care how it looks">
        <Prose>
          <p>
            NÜE works with a network of creators: photographers, videographers, designers and writers who share the same goal of making work they’re proud of and turning followers into long-standing customers.
          </p>
          <p>
            When your package includes creative services, we bring the right people in for shoots and short-form video. See <a href="/services/photography-video/">photography and video</a>.
          </p>
        </Prose>
      </Section>
      <Section id="includes" eyebrow="Included" title="What management covers" tone="carbon">
        <CheckList items={["Platform and audience strategy", "Monthly content calendar", "Copywriting and design", "Short-form video planning", "Community management and replies", "Paid social campaigns and targeting", "Pixel and conversion tracking", "Monthly performance reporting"]} />
      </Section>
    </ServiceShell>
  );
}
