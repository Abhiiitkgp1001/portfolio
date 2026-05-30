"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/data";
import { Reveal } from "./Reveal";

function Counter({
  to,
  prefix,
  suffix,
}: {
  to: number;
  prefix: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  // Start AT the final value so SSR / no-JS / missed-observer all show the
  // correct number. The count-up is purely progressive enhancement.
  const [val, setVal] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    setVal(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="inline-flex items-baseline whitespace-nowrap">
      <span>
        {prefix}
        {val.toLocaleString()}
      </span>
      {suffix && (
        <span className="ml-0.5 text-[0.42em] font-normal tracking-tight text-accent">
          {suffix.trim()}
        </span>
      )}
    </span>
  );
}

export function Stats() {
  return (
    <section
      id="numbers"
      className="relative z-10 border-y border-line px-6 py-24 md:px-16 lg:px-24"
    >
      <Reveal>
        <p className="eyebrow mb-12">Proof, in numbers</p>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div
              className={`group flex h-full flex-col px-0 py-7 sm:px-7 sm:py-2 ${
                i > 0 ? "border-t border-line sm:border-t-0" : ""
              } ${i % 2 === 1 ? "sm:border-l sm:border-line" : ""} ${
                i === 2 ? "lg:border-l lg:border-line" : ""
              } ${i % 2 === 0 && i > 0 ? "sm:border-t lg:border-t-0" : ""}`}
            >
              <div className="font-serif text-[clamp(2.4rem,4.2vw,3.4rem)] font-light leading-none tracking-tight text-ink">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-5 h-px w-10 bg-[var(--accent)] transition-all duration-500 group-hover:w-20" />
              <p className="mt-5 text-[0.95rem] font-medium text-ink">
                {s.href ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                  >
                    {s.label}
                    <span className="text-accent">↗</span>
                  </a>
                ) : (
                  s.label
                )}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-faint">
                {s.sub}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
