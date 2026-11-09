import { PageHero } from "@/components/page/PageHero";
import { CtaBand, Section, Prose } from "@/components/page/Blocks";
import { JsonLd } from "@/components/page/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { pageMeta } from "@/lib/meta";

const path = "/philosophy/";
export const metadata = pageMeta({
  path,
  title: "Our Philosophy · NÜE Digital",
  description: "What NÜE Digital believes about marketing: strategy before tactics, outcomes over activity, honest measurement and work we are proud of. When our different is better, we win.",
});

const beliefs = [
  { t: "Strategy before tactics", b: "The most expensive marketing is the kind that’s well executed in the wrong direction. We decide where growth comes from before choosing channels." },
  { t: "Outcomes over activity", b: "Posts, clicks and impressions are means, not ends. We measure success in inquiries, customers and revenue." },
  { t: "Honesty over promises", b: "No one controls Google or guarantees rankings. We tell you what we can influence, what we can’t, and what the data actually says." },
  { t: "Connected, not siloed", b: "Ads, search, social and your website affect each other. One partner seeing the whole picture beats five vendors guarding their own." },
  { t: "The right specialist for the job", b: "We bring in people who are excellent at a specific task instead of stretching generalists across everything." },
  { t: "Work we’re proud of", b: "Our team and creators share a simple standard: build something you’d put your name on, that turns visitors into long-standing customers." },
];

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Philosophy", path }];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Approach · Philosophy"
        title={<>When our different is better, <span className="text-teal">we win.</span></>}
        lead={<p>NÜE exists because too much marketing is busy without being useful. These are the beliefs that shape how we work, what we recommend and what we refuse to do.</p>}
      />
      <section aria-labelledby="beliefs-t" className="border-b border-graphite bg-carbon">
        <div className="container-nue section-m">
          <h2 id="beliefs-t" className="sr-only">What we believe</h2>
          <ol className="divide-y divide-graphite border-y border-graphite">
            {beliefs.map((x, i) => (
              <li key={x.t} className="grid gap-4 py-10 md:grid-cols-12 md:gap-8">
                <span className="mono-data text-teal md:col-span-1">0{i + 1}</span>
                <h3 className="font-display text-3xl font-semibold uppercase leading-tight text-white md:col-span-5">{x.t}</h3>
                <p className="body-l text-titanium-light md:col-span-6">{x.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Section id="name" eyebrow="The name" title="Built for what’s next">
        <Prose>
          <p>
            Marketing changes constantly: new platforms, new search behaviour, AI rewriting how people find answers. We built NÜE to look ahead, to help businesses prepare for what’s next rather than chase what worked last year.
          </p>
          <p>
            That’s also why we lead with consulting. Tools change. A clear understanding of your business and your customers doesn’t go out of date.
          </p>
        </Prose>
      </Section>
      <CtaBand source={path} />
    </>
  );
}
