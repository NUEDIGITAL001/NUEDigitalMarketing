import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand, Section } from "@/components/page/Blocks";
import { JsonLd } from "@/components/page/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { services } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

const path = "/services/";
export const metadata = pageMeta({
  path,
  title: "Marketing Services: Strategy, SEO, Ads, Social and Web · NÜE Digital",
  description: "NÜE Digital’s marketing services: growth strategy, SEO, AI search, local SEO, paid search, social media, websites, content, reputation, automation and creative.",
});

const groups = [
  { name: "Strategy", note: "Decide where growth comes from.", items: ["/services/growth-strategy/"] },
  { name: "Be found", note: "Show up where customers search and ask.", items: ["/services/seo/", "/services/seo/ai-search-optimization/", "/services/local-seo/", "/services/search-engine-marketing/"] },
  { name: "Be chosen", note: "Earn trust and attention.", items: ["/services/social-media-marketing/", "/services/reputation-management/", "/services/content-email-marketing/", "/services/photography-video/"] },
  { name: "Convert & scale", note: "Turn interest into customers, efficiently.", items: ["/services/website-design/", "/services/landing-pages-funnels/", "/services/ai-marketing-automation/"] },
];

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path }];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Services"
        title="Every service connected to one plan."
        lead={<p>We don’t sell channels in isolation. Each service below is a piece of a growth system, chosen and combined based on what your business needs next.</p>}
      />
      {groups.map((g, gi) => (
        <Section key={g.name} id={`group-${gi}`} eyebrow={`0${gi + 1}`} title={g.name} intro={<p>{g.note}</p>} tone={gi % 2 ? "carbon" : "obsidian"}>
          <ul className="border-t border-graphite">
            {g.items.map((h) => {
              const s = services.find((x) => x.href === h)!;
              return (
                <li key={h} className="border-b border-graphite">
                  <Link href={h} className="group grid gap-2 py-6 md:grid-cols-[1fr_1.2fr_auto] md:items-center md:gap-8">
                    <span className="font-display text-2xl font-semibold text-white group-hover:text-ice">{s.label}</span>
                    <span className="text-titanium-light">{s.blurb}</span>
                    <span aria-hidden="true" className="hidden text-teal transition-transform group-hover:translate-x-1 md:block">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>
      ))}
      <CtaBand title="Not sure where to start?" lead="Most businesses don’t need every service. Tell us where you are and we’ll recommend what would make the biggest difference first." source={path} />
    </>
  );
}
