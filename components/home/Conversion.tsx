import { ContactForm } from "@/components/forms/ContactForm";
import { EMotif } from "@/components/brand/EMotif";
import { LightTrail } from "@/components/brand/LightTrail";

/** Scene 07, Conversion. */
const next = [
  { title: "Tell us where you are", body: "Share what is working, what isn't and what you want to grow." },
  { title: "A real conversation", body: "We talk through your business and goals, not a scripted pitch." },
  { title: "A clear recommendation", body: "You get an honest view of where to focus and what it would take." },
];

export function Conversion() {
  return (
    <section
      id="scene-conversion"
      data-scene="07-conversion"
      aria-labelledby="conversion-title"
      className="cta-glow relative isolate overflow-hidden border-t-2 border-teal bg-carbon"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
        <LightTrail className="h-full w-full" id="cta-trail" />
      </div>
      <div className="container-nue section-l">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <EMotif className="conv-e h-10 w-auto text-white" />
            <p className="eyebrow mt-10" data-reveal>07 · Let&rsquo;s talk</p>
            <h2 id="conversion-title" className="display-l mt-6 uppercase" data-reveal>
              Your next chapter <span className="next-glow text-teal">starts here.</span>
            </h2>
            <ol className="mt-12 space-y-6">
              {next.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4" data-reveal>
                  <span className="mono-data pt-1 text-teal">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 text-titanium-light">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <div className="glass ticks border border-graphite bg-obsidian/70 p-6 md:p-10">
              <ContactForm source="home" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
