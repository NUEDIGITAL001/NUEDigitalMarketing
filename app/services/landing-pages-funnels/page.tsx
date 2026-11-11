import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, NumberedGrid, Prose } from "@/components/page/Blocks";
import { SplitTest } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/services/landing-pages-funnels/";
const description =
  "Landing page design and conversion funnels from NÜE Digital. Focused pages for ads and campaigns, tested and tracked to turn more clicks into qualified inquiries.";
export const metadata = pageMeta({ path, title: "Landing Pages and Conversion Funnels · NÜE Digital", description });

const faqs = [
  { q: "What’s the difference between a landing page and a website page?", a: "A website page serves many visitors and many goals. A landing page is built for one audience, one offer and one action, usually as the destination for an ad or campaign." },
  { q: "What is a conversion funnel?", a: "The path from first contact to becoming a customer: for example, an ad, a landing page, a follow-up email and a booked call. We design and measure each step." },
  { q: "How do you test landing pages?", a: "We change one meaningful thing at a time, such as the headline, offer, form length or layout, and compare results once there’s enough traffic to tell the difference." },
  { q: "Do you need a lot of traffic to test?", a: "More traffic gives faster answers. For lower-traffic pages we focus on proven conversion principles and watch qualitative signals like scroll depth and form drop-off." },
  { q: "Can landing pages live on my existing website?", a: "Usually, yes. We can build them on your site or on a separate platform depending on speed, tracking and how often they change." },
];

export default function Page() {
  return (
    <ServiceShell
      path={path}
      name="Landing Pages & Funnels"
      serviceType="Landing page design and conversion rate optimization"
      description={description}
      eyebrow="Service · Conversion"
      title="One page. One audience. One next step."
      lead={<p>Traffic is expensive. A focused landing page turns more of the people you’ve paid to reach into conversations, and a well-built funnel keeps them moving until they’re ready to buy.</p>}
      visual={<SplitTest />}
      faqs={faqs}
      related={["/services/search-engine-marketing/", "/services/social-media-marketing/", "/services/content-email-marketing/", "/services/ai-marketing-automation/"]}
    >
      <Section id="anatomy" eyebrow="Anatomy" title="What a high-converting page gets right" tone="carbon">
        <NumberedGrid
          cols={3}
          items={[
            { title: "Message match", body: "The headline repeats the promise of the ad or search that brought them there." },
            { title: "One clear offer", body: "A specific reason to act now, without competing links or distractions." },
            { title: "Proof", body: "Real reviews, process and specifics that answer “why you?” honestly." },
            { title: "Low friction", body: "The shortest form that still qualifies the lead, plus click-to-call on mobile." },
            { title: "Speed", body: "Loads instantly on a phone, because every second costs inquiries." },
            { title: "Tracking", body: "Every submission and call attributed to its source for real decisions." },
          ]}
        />
      </Section>
      <Section id="funnel" eyebrow="Beyond the page" title="Funnels that follow up">
        <Prose>
          <p>
            Most people aren’t ready to buy the first time they visit. A funnel gives them a reason to stay in touch, such as a guide, an estimate or a consultation, and then follows up with useful information until they are ready.
          </p>
          <p>
            We map each step, write the follow-up, and connect it to your CRM with <a href="/services/ai-marketing-automation/">automation</a> so no lead is forgotten.
          </p>
        </Prose>
      </Section>
    </ServiceShell>
  );
}
