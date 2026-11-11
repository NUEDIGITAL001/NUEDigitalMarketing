import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, NumberedGrid, Prose } from "@/components/page/Blocks";
import { PaidFunnel } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/services/search-engine-marketing/";
const description =
  "Search engine marketing and Google Ads management from NÜE Digital. Paid search built around cost per qualified lead, with tracking, testing and transparent reporting.";
export const metadata = pageMeta({ path, title: "Search Engine Marketing and Google Ads Management · NÜE Digital", description });

const faqs = [
  { q: "How much should I spend on Google Ads?", a: "It depends on your market, competition and what a customer is worth to you. We work backwards from a target cost per lead and the number of leads you can handle, then recommend a starting budget and adjust as data comes in." },
  { q: "Who owns the ad account?", a: "You do. Accounts are set up in your name, and you keep full access and history if we ever stop working together." },
  { q: "Do you track phone calls from ads?", a: "Yes. Calls and form submissions are tracked back to the campaign and keyword that produced them, so decisions are based on real inquiries." },
  { q: "Why are my clicks expensive but leads are poor?", a: "Usually broad targeting, missing negative keywords, or ads sending people to a page that doesn’t match what they searched. Those are the first things we audit." },
  { q: "Do you manage Microsoft Ads too?", a: "Yes, when your audience is there. We recommend channels based on where your customers search, not on a fixed package." },
];

export default function Page() {
  return (
    <ServiceShell
      path={path}
      name="Search Engine Marketing"
      serviceType="Pay-per-click advertising management"
      description={description}
      eyebrow="Service · Paid search"
      title="Pay for customers, not clicks."
      lead={<p>NÜE brings several decades of combined experience in paid advertising. We build and manage search campaigns around one number that matters: what it costs you to win a qualified inquiry.</p>}
      visual={<PaidFunnel />}
      faqs={faqs}
      related={["/services/landing-pages-funnels/", "/services/growth-strategy/", "/services/ai-marketing-automation/", "/services/seo/"]}
      ctaTitle="Get a second opinion on your ad spend."
    >
      <Section id="leaks" eyebrow="Where budgets leak" title="What we fix first in most accounts" tone="carbon">
        <NumberedGrid
          items={[
            { title: "Paying for the wrong searches", body: "Broad match without negative keywords pulls in job seekers, DIYers and people outside your area." },
            { title: "No conversion tracking", body: "Without calls and forms tracked, the platform optimises for clicks, which is exactly what you don’t want." },
            { title: "Ads that don’t match the page", body: "A specific search sent to a generic homepage loses most of the people you paid for." },
            { title: "Set and forget", body: "Search terms, bids and competitors change weekly. Accounts left alone drift." },
          ]}
        />
      </Section>
      <Section id="manage" eyebrow="Ongoing management" title="What month-to-month looks like">
        <Prose>
          <p>
            Each campaign starts with a clear structure: tightly grouped keywords, ads written for each group and a landing page that answers the search. Calls and forms are tracked from day one.
          </p>
          <p>
            Every week we review search terms, add negatives, adjust bids and budgets, and test new ad copy. Every month you get a plain-language report: what we spent, what it produced, what it cost per lead, and what we’re changing next.
          </p>
          <p>
            When paid search works alongside <a href="/services/seo/">SEO</a> and a strong <a href="/services/landing-pages-funnels/">landing page</a>, each makes the others more efficient. That connection is the point of working with one partner.
          </p>
        </Prose>
      </Section>
    </ServiceShell>
  );
}
