import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import { industries, rochester, services } from "./site";

/**
 * Blog content lives in content/blog/<slug>.md. Each file is validated at
 * build time, so a post with a missing field, an unknown category or a
 * broken internal link fails the build instead of going live.
 * The publishing process is documented in docs/blog-playbook.md.
 */
export const categories = ["Strategy", "SEO", "AI Search", "Local SEO", "Paid Media", "Social Media", "Websites", "Content & Email", "Reputation", "Measurement"] as const;
export type Category = (typeof categories)[number];

export type Post = {
  slug: string;
  path: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  updated?: string;
  category: Category;
  cover: string;
  coverAlt: string;
  /** Service, industry or Rochester pages this post supports. Drives interlinking both ways. */
  related: string[];
  takeaways: string[];
  faqs: { q: string; a: string }[];
  html: string;
  toc: { id: string; text: string }[];
  minutes: number;
};

const dir = path.join(process.cwd(), "content", "blog");
const linkable = new Map([...services, ...industries, ...rochester].map((l) => [l.href, l]));
const slugify = (s: string) => s.toLowerCase().replace(/&amp;|&/g, "and").replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const isDate = (s: unknown): s is string => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);

function load(file: string): Post | null {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  if (data.draft) return null;
  const fail = (why: string): never => {
    throw new Error(`content/blog/${file}: ${why}`);
  };
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail("file name must be lowercase words joined by hyphens");
  for (const k of ["title", "description", "excerpt", "category", "cover", "coverAlt"]) if (typeof data[k] !== "string" || !data[k].trim()) fail(`missing "${k}"`);
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
  const updated = data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : data.updated;
  if (!isDate(date)) fail('"date" must be YYYY-MM-DD');
  if (updated !== undefined && !isDate(updated)) fail('"updated" must be YYYY-MM-DD');
  if (!categories.includes(data.category)) fail(`unknown category "${data.category}". Use one of: ${categories.join(", ")}`);
  if (data.description.length > 165) fail(`description is ${data.description.length} characters; keep it to 165 or fewer`);
  if (!fs.existsSync(path.join(process.cwd(), "public", data.cover))) fail(`cover image not found in public${data.cover}`);
  const related: string[] = data.related ?? [];
  if (!related.length) fail('"related" needs at least one service, industry or Rochester page');
  for (const r of related) if (!linkable.has(r)) fail(`"related" has an unknown page ${r}`);

  const toc: Post["toc"] = [];
  const md = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        if (depth === 1) fail("do not use a # heading in the body; the title is the only H1");
        const id = slugify(text);
        if (depth === 2) toc.push({ id, text: text.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.startsWith("https://nuedigitalmarketing.com");
        if (!external && href.startsWith("/") && !href.endsWith("/") && !href.includes("#")) fail(`internal link ${href} needs a trailing slash`);
        return external ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>` : `<a href="${href}">${text}</a>`;
      },
    },
  });
  const html = md.parse(content, { async: false });
  const words = content.split(/\s+/).filter(Boolean).length;
  if (words < 300) fail(`body is only ${words} words; posts should be at least 300`);
  if (!/href="\/(services|industries|rochester-ny|contact)\//.test(html)) fail("the body must link to at least one service, industry, Rochester or contact page");

  return {
    slug, path: `/blog/${slug}/`, title: data.title, description: data.description, excerpt: data.excerpt, date, updated,
    category: data.category, cover: data.cover, coverAlt: data.coverAlt, related,
    takeaways: data.takeaways ?? [], faqs: data.faqs ?? [], html, toc, minutes: Math.max(2, Math.round(words / 220)),
  };
}

let cache: Post[] | null = null;
/** Every published post, newest first. */
export function allPosts(): Post[] {
  if (cache) return cache;
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")) : [];
  cache = files.map(load).filter((p): p is Post => !!p).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
  return cache;
}
export const getPost = (slug: string) => allPosts().find((p) => p.slug === slug);
/** Posts that support a given service, industry or Rochester page. */
export const postsFor = (pagePath: string, limit = 3) => allPosts().filter((p) => p.related.includes(pagePath)).slice(0, limit);
/** Other posts to read next: same category first, then newest. */
export function morePosts(post: Post, limit = 3) {
  const rest = allPosts().filter((p) => p.slug !== post.slug);
  return [...rest.filter((p) => p.category === post.category), ...rest.filter((p) => p.category !== post.category)].slice(0, limit);
}
export const relatedLinks = (post: Post) => post.related.map((r) => linkable.get(r)!);
export const formatDate = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
