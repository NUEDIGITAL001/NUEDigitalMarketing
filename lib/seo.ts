import { site } from "./site";

/**
 * Organization + ProfessionalService (a LocalBusiness subtype).
 * Service-area business: no street address is published (decided
 * 2026-11-09). Add telephone/email only when Matt approves showing them.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/brand/NUE-Digital-logo-primary.svg`,
        slogan: "Built for what's next.",
        description: site.description,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#business`,
        name: site.name,
        url: site.url,
        image: `${site.url}/brand/NUE-Digital-logo-primary.svg`,
        parentOrganization: { "@id": `${site.url}/#organization` },
        description: site.description,
        areaServed: [
          { "@type": "City", name: "Rochester", containedInPlace: { "@type": "State", name: "New York" } },
          { "@type": "AdministrativeArea", name: "Western New York" },
          { "@type": "Country", name: "United States" },
        ],
      },
    ],
  };
}

export function webPageJsonLd({ path, name, description }: { path: string; name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site.url}${path}#webpage`,
    url: `${site.url}${path}`,
    name,
    description,
    isPartOf: { "@id": `${site.url}/#organization` },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path}`,
    })),
  };
}

export function serviceJsonLd({ path, name, description, serviceType }: { path: string; name: string; description: string; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${path}#service`,
    name,
    serviceType,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#business` },
    areaServed: [
      { "@type": "City", name: "Rochester", containedInPlace: { "@type": "State", name: "New York" } },
      { "@type": "AdministrativeArea", name: "Western New York" },
      { "@type": "Country", name: "United States" },
    ],
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
