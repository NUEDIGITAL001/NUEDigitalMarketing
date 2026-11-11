import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { Opening } from "@/components/home/Opening";
import { Challenge } from "@/components/home/Challenge";
import { Difference } from "@/components/home/Difference";
import { Methodology } from "@/components/home/Methodology";
import { Industries } from "@/components/home/Industries";
import { Measurement } from "@/components/home/Measurement";
import { Conversion } from "@/components/home/Conversion";
import { Impact } from "@/components/home/Impact";
import { HomeMotion } from "@/components/home/HomeMotion";
import { webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

const title = `Rochester, NY Marketing Agency & Growth Consultancy · ${site.name}`;
const description =
  "NÜE Digital is a Rochester, NY marketing agency and growth consultancy. Strategy, SEO, AI search, paid media, social and websites, connected and measured.";

export const metadata: Metadata = pageMeta({ path: "/", title, description });

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd({ path: "/", name: title, description })) }}
      />
      <div aria-hidden="true" className="scroll-meter" />
      <Opening />
      <Challenge />
      <Difference />
      <Impact
        id="impact-plan"
        variant="slab"
        kicker="No pitch. No pressure."
        lines={["Stop guessing.", "Start growing."]}
        body="Tell us where your business is today. You get an honest read on where to focus first."
        cta="Start a Conversation"
      />
      <Methodology />
      <Industries />
      <Impact
        id="impact-different"
        variant="outline"
        kicker="The NÜE standard"
        lines={["Different", "on purpose."]}
        body="Strategy, specialists and execution through one partner, measured by the customers the work produces."
        cta="Let’s Talk"
      />
      <Measurement />
      <Conversion />
      <HomeMotion />
    </>
  );
}
