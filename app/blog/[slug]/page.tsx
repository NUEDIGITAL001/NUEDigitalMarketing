import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CtaBand, FaqList, LinkGrid, Section } from "@/components/page/Blocks";
import { JsonLd } from "@/components/page/JsonLd";
import { PostGrid } from "@/components/blog/PostCard";
import { ButtonLink } from "@/components/ui/Button";
import { allPosts, formatDate, getPost, morePosts, relatedLinks } from "@/lib/blog";
import { blogPostingJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { pageMeta } from "@/lib/meta";

/**
 * The single-post template. Every post in content/blog renders through
 * this file, so the layout, schema and interlinking stay identical.
 */
export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMeta({
    path: post.path,
    title: `${post.title} · NÜE Digital`,
    description: post.description,
    image: { url: post.cover, width: 1600, height: 900, alt: post.coverAlt },
    article: { published: post.date, modified: post.updated ?? post.date, section: post.category },
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }, { name: post.title, path: post.path }];
  const more = morePosts(post);
  return (
    <>
      <JsonLd data={[blogPostingJsonLd(post), breadcrumbJsonLd(crumbs), ...(post.faqs.length ? [faqJsonLd(post.faqs, { path: post.path, about: `${post.path}#article` })] : [])]} />
      <article>
        <header className="cta-glow relative isolate overflow-hidden border-b border-graphite bg-obsidian">
          <div className="container-nue pb-14 pt-36 lg:pt-44">
            <nav aria-label="Breadcrumb">
              <ol className="mono-data flex flex-wrap items-center gap-2 text-titanium-light">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li className="flex items-center gap-2"><span aria-hidden="true" className="text-titanium">/</span><Link href="/blog/" className="hover:text-white">Blog</Link></li>
                <li className="flex items-center gap-2"><span aria-hidden="true" className="text-titanium">/</span><span aria-current="page" className="text-concrete">{post.category}</span></li>
              </ol>
            </nav>
            <p className="mono-data mt-10 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-teal">{post.category}</span>
              <span aria-hidden="true" className="text-titanium">/</span>
              <time dateTime={post.date} className="text-titanium-light">{formatDate(post.date)}</time>
              <span aria-hidden="true" className="text-titanium">/</span>
              <span className="text-titanium-light">{post.minutes} min read</span>
            </p>
            <h1 className="display-l mt-6 max-w-[24ch]">{post.title}</h1>
            <p className="body-l measure mt-8 text-concrete">{post.excerpt}</p>
            {post.updated && post.updated !== post.date && (
              <p className="mono-data mt-6 text-titanium-light">Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></p>
            )}
          </div>
          <div className="container-nue pb-16">
            <div className="glass relative aspect-[16/9] overflow-hidden border border-graphite">
              <Image src={post.cover} alt={post.coverAlt} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
            </div>
          </div>
        </header>

        <div className="border-b border-graphite bg-carbon">
          <div className="container-nue section-m grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {post.takeaways.length > 0 && (
                <section aria-labelledby="takeaways-title" className="card-nue mb-12 border border-graphite border-l-2 border-l-teal bg-obsidian/60 p-6 md:p-8">
                  <h2 id="takeaways-title" className="eyebrow">Key takeaways</h2>
                  <ul className="mt-5 space-y-3 text-concrete">
                    {post.takeaways.map((t) => (
                      <li key={t} className="flex gap-3"><span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-teal" />{t}</li>
                    ))}
                  </ul>
                </section>
              )}
              <div className="prose-nue post-body measure space-y-5 text-concrete" dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="space-y-10 lg:sticky lg:top-28">
                {post.toc.length > 1 && (
                  <nav aria-label="In this article">
                    <p className="ui-text text-white">In this article</p>
                    <ol className="mt-5 space-y-3 border-l border-graphite text-sm">
                      {post.toc.map((h) => (
                        <li key={h.id}><a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 text-titanium-light hover:border-teal hover:text-white">{h.text}</a></li>
                      ))}
                    </ol>
                  </nav>
                )}
                <div className="glass border border-graphite p-6">
                  <p className="font-display text-xl font-semibold text-white">Want this applied to your business?</p>
                  <p className="mt-3 text-sm text-titanium-light">Tell us where you are today and get an honest read on where to focus first.</p>
                  <ButtonLink href="/contact/" track={`blog-aside-${post.slug}`} className="mt-6">Start a Conversation</ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {post.faqs.length > 0 && (
        <Section id="faq" eyebrow="Questions" title="Quick answers" tone="obsidian">
          <FaqList faqs={post.faqs} />
        </Section>
      )}
      <Section id="related-services" eyebrow="How we help" title="Put this into practice" tone="carbon">
        <LinkGrid links={relatedLinks(post)} />
      </Section>
      {more.length > 0 && (
        <section aria-labelledby="more-title" className="border-b border-graphite bg-obsidian">
          <div className="container-nue section-m">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="more-title" className="h2 text-white">Keep reading</h2>
              <ButtonLink href="/blog/" variant="text" track="blog-all">All articles</ButtonLink>
            </div>
            <div className="mt-10"><PostGrid posts={more} /></div>
          </div>
        </section>
      )}
      <CtaBand source={post.path} />
    </>
  );
}
