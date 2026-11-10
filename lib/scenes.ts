/** Animated backdrop variants (see components/scenes/SceneCanvas). */
export type SceneKind =
  | "trails" | "contours" | "dots" | "tunnel" | "bars" | "city"
  | "ascent" | "strata" | "neural" | "radar" | "funnel" | "orbit" | "blueprint" | "prism" | "ribbons"
  | "resonance" | "circuit" | "aperture" | "vitals" | "align" | "flock" | "rooftops" | "speed" | "lattice"
  | "towers" | "beacon" | "signal" | "scaffold" | "horizon" | "helix" | "rain";

/**
 * One scene per page, never shared. The original six sit on the hub and
 * company pages; every other page has a scene drawn for its own subject.
 */
export const pageScenes: Record<string, { scene: SceneKind; name: string; page: string }> = {
  "/services/": { scene: "trails", name: "A · Light Trails", page: "Services" },
  "/industries/": { scene: "contours", name: "B · Contour Field", page: "Industries" },
  "/about/": { scene: "dots", name: "C · Dot Terrain", page: "About" },
  "/methodology/": { scene: "tunnel", name: "D · Grid Tunnel", page: "Methodology" },
  "/contact/": { scene: "bars", name: "E · Neon Bars", page: "Contact" },
  "/rochester-ny/": { scene: "city", name: "F · Data City", page: "Rochester, NY" },
  "/services/growth-strategy/": { scene: "ascent", name: "Ascent", page: "Growth Strategy" },
  "/services/seo/": { scene: "strata", name: "Strata", page: "SEO" },
  "/services/seo/ai-search-optimization/": { scene: "neural", name: "Neural Mesh", page: "AI Search Optimization" },
  "/services/local-seo/": { scene: "radar", name: "Local Radar", page: "Local SEO" },
  "/services/search-engine-marketing/": { scene: "funnel", name: "Convergence", page: "Search Engine Marketing" },
  "/services/social-media-marketing/": { scene: "orbit", name: "Orbit", page: "Social Media Marketing" },
  "/services/website-design/": { scene: "blueprint", name: "Blueprint", page: "Website Design" },
  "/services/landing-pages-funnels/": { scene: "prism", name: "Prism", page: "Landing Pages & Funnels" },
  "/services/content-email-marketing/": { scene: "ribbons", name: "Ribbons", page: "Content & Email Marketing" },
  "/services/reputation-management/": { scene: "resonance", name: "Resonance", page: "Reputation Management" },
  "/services/ai-marketing-automation/": { scene: "circuit", name: "Circuit", page: "AI Marketing Automation" },
  "/services/photography-video/": { scene: "aperture", name: "Aperture", page: "Photography & Video" },
  "/industries/healthcare-dental/": { scene: "vitals", name: "Vitals", page: "Healthcare & Dental" },
  "/industries/orthodontics-cosmetic-dentistry/": { scene: "align", name: "Alignment", page: "Orthodontics & Cosmetic Dentistry" },
  "/industries/veterinary-pet-resorts/": { scene: "flock", name: "Flock", page: "Veterinary & Pet Resorts" },
  "/industries/home-services/": { scene: "rooftops", name: "Rooftops", page: "Home Services" },
  "/industries/automotive-collision/": { scene: "speed", name: "Velocity", page: "Automotive & Collision" },
  "/industries/manufacturing-industrial/": { scene: "lattice", name: "Lattice", page: "Manufacturing & Industrial" },
  "/industries/hospitality-lodging/": { scene: "towers", name: "Towers", page: "Hospitality & Lodging" },
  "/rochester-ny/seo/": { scene: "beacon", name: "Beacon", page: "Rochester SEO" },
  "/rochester-ny/social-media-marketing/": { scene: "signal", name: "Signal", page: "Rochester Social Media" },
  "/rochester-ny/website-design/": { scene: "scaffold", name: "Scaffold", page: "Rochester Website Design" },
  "/philosophy/": { scene: "horizon", name: "Horizon", page: "Philosophy" },
  "/faq/": { scene: "helix", name: "Helix", page: "FAQs" },
  "/insights/": { scene: "rain", name: "Data Rain", page: "Insights" },
};
