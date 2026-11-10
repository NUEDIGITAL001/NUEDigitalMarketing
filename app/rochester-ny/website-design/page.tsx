import { LocalShell } from "@/components/page/LocalShell";
import { Section, Prose, NumberedGrid } from "@/components/page/Blocks";
import { SiteWireframe } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/rochester-ny/website-design/";
const description =
  "Website design in Rochester, NY from NÜE Digital: fast, search-ready, accessible websites built to turn local visitors into customers.";
export const metadata = pageMeta({ path, title: "Website Design in Rochester, NY · NÜE Digital", description });

const faqs = [
  { q: "Do you build websites for small businesses in Rochester?", a: "Yes. We design and build sites for local service businesses, practices and B2B companies across Rochester and Western New York." },
  { q: "Can we meet in person during the project?", a: "Yes. Local clients can meet with us at key points like discovery and design review, which often makes decisions faster." },
  { q: "Will my new website help me show up in Rochester searches?", a: "We build every site with local SEO in mind: clear service pages, location signals, schema and speed. Ongoing visibility also depends on content, your Google Business Profile and reviews." },
  { q: "Can you redesign my existing site without losing rankings?", a: "Yes. We map existing pages, keep what works, set up redirects and monitor after launch to protect your search visibility." },
  { q: "Do you provide photography for the site?", a: "When your package includes creative services, our creators can shoot your business, team and work so the site shows the real thing." },
];

export default function Page() {
  return (
    <LocalShell
      path={path}
      name="Website Design Rochester NY"
      serviceType="Website design and development"
      description={description}
      eyebrow="Rochester, NY · Websites"
      title="Websites built in Rochester, built to perform."
      lead={<p>Your website is often the first place a Rochester customer decides whether to call. We design and build sites that load fast, rank locally and make the next step obvious.</p>}
      visual={<SiteWireframe />}
      faqs={faqs}
      ctaTitle="Planning a new site? Let’s meet."
    >
      <Section id="local-site" eyebrow="Local by design" title="What a Rochester business website needs" tone="carbon">
        <NumberedGrid
          cols={3}
          items={[
            { title: "Local proof", body: "Real photos of your business and team, and reviews from local customers." },
            { title: "Clear service area", body: "The communities you serve, stated plainly and backed by useful content." },
            { title: "Mobile speed", body: "Most local searches happen on phones, often on the go." },
            { title: "Click-to-call", body: "One tap from the page to your phone, tracked." },
            { title: "Search structure", body: "Pages organised the way Rochester customers search for your services." },
            { title: "Easy updates", body: "Hours, seasonal offers and news you can change quickly." },
          ]}
        />
      </Section>
      <Section id="process" eyebrow="Working together" title="Face to face when it helps">
        <Prose>
          <p>
            Building a website goes faster when we understand the business firsthand. For Rochester-area clients we can meet at your location for discovery and design reviews, photograph your space, and talk through decisions in person. Learn more about our <a href="/services/website-design/">website design process</a>.
          </p>
        </Prose>
      </Section>
    </LocalShell>
  );
}
