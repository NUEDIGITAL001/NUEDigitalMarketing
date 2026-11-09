import { ServiceShell } from "@/components/page/ServiceShell";
import { Section, NumberedGrid, Prose } from "@/components/page/Blocks";
import { AnswerEngine } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/services/seo/ai-search-optimization/";
const description =
  "AI search optimization from NÜE Digital: answer engine optimization (AEO) and generative engine optimization (GEO) so AI Overviews, ChatGPT and other assistants understand and cite your business.";
export const metadata = pageMeta({ path, title: "AI Search Optimization: AEO and GEO Services · NÜE Digital", description });

const faqs = [
  { q: "What is AEO?", a: "Answer engine optimization means structuring your content so search features and AI assistants can lift a clear, correct answer from it, such as featured snippets, People Also Ask and voice answers." },
  { q: "What is GEO?", a: "Generative engine optimization focuses on how AI systems like Google AI Overviews, ChatGPT, Gemini, Perplexity and Copilot build their answers, and on making your business a source they understand, trust and cite." },
  { q: "Is SEO dead because of AI?", a: "No. AI answers still draw on websites, listings and reviews, and the fundamentals of good SEO feed them. What changes is how content is structured and how consistent your business information is across the web." },
  { q: "Can you guarantee my business appears in ChatGPT or AI Overviews?", a: "No one can. These systems change constantly and don’t publish how they choose sources. We improve the signals they rely on and track where your business is mentioned over time." },
  { q: "How do you measure AI search visibility?", a: "We run a defined set of real customer questions through the major AI assistants on a schedule, record whether and how your business is mentioned and cited, and watch referral traffic from AI tools in your analytics." },
];

export default function Page() {
  return (
    <ServiceShell
      path={path}
      name="AI Search Optimization"
      serviceType="Answer engine and generative engine optimization"
      description={description}
      eyebrow="Service · SEO · AEO + GEO"
      title="Be the answer AI gives."
      lead={<p>More customers now ask an AI assistant before they ever click a link. AI search optimization makes sure those assistants understand what you do, trust what you say and point people to you.</p>}
      visual={<AnswerEngine />}
      faqs={faqs}
      related={["/services/seo/", "/services/local-seo/", "/services/content-email-marketing/", "/services/reputation-management/"]}
      parent={{ name: "SEO Services", path: "/services/seo/" }}
      ctaTitle="Find out how AI describes your business today."
    >
      <Section id="shift" eyebrow="What changed" title="From ten blue links to one answer" tone="carbon">
        <Prose>
          <p>
            Search used to mean a list of results. Today, Google AI Overviews summarise the answer at the top of the page, and tools like ChatGPT, Gemini, Perplexity and Copilot answer questions directly, citing a handful of sources.
          </p>
          <p>
            That means fewer chances to be seen, and a new question for every business: when someone asks an AI about the service you offer in your area, does your name come up, and is what it says correct?
          </p>
        </Prose>
      </Section>
      <Section id="aeo-geo" eyebrow="Two disciplines" title="AEO and GEO, explained">
        <div className="grid gap-px bg-graphite md:grid-cols-2">
          <div className="bg-obsidian p-8">
            <p className="mono-data text-teal">AEO</p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-white">Answer engine optimization</h3>
            <p className="mt-4 text-titanium-light">Clear, direct answers to the questions customers ask, written and structured so search features can quote them: FAQs, how-to content, comparison pages and schema markup.</p>
          </div>
          <div className="bg-obsidian p-8">
            <p className="mono-data text-teal">GEO</p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-white">Generative engine optimization</h3>
            <p className="mt-4 text-titanium-light">Building the signals AI models rely on when they write an answer: consistent business facts everywhere, credible mentions, reviews, and content that shows real expertise.</p>
          </div>
        </div>
      </Section>
      <Section id="work" eyebrow="The work" title="How we make you citable" tone="carbon">
        <NumberedGrid
          cols={3}
          items={[
            { title: "AI visibility baseline", body: "We ask the major assistants the questions your customers ask and record where you appear, what they say and who they cite instead." },
            { title: "Entity clarity", body: "One consistent story about who you are, what you do and where, across your site, Google Business Profile, directories and social profiles." },
            { title: "Answer-first content", body: "Pages and FAQs that lead with the answer, cover the follow-up questions and show first-hand experience." },
            { title: "Structured data", body: "Schema markup that tells machines exactly what your business, services, locations and FAQs are." },
            { title: "Trust signals", body: "Reviews, mentions and links from sources AI systems already rely on in your industry and region." },
            { title: "Ongoing tracking", body: "A repeatable check of AI answers over time, plus AI referral traffic in your analytics." },
          ]}
        />
      </Section>
    </ServiceShell>
  );
}
