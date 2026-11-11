import { LocalShell } from "@/components/page/LocalShell";
import { Section, Prose, CheckList } from "@/components/page/Blocks";
import { ContentCalendar } from "@/components/visuals/ServiceVisuals";
import { pageMeta } from "@/lib/meta";

const path = "/rochester-ny/social-media-marketing/";
const description =
  "Social media marketing in Rochester, NY from NÜE Digital: local content, community engagement and targeted social ads across Western New York.";
export const metadata = pageMeta({ path, title: "Social Media Marketing in Rochester, NY · NÜE Digital", description });

const faqs = [
  { q: "Can you target social ads to specific Rochester areas?", a: "Yes. Social platforms let us target by location, so we can focus ads on the towns and neighbourhoods you serve rather than the whole region." },
  { q: "Do you create content locally?", a: "Yes. When your package includes creative services, our creators shoot at your Rochester-area business so your content shows the real place and people." },
  { q: "What kind of local content works best?", a: "Content that feels like it’s from a neighbour: your team, your work, local events and seasons, community involvement and honest answers to customer questions." },
  { q: "Do you manage social media for small Rochester businesses?", a: "Yes. We scale the plan to what you need and can sustain, from a focused presence on one or two platforms to full content and ad programs." },
  { q: "How do we know if social media is working?", a: "We report on what it produces for the business: messages, calls, form submissions and website visits from social, not just likes." },
];

export default function Page() {
  return (
    <LocalShell
      path={path}
      name="Social Media Marketing in Rochester, NY"
      serviceType="Social media marketing"
      description={description}
      eyebrow="Rochester, NY · Social media"
      title="Social media that feels like Rochester."
      lead={<p>Local customers follow businesses that feel like part of the community. We help Rochester businesses show up consistently, look like themselves and reach new customers nearby with targeted ads.</p>}
      visual={<ContentCalendar />}
      faqs={faqs}
    >
      <Section id="community" eyebrow="Community first" title="Local beats generic" tone="carbon">
        <Prose>
          <p>
            Rochester runs on word of mouth, and social media is where a lot of it happens now. Posts that show your real team, your real work and the seasons and moments locals recognise build more trust than polished content that could be from anywhere.
          </p>
          <p>
            We plan a calendar around your goals, create the content with our network of creators, and use paid social to reach new customers in the specific areas you serve. See our full <a href="/services/social-media-marketing/">social media services</a>.
          </p>
        </Prose>
      </Section>
      <Section id="includes" eyebrow="Included" title="What Rochester clients get">
        <CheckList items={["Local content calendar", "On-site photo and video (creative packages)", "Location-targeted social ads", "Community management", "Google Business Profile posts", "Monthly reporting tied to inquiries"]} />
      </Section>
    </LocalShell>
  );
}
