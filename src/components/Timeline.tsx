"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="path" className="relative z-10 px-6 py-24 md:px-16 lg:px-24">
      <Reveal>
        <p className="eyebrow mb-4">The path</p>
        <h2 className="mb-16 font-serif text-[clamp(2.2rem,5vw,4rem)] font-light tracking-[-0.02em]">
          How I got <span className="italic accent-grad">here</span>.
        </h2>
      </Reveal>

      <div ref={ref} className="relative pl-8 md:pl-12">
        {/* track */}
        <span className="absolute left-[3px] top-1 bottom-1 w-px bg-[var(--line-strong)]" />
        <motion.span
          className="absolute left-[3px] top-1 w-px origin-top bg-[var(--accent)]"
          style={{ height: lineH }}
        />

        <div className="space-y-14">
          {timeline.map((t, i) => (
            <Reveal key={t.org} delay={i * 0.05}>
              <div className="group relative">
                <span className="absolute -left-[31px] top-2 h-[9px] w-[9px] rounded-full border border-[var(--accent)] bg-[var(--bg)] transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_12px_2px_rgba(255,106,26,0.6)] md:-left-[43px]" />
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                  <span className="font-mono text-xs text-faint md:w-36 md:shrink-0">
                    {t.when}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-light text-ink md:text-3xl">
                      {t.href ? (
                        <a
                          href={t.href}
                          target="_blank"
                          rel="noreferrer"
                          className="link-underline inline-flex items-center gap-2 transition-colors hover:text-accent"
                        >
                          {t.org}
                          <span className="text-base text-accent">↗</span>
                        </a>
                      ) : (
                        t.org
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-accent">{t.role}</p>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-faint">
                      {t.note}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
