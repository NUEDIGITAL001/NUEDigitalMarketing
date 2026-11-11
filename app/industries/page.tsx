import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand, Section, Prose } from "@/components/page/Blocks";
import { JsonLd } from "@/components/page/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { industries } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

const path = "/industries/";
export const metadata = pageMeta({
  path,
  title: "Industries We Serve · NÜE Digital",
  description: "Marketing for healthcare, dental, veterinary, home services, automotive, manufacturing and hospitality businesses, from NÜE Digital in Rochester, NY.",
});

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Industries", path }];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Industries"
        title="Different industries. Different paths to a customer."
        lead={<p>A dental patient, a homeowner with a leak and an engineer sourcing a supplier make decisions in completely different ways. We start with how your customers decide.</p>}
      />
      <Section id="list" eyebrow="Where we focus" title="Industries we focus on" tone="carbon">
        <ol className="grid gap-px bg-graphite md:grid-cols-2">
          {industries.map((ind, i) => (
            <li key={ind.href} className="bg-carbon">
              <Link href={ind.href} className="group flex h-full flex-col gap-4 p-7 hover:bg-graphite/40">
                <span className="mono-data text-teal">0{i + 1}</span>
                <span className="font-display text-2xl font-semibold text-white group-hover:text-ice">{ind.label}</span>
                <span className="text-titanium-light">{ind.challenge}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>
      <Section id="other" eyebrow="Don’t see yours?" title="The method travels">
        <Prose>
          <p>
            These are the industries we focus on, but our <a href="/methodology/">methodology</a> works for any business that sells to customers who search, compare and decide. If yours isn’t listed, start a conversation anyway.
          </p>
        </Prose>
      </Section>
      <CtaBand source={path} />
    </>
  );
}
