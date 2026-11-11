import { LegalPage } from "@/components/page/LegalPage";
import { pageMeta } from "@/lib/meta";

const path = "/terms/";
export const metadata = pageMeta({ path, title: "Terms of Service · NÜE Digital", description: "Terms for using the NÜE Digital website, nuedigitalmarketing.com." });

export default function Page() {
  return (
    <LegalPage path={path} title="Terms of Service" updated="November 2026">
      <p>These terms apply to your use of nuedigitalmarketing.com. By using the site you agree to them. Work we do for clients is governed by a separate written agreement.</p>
      <h2>Use of the site</h2>
      <p>You may use this site for lawful purposes only. Don’t attempt to disrupt it, access it without authorization or use it to send spam or harmful content.</p>
      <h2>Content</h2>
      <p>The text, graphics, logo and design of this site belong to NÜE Digital or its licensors. You may share links to our pages, but please don’t copy or reuse our content or brand without permission.</p>
      <h2>No professional guarantee</h2>
      <p>Content on this site is general information, not advice for your specific situation. Marketing results depend on many factors outside our control, and nothing on this site is a guarantee of rankings, traffic or revenue.</p>
      <h2>Third-party links</h2>
      <p>We may link to other websites. We aren’t responsible for their content or practices.</p>
      <h2>Limitation of liability</h2>
      <p>The site is provided “as is”. To the extent permitted by law, NÜE Digital isn’t liable for any loss arising from your use of the site.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of New York.</p>
      <h2>Contact</h2>
      <p>Questions about these terms? Use our <a href="/contact/">contact form</a>.</p>
    </LegalPage>
  );
}
