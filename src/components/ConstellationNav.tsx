"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { sections } from "@/lib/data";

/**
 * Navigation, reimagined. No bar.
 * A vertical constellation on the right: each section is a star.
 * A luminous line is "drawn" through the stars as you progress,
 * the active star flares, and its label reveals on hover.
 */
export function ConstellationNav() {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === e.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed right-8 top-1/2 z-50 hidden -translate-y-1/2 md:block"
    >
      {/* the ladder: two rails with rungs between them */}
      <div className="relative w-[22px]">
        {/* left + right rails */}
        <span className="absolute left-0 top-2 bottom-2 w-px bg-[var(--line-strong)]" />
        <span className="absolute right-0 top-2 bottom-2 w-px bg-[var(--line-strong)]" />
        {/* progress climbs both rails */}
        <motion.span
          className="absolute left-0 top-2 bottom-2 w-px origin-top bg-[var(--accent)]"
          style={{ scaleY: progress }}
        />
        <motion.span
          className="absolute right-0 top-2 bottom-2 w-px origin-top bg-[var(--accent)]"
          style={{ scaleY: progress }}
        />

        <div className="flex flex-col">
          {sections.map((s, i) => {
            const isActive = i === active;
            const isPassed = i < active;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-label={s.label}
                className="group relative flex h-8 items-center"
              >
                {/* label, to the left of the ladder */}
                <span
                  className={`absolute right-full mr-4 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? "translate-x-0 text-accent opacity-100"
                      : "translate-x-1 text-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  {s.label}
                </span>

                {/* the rung */}
                <span
                  className={`block w-full rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-[2px] bg-[var(--accent)] shadow-[0_0_10px_1px_rgba(255,106,26,0.65)]"
                      : isPassed
                        ? "h-px bg-[var(--ink-dim)] group-hover:bg-[var(--accent)]"
                        : "h-px bg-[var(--ink-faint)] group-hover:bg-[var(--ink-dim)]"
                  }`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
