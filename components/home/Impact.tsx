import { ButtonLink } from "@/components/ui/Button";

/**
 * Bold full-width call to action between homepage scenes.
 * "slab" is a solid teal block that cuts in on a diagonal as it scrolls
 * into view; "outline" is giant outlined type that fills with teal.
 */
export function Impact({
  id, variant, kicker, lines, body, cta, href = "/contact/",
}: {
  id: string; variant: "slab" | "outline"; kicker: string; lines: string[]; body: string; cta: string; href?: string;
}) {
  const slab = variant === "slab";
  return (
    <section aria-labelledby={`${id}-title`} className={`impact relative isolate overflow-hidden ${slab ? "bg-obsidian" : "impact-dark border-t border-graphite bg-obsidian"}`}>
      {slab && <div aria-hidden="true" className="impact-slab absolute inset-0 -z-10 bg-teal" />}
      <div className={`container-nue py-24 md:py-32 ${slab ? "text-obsidian" : "text-white"}`}>
        <p className={`mono-data ${slab ? "text-obsidian" : "text-teal"}`}>{kicker}</p>
        <h2 id={`${id}-title`} className="impact-title mt-6 font-display font-bold uppercase leading-[0.9] tracking-[-0.03em]">
          {lines.map((l, i) => (
            <span key={l} className={`impact-line block ${!slab ? "impact-fill" : ""}`} style={{ ["--i" as string]: i }}>
              {l}
            </span>
          ))}
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-8">
          <p className={`max-w-[44ch] text-lg ${slab ? "font-medium text-obsidian" : "text-concrete"}`}>{body}</p>
          <ButtonLink
            href={href}
            track={`home-impact-${id}`}
            className={`impact-btn px-9 py-5 text-base ${slab ? "!bg-obsidian !text-white hover:!bg-carbon" : ""}`}
          >
            {cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
