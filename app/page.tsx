import type { Metadata } from "next";
import { Opening } from "@/components/home/Opening";
import { Challenge } from "@/components/home/Challenge";
import { Difference } from "@/components/home/Difference";
import { Methodology } from "@/components/home/Methodology";
import { Industries } from "@/components/home/Industries";
import { Measurement } from "@/components/home/Measurement";
import { Conversion } from "@/components/home/Conversion";
import { HomeMotion } from "@/components/home/HomeMotion";
import { webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

const title = `Rochester, NY Marketing Agency & Growth Consultancy · ${site.name}`;
const description =
  "NÜE Digital is a Rochester, NY marketing agency and growth consultancy. Strategy, SEO, AI search, paid media, social and websites, connected and measured.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd({ path: "/", name: title, description })) }}
      />
      <Opening />
      <Challenge />
      <Difference />
      <Methodology />
      <Industries />
      <Measurement />
      <Conversion />
      <HomeMotion />
    </>
  );
}
