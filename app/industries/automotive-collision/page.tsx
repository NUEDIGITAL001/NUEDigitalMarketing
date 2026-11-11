import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, NumberedGrid, Prose } from "@/components/page/Blocks";
import { Journey } from "@/components/visuals/IndustryVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/industries/automotive-collision/";
const description =
  "Marketing for auto repair shops, collision centers and dealerships from NÜE Digital: local SEO, reviews and websites that earn drivers’ trust.";
export const metadata = pageMeta({ path, title: "Automotive and Collision Repair Marketing · NÜE Digital", description });

const faqs = [
  { q: "How do auto repair shops get more customers online?", a: "By being easy to find and easy to trust: a strong map listing, lots of recent reviews that mention honesty and quality, clear service pages and a quick way to book or call." },
  { q: "Can marketing help collision shops beyond insurance referrals?", a: "Yes. Drivers increasingly research shops themselves after an accident. Explaining your process, insurance help and warranty clearly helps them choose you." },
  { q: "Do dealerships need different marketing?", a: "Dealerships have more inventory-driven and service-department needs, but the trust fundamentals are the same. We tailor the plan to sales, service or both." },
  { q: "What should be on our website?", a: "Services, how estimates and insurance work, warranty details, real photos of your shop and team, reviews and an easy way to schedule." },
  { q: "How do we get customers to come back for maintenance?", a: "Reminders and useful seasonal emails, plus a great first experience. Retention is often the most profitable growth lever for service shops." },
];

export default function Page() {
  return (
    <ServiceShell
      kind="industry"
      path={path}
      name="Automotive & Collision Repair"
      serviceType="Automotive and collision repair marketing"
      description={description}
      eyebrow="Industry · Automotive"
      title="Be the shop drivers trust at a stressful moment."
      lead={<p>After a breakdown or an accident, drivers are anxious and short on time. They want someone honest, nearby and clear about what happens next. We help your shop show exactly that.</p>}
      visual={<Journey title="Driver journey after a breakdown or accident from problem to repair to return" stages={["Problem", "Search", "Trust?", "Estimate", "Repair", "Return"]} focus={2} caption="Trust decides the shop" />}
      faqs={faqs}
      related={["/services/local-seo/", "/services/reputation-management/", "/services/website-design/", "/services/content-email-marketing/"]}
    >
      <Section id="trust" eyebrow="What drivers look for" title="Signals that say “you’re in good hands”" tone="carbon">
        <NumberedGrid
          cols={3}
          items={[
            { title: "Honest reviews", body: "Recent reviews that mention fair pricing, clear communication and quality." },
            { title: "Clear process", body: "How estimates, insurance claims and timelines work, explained plainly." },
            { title: "Real shop, real team", body: "Photos of your facility, equipment and people instead of stock cars." },
            { title: "Certifications & warranty", body: "The credentials and guarantees you actually hold, shown clearly." },
            { title: "Easy contact", body: "Click-to-call, online scheduling and directions that just work." },
            { title: "Fast replies", body: "Quick answers to estimate requests and questions, even after hours." },
          ]}
        />
      </Section>
      <Section id="retention" eyebrow="Beyond the first visit" title="Turn one repair into a relationship">
        <Prose>
          <p>
            The most valuable customer is the one who comes back for every oil change and recommends you to family. We set up reminders, seasonal check-in emails and review requests so a single visit becomes years of business.
          </p>
        </Prose>
      </Section>
    </ServiceShell>
  );
}
