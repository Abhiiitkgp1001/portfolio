"use client";

import { profile } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Thesis() {
  return (
    <section
      id="thesis"
      className="relative z-10 flex min-h-[90svh] flex-col justify-center px-6 py-28 md:px-16 lg:px-24"
    >
      <div className="max-w-5xl">
        <Reveal>
          <p className="eyebrow mb-10 flex items-center gap-4">
            <span className="h-px w-8 bg-[var(--accent)]" />
            The thesis
          </p>
        </Reveal>

        {/* Hook — the headline statement */}
        <Reveal delay={0.05}>
          <h2 className="max-w-4xl font-serif text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.12] tracking-[-0.02em] text-ink">
            {profile.thesisHook}{" "}
            <span className="italic accent-grad">{profile.thesisHookAccent}</span>
          </h2>
        </Reveal>

        {/* Body — supporting context, lighter + narrower for readability */}
        <Reveal delay={0.12}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-dim md:text-xl md:leading-relaxed">
            {profile.thesisBody}
          </p>
        </Reveal>

        {/* Kicker — the standout closing line */}
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl border-l-2 border-[var(--accent)] pl-5 font-serif text-xl italic leading-snug text-ink md:text-2xl">
            {profile.thesisKicker}
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <p className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-faint">
            {profile.motto}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
