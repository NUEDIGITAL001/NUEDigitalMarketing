import { LegalPage } from "@/components/page/LegalPage";
import { pageMeta } from "@/lib/meta";

const path = "/accessibility/";
export const metadata = pageMeta({ path, title: "Accessibility Statement · NÜE Digital", description: "NÜE Digital’s commitment to an accessible website, the standard we aim for and how to report a barrier." });

export default function Page() {
  return (
    <LegalPage path={path} title="Accessibility Statement" updated="November 2026">
      <p>We want everyone to be able to use nuedigitalmarketing.com, including people who use assistive technology or prefer less motion.</p>
      <h2>Our standard</h2>
      <p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. We test pages with automated tools and by hand, including keyboard navigation and screen readers.</p>
      <h2>What we’ve built in</h2>
      <ul>
        <li>All content is available as plain text, with or without JavaScript and animation.</li>
        <li>Animations respect your device’s reduced-motion setting, and a “Reduce motion” switch in the footer turns them off.</li>
        <li>Pages use clear headings, landmarks and labels, with a skip link to the main content.</li>
        <li>Text and controls are designed for readable contrast.</li>
        <li>Forms have visible labels and clear error messages.</li>
      </ul>
      <h2>Report a barrier</h2>
      <p>If something on this site doesn’t work for you, please tell us through our <a href="/contact/">contact form</a>. Include the page and what happened, and we’ll work to fix it.</p>
    </LegalPage>
  );
}
