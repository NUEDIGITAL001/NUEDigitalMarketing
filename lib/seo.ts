import { services, site } from "./site";
import type { Post } from "./blog";

/**
 * Structured data. Everything is one connected graph, joined by @id:
 *
 *   Organization  <- WebSite (publisher)
 *        ^
 *   LocalBusiness (ProfessionalService)  --hasOfferCatalog-->  every Service
 *        ^                                                        |
 *        +---- provider --------------------------------------- Service
 *        +---- about / publisher ---- FAQPage ---- about ------> Service
 *
 * The business node is printed on every page (app/layout.tsx), so a
 * Service or FAQPage on any page can point back to it.
 *
 * Service-area business: no street address is published. Add `telephone`
 * to lib/site.ts when the number is chosen and it flows through here.
 */
const ORG = `${site.url}/#organization`;
const BIZ = `${site.url}/#business`;
const WEB = `${site.url}/#website`;
const abs = (p: string) => `${site.url}${p}`;
const logo = abs("/brand/NUE-Digital-logo-primary.svg");
const areaServed = [
  { "@type": "City", name: "Rochester", containedInPlace: { "@type": "State", name: "New York" } },
  { "@type": "AdministrativeArea", name: "Western New York" },
  { "@type": "Country", name: "United States" },
];

export function organizationJsonLd() {
  const contact = { email: site.email, ...(site.phone ? { telephone: site.phone } : {}) };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG,
        name: site.name,
        url: site.url,
        logo,
        slogan: "Built for what's next.",
        description: site.description,
        ...contact,
      },
      {
        "@type": "WebSite",
        "@id": WEB,
        url: site.url,
        name: site.name,
        inLanguage: "en-US",
        publisher: { "@id": ORG },
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": BIZ,
        name: site.name,
        url: site.url,
        image: abs("/og/nue-digital.png"),
        logo,
        parentOrganization: { "@id": ORG },
        description: site.description,
        ...contact,
        address: { "@type": "PostalAddress", addressLocality: "Rochester", addressRegion: "NY", addressCountry: "US" },
        areaServed,
        contactPoint: { "@type": "ContactPoint", contactType: "sales", url: abs("/contact/"), areaServed: "US", availableLanguage: "English", ...contact },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Marketing and consulting services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", "@id": `${abs(s.href)}#service`, name: s.label, url: abs(s.href) },
          })),
        },
        // The general FAQ page answers questions about the business itself.
        subjectOf: { "@id": `${abs("/faq/")}#faq` },
      },
    ],
  };
}

export function webPageJsonLd({ path, name, description }: { path: string; name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    isPartOf: { "@id": WEB },
    about: { "@id": BIZ },
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
      item: abs(c.path),
    })),
  };
}

/** A service page. `hasFaq` links the Service to the FAQPage on the same page. */
export function serviceJsonLd({ path, name, description, serviceType, hasFaq }: { path: string; name: string; description: string; serviceType: string; hasFaq?: boolean }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name,
    serviceType,
    description,
    url: abs(path),
    provider: { "@id": BIZ },
    areaServed,
    ...(hasFaq ? { subjectOf: { "@id": `${abs(path)}#faq` } } : {}),
  };
}

/**
 * FAQ markup. `path` is the page the questions are on. `about` is the @id
 * of what they are about: a Service on a service page, otherwise the business.
 */
export function faqJsonLd(faqs: { q: string; a: string }[], { path, about }: { path: string; about?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${abs(path)}#faq`,
    url: abs(path),
    isPartOf: { "@id": WEB },
    about: { "@id": about ? (about.startsWith("http") ? about : abs(about)) : BIZ },
    publisher: { "@id": BIZ },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function blogJsonLd({ path, name, description, posts }: { path: string; name: string; description: string; posts: Post[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${abs(path)}#blog`,
    url: abs(path),
    name,
    description,
    isPartOf: { "@id": WEB },
    publisher: { "@id": ORG },
    blogPost: posts.map((p) => ({ "@type": "BlogPosting", "@id": `${abs(p.path)}#article`, headline: p.title, url: abs(p.path), datePublished: p.date })),
  };
}

export function blogPostingJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${abs(post.path)}#article`,
    mainEntityOfPage: abs(post.path),
    url: abs(post.path),
    headline: post.title,
    description: post.description,
    image: abs(post.cover),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    articleSection: post.category,
    inLanguage: "en-US",
    isPartOf: { "@id": `${abs("/blog/")}#blog` },
    author: { "@id": ORG },
    publisher: { "@id": ORG },
    // Ties the article to the services it supports.
    about: post.related.filter((r) => r.startsWith("/services/")).map((r) => ({ "@id": `${abs(r)}#service` })),
  };
}
