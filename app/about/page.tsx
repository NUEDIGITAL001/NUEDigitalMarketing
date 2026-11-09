import { PageHero } from "@/components/page/PageHero";
import { CtaBand, Section, Prose, LinkGrid } from "@/components/page/Blocks";
import { JsonLd } from "@/components/page/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

const path = "/about/";
export const metadata = pageMeta({
  path,
  title: "About NÜE Digital · Marketing + Consultancy, Rochester NY",
  description: "About NÜE Digital: a Rochester, NY marketing and growth consultancy with several decades of combined experience in digital marketing and paid advertising, plus a network of creators.",
});

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "About", path }];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Approach · About NÜE"
        title="A consulting-led growth partner."
        lead={<p>NÜE Digital is a Rochester, NY marketing and consulting firm for businesses that want their marketing to produce measurable results, not just more activity.</p>}
      />
      <Section id="who" eyebrow="Who we are" title="Experience, plus the right people" tone="carbon">
        <Prose>
          <p>
            Our team brings several decades of combined experience in digital marketing and paid advertising. We’ve seen channels rise and fall, and learned that what lasts is a clear strategy, honest measurement and execution done well.
          </p>
          <p>
            Around that core is a network of creators and specialists: designers, developers, writers, photographers and videographers who share the same vision. They want to create something they can be proud of that turns digital visitors into long-standing customers.
          </p>
          <p>
            We bring in the right people for each piece of work, and one team stays accountable for the whole plan.
          </p>
        </Prose>
      </Section>
      <Section id="facts" eyebrow="At a glance" title="The essentials">
        <dl className="grid gap-px bg-graphite sm:grid-cols-2">
          {[
            ["Based in", site.location],
            ["Service area", site.serviceArea],
            ["What we do", "Marketing strategy, consulting and execution"],
            ["How we work", "Discover · Strategize · Execute · Optimize"],
          ].map(([k, v]) => (
            <div key={k} className="bg-obsidian p-7">
              <dt className="mono-data text-teal">{k}</dt>
              <dd className="mt-3 font-display text-xl text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section id="more" eyebrow="Keep exploring" title="How we think and work" tone="carbon">
        <LinkGrid links={[{ label: "Our philosophy", href: "/philosophy/", blurb: "What we believe about marketing." }, { label: "Our methodology", href: "/methodology/", blurb: "The four phases of every engagement." }, { label: "Services", href: "/services/", blurb: "Everything we can help with." }, { label: "Industries", href: "/industries/", blurb: "Where we focus." }]} />
      </Section>
      <CtaBand source={path} />
    </>
  );
}
