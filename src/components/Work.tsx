"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { work } from "@/lib/data";
import { Reveal } from "./Reveal";

type Item = (typeof work)[number];

function Card({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-4, 4]), {
    stiffness: 150,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <Reveal delay={(index % 2) * 0.08} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        className={`group relative h-full overflow-hidden rounded-2xl border p-7 transition-colors duration-500 md:p-9 ${
          item.accent
            ? "border-[var(--accent)]/40 bg-[var(--bg-elev)]"
            : "border-line bg-[var(--bg-elev)]/40 hover:border-[var(--line-strong)]"
        }`}
      >
        {/* hover glow */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--gx,50%) var(--gy,50%), rgba(255,106,26,0.10), transparent 60%)",
          }}
        />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow">{item.tag}</span>
            <span className="text-xs text-faint">{item.role}</span>
          </div>

          <h3 className="mt-5 font-serif text-3xl font-light tracking-tight text-ink md:text-4xl">
            {item.title}
            {item.accent && (
              <span className="ml-3 align-middle text-accent">●</span>
            )}
          </h3>

          <p className="mt-4 max-w-prose text-[0.97rem] leading-relaxed text-dim">
            {item.blurb}
          </p>

          <div className="mt-7 grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
            {item.metrics.map(([big, small]) => (
              <div key={big}>
                <div className="font-serif text-xl text-accent">{big}</div>
                <div className="mt-1 text-xs leading-snug text-faint">
                  {small}
                </div>
              </div>
            ))}
          </div>

          {item.links && item.links.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {item.links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline group/link inline-flex items-center gap-1.5 text-sm text-dim transition-colors hover:text-ink"
                >
                  {label}
                  <span className="text-accent transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          )}

          <div className="mt-auto flex flex-wrap gap-2 pt-7">
            {item.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-faint"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="relative z-10 px-6 py-24 md:px-16 lg:px-24"
    >
      <Reveal>
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-4">Selected work</p>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-light tracking-[-0.02em]">
              Things I shipped that{" "}
              <span className="italic accent-grad">moved money</span>.
            </h2>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {work.map((item, i) => (
          <div
            key={item.title}
            className={`h-full ${item.accent ? "lg:col-span-2" : ""}`}
          >
            <Card item={item} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
