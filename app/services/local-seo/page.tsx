import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, CheckList, Prose } from "@/components/page/Blocks";
import { LocalMap } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/services/local-seo/";
const description =
  "Local SEO and Google Business Profile management from NÜE Digital. Map pack visibility, an optimized profile run like a social channel, reviews and local citations.";
export const metadata = pageMeta({ path, title: "Local SEO and Google Business Profile Management · NÜE Digital", description });

const faqs = [
  { q: "What is the map pack?", a: "It’s the block of three businesses with a map that Google shows for local searches like “dentist near me”. It often appears above the regular results, so it’s some of the most valuable space in local search." },
  { q: "How do you optimize a Google Business Profile?", a: "We complete and correct every field, build out the services menu, choose the right categories, add real photos, keep hours and special hours current, publish regular posts and offers, and manage reviews and Q&A." },
  { q: "Why treat Google Business Profile like social media?", a: "Because it behaves like one. Profiles that post updates, offers and team moments regularly give customers more reasons to choose you and give Google fresh signals that the business is active." },
  { q: "Do I need a physical address to rank locally?", a: "No. Service-area businesses can hide their address and define the area they serve. We set this up correctly so you stay within Google’s guidelines." },
  { q: "Can you remove bad reviews?", a: "Only reviews that break Google’s policies can be reported for removal. For everything else, the best answer is a calm, helpful reply and a steady flow of new reviews from happy customers." },
];

export default function Page() {
  return (
    <ServiceShell
      path={path}
      name="Local SEO"
      serviceType="Local search engine optimization"
      description={description}
      eyebrow="Service · Local SEO"
      title="Win the map. Win the call."
      lead={<p>When someone nearby needs what you offer, the decision often happens on the map, before they ever see a website. We make your Google Business Profile the most complete, active and trusted listing in your area.</p>}
      visual={<LocalMap />}
      faqs={faqs}
      related={["/services/reputation-management/", "/services/seo/", "/services/seo/ai-search-optimization/", "/services/social-media-marketing/"]}
      ctaTitle="See how your listing stacks up locally."
    >
      <Section id="gbp" eyebrow="Google Business Profile" title="Optimized to the fullest, then kept alive" tone="carbon" intro={<p>A profile set up once and left alone slowly falls behind. We run yours like a social channel.</p>}>
        <div className="grid gap-px bg-graphite md:grid-cols-2">
          {[
            { h: "Posts, updates & offers", p: "Regular posts about services, seasonal offers and news, so your listing always has something current to show." },
            { h: "Team & culture", p: "Staff appreciation and behind-the-scenes moments that show the people customers will actually meet." },
            { h: "Hours that are always right", p: "Holiday and special hours updated ahead of time, so no one drives to a closed door." },
            { h: "A services menu that sells", p: "Every service listed, described and categorised, so you appear for the specific things people search." },
          ].map((c) => (
            <div key={c.h} className="bg-carbon p-7">
              <h3 className="font-display text-xl font-semibold text-white">{c.h}</h3>
              <p className="mt-3 text-titanium-light">{c.p}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section id="beyond" eyebrow="Beyond the profile" title="The rest of the local picture">
        <CheckList items={["Consistent name, address and phone across directories", "Local citation building and cleanup", "Location and service-area pages on your site", "Review generation and response", "Local link and partnership opportunities", "Q&A and photo management", "Call and direction tracking", "Monthly local visibility reporting"]} />
      </Section>
      <Section id="note" eyebrow="Honest note" title="What we can and can’t control" tone="carbon">
        <Prose>
          <p>
            Google decides who appears in the map pack, and proximity to the searcher plays a part no one can change. What we can do is make sure every signal you control is complete, accurate and active, which is where most local businesses leave the biggest gaps.
          </p>
        </Prose>
      </Section>
    </ServiceShell>
  );
}
