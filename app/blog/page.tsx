import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/Blocks";
import { JsonLd } from "@/components/page/JsonLd";
import { PostCard, PostGrid } from "@/components/blog/PostCard";
import { allPosts } from "@/lib/blog";
import { blogJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { pageMeta } from "@/lib/meta";

const path = "/blog/";
const title = "Marketing Blog · Strategy, SEO & AI Search · NÜE Digital";
const description = "Practical marketing advice from NÜE Digital in Rochester, NY: strategy, SEO, AI search, local visibility, paid media and measuring what produces customers.";

// Stays out of search results until the first post is published.
export const metadata = pageMeta({ path, title, description, noindex: allPosts().length === 0 });

export default function Page() {
  const posts = allPosts();
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path }];
  const [first, ...rest] = posts;
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), blogJsonLd({ path, name: title, description, posts })]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="The NÜE blog"
        title="Thinking about what’s next."
        lead={<p>Practical writing on strategy, search, AI and growth for business owners and marketing leaders. No fluff, no jargon.</p>}
      />
      <section aria-labelledby="posts-title" className="section-glow relative isolate overflow-hidden border-b border-graphite bg-carbon">
        <div className="container-nue section-m">
          <h2 id="posts-title" className="eyebrow">Latest articles</h2>
          {first ? (
            <>
              <div className="mt-8" data-reveal><PostCard post={first} featured priority /></div>
              {rest.length > 0 && <div className="mt-6" data-reveal="late"><PostGrid posts={rest} /></div>}
            </>
          ) : (
            <p className="body-l mt-8 text-concrete">The first articles are on the way.</p>
          )}
        </div>
      </section>
      <CtaBand source={path} />
    </>
  );
}
