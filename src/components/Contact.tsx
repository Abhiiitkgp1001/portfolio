"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { profile } from "@/lib/data";
import { Reveal } from "./Reveal";

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export function Contact() {
  const links = [
    ["Email", profile.links.email, `mailto:${profile.links.email}`],
    ["LinkedIn", "in/abhishekchakram", profile.links.linkedin],
    ["GitHub", "abhishekFiberAi", profile.links.github],
    ["Twitter / X", "@AbhishekChakram", profile.links.twitter],
  ];

  return (
    <section
      id="contact"
      className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 py-24 md:px-16 lg:px-24"
    >
      <Reveal>
        <p className="eyebrow mb-8">Get in touch</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-4xl font-serif text-[clamp(2.6rem,8vw,7rem)] font-light leading-[0.95] tracking-[-0.03em]">
          Let’s <span className="italic accent-grad">talk</span>.
        </h2>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-14">
          <Magnetic>
            <a
              href={`mailto:${profile.links.email}`}
              className="group inline-flex items-center gap-4 rounded-full border border-[var(--accent)] px-8 py-4 text-base text-ink transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--on-accent)]"
            >
              <span className="font-medium">Start a conversation</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-20 grid grid-cols-2 gap-px border-t border-line pt-10 sm:grid-cols-4">
          {links.map(([label, handle, href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="group py-3"
            >
              <p className="eyebrow mb-2 transition-colors group-hover:text-[var(--accent)]">
                {label}
              </p>
              <p className="link-underline inline-block text-sm text-dim transition-colors group-hover:text-ink">
                {handle}
              </p>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-16 flex flex-col items-start justify-between gap-3 text-xs text-faint sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Abhishek Chakram</span>
          <span className="font-mono">Bengaluru, India</span>
        </div>
      </Reveal>
    </section>
  );
}
