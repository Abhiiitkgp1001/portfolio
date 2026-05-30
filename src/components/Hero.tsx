"use client";

import { motion, type Variants } from "framer-motion";
import { profile } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const word: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.15 + i * 0.08, ease: EASE },
  }),
};

export function Hero() {
  const line1 = "Abhishek".split("");
  return (
    <section
      id="intro"
      className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 md:px-16 lg:px-24"
    >
      {/* top meta row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="absolute left-6 right-6 top-7 flex items-center justify-between md:left-16 md:right-16"
      >
        <span className="eyebrow">{profile.motto}</span>
        <span className="eyebrow mr-12 hidden sm:block">{profile.location}</span>
      </motion.div>

      <div className="max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05 }}
          className="eyebrow mb-6 flex items-center gap-3"
        >
          <span
            className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]"
            style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
          />
          Engineer · Builder · Operator
        </motion.p>

        {/* name: masked reveal */}
        <h1 className="font-serif text-[clamp(3.2rem,12vw,11rem)] font-light leading-[0.92] tracking-[-0.02em]">
          <span className="block overflow-hidden">
            <span className="flex">
              {line1.map((c, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={word}
                  initial="hidden"
                  animate="show"
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={word}
              custom={line1.length}
              initial="hidden"
              animate="show"
              className="inline-block italic accent-grad"
            >
              Chakram
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-9 max-w-2xl text-balance text-lg leading-relaxed text-dim md:text-2xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          {profile.identity.map((id, i) => (
            <span key={id} className="flex items-center gap-3">
              {i > 0 && (
                <span className="h-1 w-1 rounded-full bg-[var(--ink-faint)]" />
              )}
              <span className="text-sm text-faint md:text-[0.95rem]">
                {id}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#numbers"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="group absolute bottom-8 left-6 flex items-center gap-3 md:left-16"
      >
        <span className="relative h-9 w-px overflow-hidden bg-[var(--line-strong)]">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-[var(--accent)]"
            animate={{ y: [-12, 36] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="eyebrow transition-colors group-hover:text-[var(--ink-dim)]">
          Scroll
        </span>
      </motion.a>
    </section>
  );
}
