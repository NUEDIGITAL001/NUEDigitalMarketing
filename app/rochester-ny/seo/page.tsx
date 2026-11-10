import { LocalShell } from "@/components/page/LocalShell";
import { Section, Prose, NumberedGrid } from "@/components/page/Blocks";
import { LocalMap } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/rochester-ny/seo/";
const description =
  "SEO company in Rochester, NY. NÜE Digital helps local businesses win Google search, the map pack and AI answers with local SEO and Business Profile work.";
export const metadata = pageMeta({ path, title: "SEO Company in Rochester, NY · Local SEO · NÜE Digital", description });

const faqs = [
  { q: "How do I rank in Rochester and the suburbs, not just downtown?", a: "Google weighs proximity, so one location rarely ranks everywhere. We define your service area properly, build useful content about the areas you serve and strengthen your profile and reviews so you compete across more of the region." },
  { q: "Should I create a page for every Rochester suburb?", a: "Not as copies with the town name swapped. Thin, repetitive pages can hurt you. We create area content only where there is something genuinely useful to say." },
  { q: "How long does local SEO take in Rochester?", a: "SEO is ongoing. In most cases our clients see meaningful early progress within the first 90 days, especially from Google Business Profile and on-site fixes. We don’t promise specific rankings." },
  { q: "Do you offer SEO audits for Rochester businesses?", a: "Yes. We review your site, profile, citations and competitors and give you a prioritised plan. Start a conversation to set one up." },
  { q: "Do you also handle AI search?", a: "Yes. We optimize for AI Overviews and assistants like ChatGPT alongside traditional search, so your business is described correctly wherever people ask." },
];

export default function Page() {
  return (
    <LocalShell
      path={path}
      name="SEO Rochester NY"
      serviceType="Local SEO services"
      description={description}
      eyebrow="Rochester, NY · SEO"
      title="Be the first name Rochester finds."
      lead={<p>From Greece to Pittsford, people search for local businesses on their phones and pick from the map. We help Rochester businesses earn those top spots and turn searches into calls.</p>}
      visual={<LocalMap />}
      faqs={faqs}
      ctaTitle="Get a local SEO review for your business."
    >
      <Section id="landscape" eyebrow="The Rochester search landscape" title="Local search here is crowded and close" tone="carbon">
        <Prose>
          <p>
            In a metro the size of Rochester, many categories have dozens of competitors within a few miles of each other. The map pack shows three. Small advantages, like a more complete profile, more recent reviews and a page that answers the exact search, decide who gets seen.
          </p>
          <p>
            We start every Rochester SEO engagement by looking at the results your customers actually see in the areas you serve, then work out what it will take to compete there. Read more about our broader <a href="/services/seo/">SEO services</a> and <a href="/services/local-seo/">local SEO approach</a>.
          </p>
        </Prose>
      </Section>
      <Section id="plan" eyebrow="What we do" title="Rochester SEO, step by step">
        <NumberedGrid
          items={[
            { title: "Local audit", body: "Your site, Google Business Profile, citations and reviews against the competitors showing in your area." },
            { title: "Profile, optimized to the fullest", body: "Every field, service and category, then regular posts, offers and updates like a social channel." },
            { title: "Pages that match local searches", body: "Service pages and useful area content for the communities you actually serve." },
            { title: "Reviews and reputation", body: "A system for steady, genuine reviews from Rochester customers." },
          ]}
        />
      </Section>
    </LocalShell>
  );
}
