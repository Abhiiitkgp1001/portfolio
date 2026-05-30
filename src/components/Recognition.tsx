"use client";

import { recognition } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Recognition() {
  return (
    <section
      id="recognition"
      className="relative z-10 border-t border-line px-6 py-24 md:px-16 lg:px-24"
    >
      <Reveal>
        <p className="eyebrow mb-12">Recognition & rank</p>
      </Reveal>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {recognition.map(([big, small], i) => (
          <Reveal key={big} delay={(i % 6) * 0.07}>
            <div
              className={`group flex h-full flex-col px-0 py-5 sm:px-6 ${
                i % 2 === 1 ? "border-l border-line sm:border-l-0" : ""
              } ${i % 3 !== 0 ? "sm:border-l sm:border-line" : ""} ${
                i % 6 === 0 ? "lg:border-l-0" : "lg:border-l lg:border-line"
              } ${i >= 2 ? "border-t border-line sm:border-t-0" : ""}`}
            >
              <span className="block min-h-[2.5em] font-serif text-xl font-light leading-tight text-ink transition-colors group-hover:text-accent md:text-2xl">
                {big}
              </span>
              <span className="mt-3 h-px w-7 bg-[var(--accent)] transition-all duration-500 group-hover:w-12" />
              <span className="mt-3 text-xs leading-snug text-faint">
                {small}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
