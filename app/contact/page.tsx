import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Blocks";
import { JsonLd } from "@/components/page/JsonLd";
import { ContactForm } from "@/components/forms/ContactForm";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

const path = "/contact/";
export const metadata = pageMeta({
  path,
  title: "Contact NÜE Digital · Start a Conversation",
  description: "Start a conversation with NÜE Digital, a Rochester, NY marketing and growth consultancy. Tell us about your business and what you are trying to solve.",
});

export default function Page() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path }];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Contact"
        title="Your next chapter starts here."
        lead={<p>Tell us about your business and what you’re having trouble with. We’ll review it and reach out to set up a conversation.</p>}
      />
      <section aria-label="Contact form" className="bg-carbon">
        <div className="container-nue section-m grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="ticks border border-graphite bg-obsidian/70 p-6 md:p-10">
              <ContactForm source={path} />
            </div>
          </div>
          <div className="space-y-10 lg:col-span-4 lg:col-start-9">
            <div>
              <h2 className="ui-text text-white">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {["We read your note and look at your current presence.", "We reach out to set up a conversation.", "You get an honest recommendation, whether or not we’re the right fit."].map((s, i) => (
                  <li key={s} className="grid grid-cols-[2rem_1fr] text-titanium-light">
                    <span className="mono-data text-teal">0{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="ui-text text-white">Where we work</h2>
              <p className="mt-4 text-titanium-light">{site.serviceArea}</p>
            </div>
          </div>
        </div>
      </section>
      <Section id="note" title="Prefer to explore first?" intro={<p>See our <a className="text-ice underline decoration-teal underline-offset-4" href="/methodology/">methodology</a> or browse <a className="text-ice underline decoration-teal underline-offset-4" href="/services/">services</a>.</p>} />
    </>
  );
}
