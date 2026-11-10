import { LocalShell } from "@/components/page/LocalShell";
import { Section, LinkGrid, Prose } from "@/components/page/Blocks";
import { ServiceAreaMap } from "@/components/visuals/ServiceArea";
import { services } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

const path = "/rochester-ny/";
const description =
  "NÜE Digital is a Rochester, NY digital marketing agency and growth consultancy: strategy, SEO, social, websites and paid ads across Western New York.";
export const metadata = pageMeta({ path, title: "Digital Marketing Agency in Rochester, NY · NÜE Digital", description });

const faqs = [
  { q: "Is NÜE Digital based in Rochester?", a: "Yes. NÜE Digital is a Rochester, NY marketing and consulting firm. We work with businesses across Rochester and Western New York in person, and with clients across the Eastern US remotely." },
  { q: "What areas around Rochester do you serve?", a: "All of Monroe County and the surrounding region, including Greece, Irondequoit, Webster, Penfield, Pittsford, Brighton, Henrietta, Fairport, Perinton, Victor, Gates and Chili, as well as the wider Finger Lakes and Western New York." },
  { q: "Do I need to meet in person?", a: "No, but local clients often like to. We’re happy to meet at your business, which also helps us understand it better." },
  { q: "What makes NÜE different from other Rochester marketing agencies?", a: "We lead with consulting. Instead of selling a channel, we help you decide where growth should come from, then bring in the right specialists and measure everything against real inquiries." },
  { q: "How much does a marketing agency in Rochester cost?", a: "It depends on your goals and the work involved. We don’t publish packages because every plan is built around the business. Start a conversation and we’ll give you a clear recommendation." },
];

export default function Page() {
  return (
    <LocalShell
      isHub
      path={path}
      name="Rochester, NY"
      serviceType="Digital marketing agency"
      description={description}
      eyebrow="Rochester, NY"
      title="Rochester’s marketing and growth consultancy."
      lead={<p>NÜE Digital is built in Rochester for businesses that want marketing to produce measurable growth. We sit down with you, learn the business and build a plan that connects strategy, specialists and execution.</p>}
      visual={<ServiceAreaMap />}
      faqs={faqs}
    >
      <Section id="local" eyebrow="Why local matters" title="We know how this market decides" tone="carbon">
        <Prose>
          <p>
            Rochester is a city of neighbourhoods and suburbs, each with its own search habits and word-of-mouth networks. A homeowner in Webster and a buyer in Henrietta might search for the same service in different ways, and both expect a business that feels local.
          </p>
          <p>
            Being here means we can meet at your shop, walk your floor and understand your customers firsthand, then reflect that understanding in every page, profile and campaign.
          </p>
        </Prose>
      </Section>
      <Section id="area" eyebrow="Service area" title="Where we work">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="border-t-2 border-teal pt-5">
            <h3 className="font-display text-xl font-semibold text-white">Rochester & Monroe County</h3>
            <p className="mt-3 text-titanium-light">Greece, Irondequoit, Webster, Penfield, Pittsford, Brighton, Henrietta, Fairport, Perinton, Gates, Chili and the city itself.</p>
          </div>
          <div className="border-t-2 border-white pt-5">
            <h3 className="font-display text-xl font-semibold text-white">Western New York</h3>
            <p className="mt-3 text-titanium-light">Victor, Canandaigua and the Finger Lakes, Batavia, Geneseo and the wider region, in person.</p>
          </div>
          <div className="border-t-2 border-graphite pt-5">
            <h3 className="font-display text-xl font-semibold text-white">Eastern US</h3>
            <p className="mt-3 text-titanium-light">Clients across the Eastern United States, remotely, with the same process and reporting.</p>
          </div>
        </div>
      </Section>
      <Section id="rochester-services" eyebrow="Rochester services" title="Focused help for Rochester businesses" tone="carbon">
        <LinkGrid
          links={[
            { label: "SEO in Rochester, NY", href: "/rochester-ny/seo/", blurb: "Local SEO, Google Business Profile and organic search." },
            { label: "Social media marketing in Rochester", href: "/rochester-ny/social-media-marketing/", blurb: "Content and ads that connect with the local community." },
            { label: "Website design in Rochester", href: "/rochester-ny/website-design/", blurb: "Fast, search-ready sites built to convert." },
            ...services.filter((s) => ["/services/growth-strategy/", "/services/ai-marketing-automation/"].includes(s.href)),
          ]}
        />
      </Section>
    </LocalShell>
  );
}
