import { LegalPage } from "@/components/page/LegalPage";
import { pageMeta } from "@/lib/meta";

const path = "/privacy/";
export const metadata = pageMeta({ path, title: "Privacy Policy · NÜE Digital", description: "How NÜE Digital collects, uses and protects information submitted through nuedigitalmarketing.com." });

export default function Page() {
  return (
    <LegalPage path={path} title="Privacy Policy" updated="November 2026">
      <p>This policy explains what information NÜE Digital (“we”, “us”) collects through nuedigitalmarketing.com, how we use it and the choices you have.</p>
      <h2>Information you give us</h2>
      <p>When you submit our contact form, we collect your name, phone number, email address, business name, business location, website address (if provided) and your message. We use this only to respond to your inquiry and to discuss working together.</p>
      <h2>Information collected automatically</h2>
      <p>Like most websites, we may use analytics and tag management tools (such as Google Analytics and Google Tag Manager) to understand how visitors use the site, for example which pages are viewed and how visitors arrived. These tools may use cookies or similar technologies. We use this information in aggregate to improve the site and our marketing.</p>
      <h2>How we share information</h2>
      <p>We do not sell your personal information. We share it only with service providers that help us run the site and respond to you, such as our website host and email delivery provider, and only as needed for those purposes, or when required by law.</p>
      <h2>How long we keep it</h2>
      <p>We keep inquiry information for as long as needed to respond and maintain a business relationship, and delete it when it is no longer needed.</p>
      <h2>Your choices</h2>
      <ul>
        <li>You can ask us to access, correct or delete the information you submitted.</li>
        <li>You can block or delete cookies in your browser settings.</li>
        <li>You can opt out of Google Analytics with Google’s browser add-on.</li>
      </ul>
      <h2>Contact</h2>
      <p>For any privacy request or question, use our <a href="/contact/">contact form</a> and mention “privacy” in your message, or email <a href="mailto:nuedigitalmarketing@gmail.com">nuedigitalmarketing@gmail.com</a>.</p>
      <h2>Changes</h2>
      <p>We may update this policy from time to time. The date above shows when it was last changed.</p>
    </LegalPage>
  );
}
