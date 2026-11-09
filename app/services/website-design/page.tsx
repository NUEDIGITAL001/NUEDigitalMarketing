import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, NumberedGrid, CheckList } from "@/components/page/Blocks";
import { SiteWireframe } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/services/website-design/";
const description =
  "Website design and development from NÜE Digital: fast, accessible, search-ready websites built to turn visitors into inquiries. Redesigns and new builds for growing businesses.";
export const metadata = pageMeta({ path, title: "Website Design and Development for Growth · NÜE Digital", description });

const faqs = [
  { q: "How long does a new website take?", a: "It depends on the number of pages, content readiness and integrations. We give you a timeline after discovery, and you see designs early so there are no surprises at launch." },
  { q: "Will I be able to update the site myself?", a: "Yes. We set up editing for the things you change often, and we can handle updates for you as part of ongoing support." },
  { q: "Will a redesign hurt my SEO?", a: "It can if it’s done carelessly. We map every existing URL, set up redirects, keep what ranks and improve what doesn’t, so a redesign protects the search visibility you’ve earned." },
  { q: "What platform do you build on?", a: "We choose the platform that fits your needs. For performance-focused marketing sites we often use modern frameworks like Next.js; for businesses that need simple self-editing, a CMS may be a better fit." },
  { q: "Do you write the content?", a: "We can. Strong websites start with clear messaging, so content planning and copywriting are part of our process." },
];

export default function Page() {
  return (
    <ServiceShell
      path={path}
      name="Website Design & Development"
      serviceType="Website design and development"
      description={description}
      eyebrow="Service · Websites"
      title="A website that works as hard as you do."
      lead={<p>Your website is the one place where every channel ends up. We design and build sites that load fast, rank well, read clearly and give visitors an obvious next step.</p>}
      visual={<SiteWireframe />}
      faqs={faqs}
      related={["/services/landing-pages-funnels/", "/services/seo/", "/services/photography-video/", "/services/ai-marketing-automation/"]}
      ctaTitle="Planning a new website? Start here."
    >
      <Section id="standards" eyebrow="Our standards" title="What every NÜE site is built to do" tone="carbon">
        <NumberedGrid
          cols={3}
          items={[
            { title: "Load fast", body: "Built for strong Core Web Vitals on real phones, not just a fast office connection." },
            { title: "Be found", body: "Clean structure, schema and content organised the way customers search." },
            { title: "Be clear", body: "Every page answers who you help, how, and what to do next within seconds." },
            { title: "Convert", body: "Calls to action, forms and click-to-call placed where decisions happen, and tracked." },
            { title: "Include everyone", body: "Accessible to WCAG 2.2 AA, with reduced-motion support and readable contrast." },
            { title: "Grow with you", body: "A structure that makes adding services, locations and content easy later." },
          ]}
        />
      </Section>
      <Section id="process" eyebrow="The build" title="From discovery to launch">
        <ol className="space-y-6">
          {[
            ["Discovery", "Goals, audience, competitors, current analytics and what the site needs to do."],
            ["Structure & messaging", "Sitemap, page goals and the words, before any design."],
            ["Design", "Desktop and mobile designs reviewed together, built from your brand."],
            ["Build & test", "Development, speed and accessibility testing, tracking set up, redirects mapped."],
            ["Launch & improve", "A careful launch, then monitoring and improvements based on real behaviour."],
          ].map(([h, p], i) => (
            <li key={h} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-graphite pb-6">
              <span className="mono-data pt-1 text-teal">0{i + 1}</span>
              <div>
                <h3 className="font-display text-xl font-semibold text-white">{h}</h3>
                <p className="mt-2 text-titanium-light">{p}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section id="includes" eyebrow="Included" title="Part of every build" tone="carbon">
        <CheckList items={["Mobile-first responsive design", "On-page SEO and schema", "Analytics and conversion tracking", "Form and call tracking", "Redirect mapping for redesigns", "Accessibility testing", "Speed optimization", "Training and handover"]} />
      </Section>
    </ServiceShell>
  );
}
