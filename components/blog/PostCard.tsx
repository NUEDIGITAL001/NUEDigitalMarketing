import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/lib/blog";

/** Blog card: featured image, category, date, title and excerpt. */
export function PostCard({ post, featured, priority }: { post: Post; featured?: boolean; priority?: boolean }) {
  return (
    <article className={`post-card group relative flex h-full flex-col overflow-hidden border border-graphite bg-obsidian/60 ${featured ? "lg:grid lg:grid-cols-2" : ""}`}>
      <div className="relative aspect-[16/9] overflow-hidden bg-carbon">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          priority={priority}
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105"
        />
      </div>
      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:justify-center lg:p-12" : ""}`}>
        <p className="mono-data flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-teal">{post.category}</span>
          <span aria-hidden="true" className="text-titanium">/</span>
          <time dateTime={post.date} className="text-titanium-light">{formatDate(post.date)}</time>
        </p>
        <h3 className={`mt-4 font-display font-semibold leading-tight text-white ${featured ? "text-3xl md:text-4xl" : "text-xl"}`}>
          <Link href={post.path} className="after:absolute after:inset-0 hover:text-ice">{post.title}</Link>
        </h3>
        <p className="mt-4 flex-1 text-titanium-light">{post.excerpt}</p>
        <p aria-hidden="true" className="ui-text mt-6 text-ice">
          Read the article <span className="inline-block text-teal transition-transform group-hover:translate-x-1">→</span>
        </p>
      </div>
    </article>
  );
}

export function PostGrid({ posts, cols = 3 }: { posts: Post[]; cols?: 2 | 3 }) {
  return (
    <ul className={`grid gap-6 md:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
      {posts.map((p) => (
        <li key={p.slug}><PostCard post={p} /></li>
      ))}
    </ul>
  );
}
