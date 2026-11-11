import { Section } from "@/components/page/Blocks";
import { postsFor } from "@/lib/blog";
import { PostGrid } from "./PostCard";

/** Shown on a service, industry or Rochester page once a post lists that page as related. */
export function RelatedPosts({ path }: { path: string }) {
  const posts = postsFor(path, 2);
  if (!posts.length) return null;
  return (
    <Section id="reading" eyebrow="From the blog" title="Related reading" tone="carbon">
      <PostGrid posts={posts} cols={2} />
    </Section>
  );
}
