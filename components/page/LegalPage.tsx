import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { Prose } from "./Blocks";

export function LegalPage({ path, title, updated, children }: { path: string; title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ name: "Home", path: "/" }, { name: title, path }]} eyebrow="Legal" title={title} lead={<p className="mono-data">Last updated {updated}</p>} />
      <section className="bg-obsidian">
        <div className="container-nue section-m">
          <Prose>{children}</Prose>
        </div>
      </section>
    </>
  );
}
