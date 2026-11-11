import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, CheckList, Prose } from "@/components/page/Blocks";
import { Viewfinder } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/services/photography-video/";
const description =
  "Commercial photography and video for NÜE Digital clients in Rochester, NY: website imagery, team portraits, social video and ad creative.";
export const metadata = pageMeta({ path, title: "Commercial Photography and Video in Rochester, NY · NÜE Digital", description });

const faqs = [
  { q: "Is photography and video a standalone service?", a: "It’s offered to NÜE clients whose package includes creative services, so every shoot is planned around a campaign, website or content calendar rather than as a one-off." },
  { q: "Where do you shoot?", a: "At your business across Rochester and Western New York. For clients further away, we can plan shoots with trusted creators in your area." },
  { q: "What kind of video do you produce?", a: "Short-form social video, website and service explainers, team and culture pieces, and short ad edits sized for each platform." },
  { q: "Why not just use stock photos?", a: "Stock is fine for backgrounds, but customers trust real people and real places. Authentic imagery of your team and work is one of the strongest proof points you can show." },
  { q: "Who owns the photos and video?", a: "Usage rights are agreed upfront so you can use the content across your website, social media and advertising." },
];

export default function Page() {
  return (
    <ServiceShell
      path={path}
      name="Photography & Video"
      serviceType="Commercial photography and video production"
      description={description}
      eyebrow="Service · Creative"
      title="Real people. Real work. Shot with purpose."
      lead={<p>Customers trust what’s real. Through our network of creators, NÜE produces photography and video for clients whose package includes creative services, planned around the campaigns and pages they will actually power.</p>}
      visual={<Viewfinder />}
      faqs={faqs}
      related={["/services/social-media-marketing/", "/services/website-design/", "/services/landing-pages-funnels/", "/services/content-email-marketing/"]}
      ctaTitle="Ask about creative services in your package."
    >
      <Section id="purpose" eyebrow="Shot with purpose" title="Every frame has a destination" tone="carbon">
        <Prose>
          <p>
            We don’t start with the camera. We start with where the content will live: a homepage hero, a service page, a month of social posts, a six-second ad. That shapes the shot list, so one shoot day produces everything the plan needs.
          </p>
          <p>
            Our creators share the NÜE standard: making work they’re proud of, that shows your business as it really is and helps turn visitors into long-standing customers.
          </p>
        </Prose>
      </Section>
      <Section id="formats" eyebrow="What we produce" title="Formats">
        <CheckList items={["Website hero and service imagery", "Team and leadership portraits", "Work-in-progress and detail shots", "Short-form vertical video", "Explainer and process videos", "Ad cuts for each platform", "Event and community coverage", "Edited, organised content libraries"]} />
      </Section>
    </ServiceShell>
  );
}
