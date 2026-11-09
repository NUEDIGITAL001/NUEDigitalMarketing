import { PageHero } from "@/components/page/PageHero";
import { CtaBand, Section, Prose } from "@/components/page/Blocks";
import { pageMeta } from "@/lib/meta";

const path = "/insights/";
// Kept out of the index until the first articles are published.
export const metadata = pageMeta({
  path,
  title: "Insights · NÜE Digital",
  description: "Marketing insights from NÜE Digital on strategy, SEO, AI search, paid media and growth.",
  noindex: true,
});

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Insights", path }]}
        eyebrow="Insights"
        title="Thinking about what’s next."
        lead={<p>Practical writing on strategy, search, AI and growth for business owners and marketing leaders. The first articles are on the way.</p>}
      />
      <Section id="soon" eyebrow="Coming soon" title="What we’ll cover" tone="carbon">
        <Prose>
          <ul>
            <li>How AI Overviews and assistants are changing local search</li>
            <li>What a Google Business Profile “optimized to the fullest” looks like</li>
            <li>Measuring marketing by inquiries, not impressions</li>
            <li>When to hire an agency, a consultant or both</li>
          </ul>
        </Prose>
      </Section>
      <CtaBand source={path} />
    </>
  );
}
