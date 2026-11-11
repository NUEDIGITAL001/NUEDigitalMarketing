/**
 * Site-wide facts. Everything here is public and approved in the
 * foundation doc. Do not add credentials, testimonials or statistics
 * that the business has not supplied.
 */
export const site = {
  name: "NÜE Digital",
  legalName: "NÜE Digital",
  descriptor: "Marketing + Consultancy",
  tagline: "Built for what's next.",
  url: "https://nuedigitalmarketing.com",
  location: "Rochester, NY",
  email: "nuedigitalmarketing@gmail.com",
  /** Public phone number in E.164 form (used for tel: links and schema). */
  phone: "+15853407290" as string,
  phoneDisplay: "(585) 340-7290",
  serviceArea:
    "Rochester and Western New York in person; clients across the Eastern US remotely.",
  description:
    "NÜE Digital is a Rochester, NY marketing and growth consultancy connecting strategy, specialists, execution and measurement for businesses that want marketing to produce real growth.",
} as const;

export type NavLink = { label: string; href: string; blurb?: string };

export const services: NavLink[] = [
  { label: "Growth Strategy & Business Development", href: "/services/growth-strategy/", blurb: "Priorities, positioning and a plan tied to revenue." },
  { label: "SEO Services", href: "/services/seo/", blurb: "Technical, content and authority work that compounds." },
  { label: "AI Search Optimization", href: "/services/seo/ai-search-optimization/", blurb: "Visibility in AI answers, AEO and GEO." },
  { label: "Local SEO", href: "/services/local-seo/", blurb: "Google Business Profile and map visibility." },
  { label: "Search Engine Marketing", href: "/services/search-engine-marketing/", blurb: "Paid search managed to cost per lead." },
  { label: "Social Media Marketing", href: "/services/social-media-marketing/", blurb: "Organic and paid social with a purpose." },
  { label: "Website Design & Development", href: "/services/website-design/", blurb: "Fast, findable sites built to convert." },
  { label: "Landing Pages & Funnels", href: "/services/landing-pages-funnels/", blurb: "Focused pages that turn clicks into inquiries." },
  { label: "Content & Email Marketing", href: "/services/content-email-marketing/", blurb: "Useful content and email that keeps you remembered." },
  { label: "Reputation Management", href: "/services/reputation-management/", blurb: "More reviews, better responses, stronger trust." },
  { label: "AI Marketing Automation", href: "/services/ai-marketing-automation/", blurb: "Automated follow-up, routing and reporting." },
  { label: "Photography & Video", href: "/services/photography-video/", blurb: "Creative production for client campaigns." },
];

export const industries: (NavLink & { challenge: string })[] = [
  { label: "Healthcare & Dental", href: "/industries/healthcare-dental/", challenge: "Filling schedules with the right patients, not just more calls." },
  { label: "Orthodontics & Cosmetic Dentistry", href: "/industries/orthodontics-cosmetic-dentistry/", challenge: "Long consideration cycles for high-value treatment decisions." },
  { label: "Veterinary & Pet Resorts", href: "/industries/veterinary-pet-resorts/", challenge: "Earning trust from owners who treat pets like family." },
  { label: "Home Services & Skilled Trades", href: "/industries/home-services/", challenge: "Winning the urgent search before a competitor answers the phone." },
  { label: "Automotive & Collision Repair", href: "/industries/automotive-collision/", challenge: "Being the shop drivers find, and trust, at a stressful moment." },
  { label: "Manufacturing & Industrial B2B", href: "/industries/manufacturing-industrial/", challenge: "Reaching technical buyers through long, multi-person sales cycles." },
  { label: "Hospitality & Lodging", href: "/industries/hospitality-lodging/", challenge: "Capturing direct bookings instead of paying for every guest." },
];

export const approach: NavLink[] = [
  { label: "Our Philosophy", href: "/philosophy/" },
  { label: "Our Methodology", href: "/methodology/" },
  { label: "About NÜE", href: "/about/" },
];

export const rochester: NavLink[] = [
  { label: "Digital Marketing Rochester NY", href: "/rochester-ny/" },
  { label: "SEO Rochester NY", href: "/rochester-ny/seo/" },
  { label: "Social Media Marketing Rochester NY", href: "/rochester-ny/social-media-marketing/" },
  { label: "Website Design Rochester NY", href: "/rochester-ny/website-design/" },
];

export const legal: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy/" },
  { label: "Terms of Service", href: "/terms/" },
  { label: "Accessibility", href: "/accessibility/" },
];
