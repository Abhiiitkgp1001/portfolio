"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

/**
 * Interactive constellation field: a quiet, classy ambient layer.
 * Stars drift, connect to nearby neighbours, and lean toward the cursor.
 * Rendered once, fixed behind everything, GPU-light.
 */
export function Background() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Read themed star color from CSS variables so it tracks the toggle.
    const css = getComputedStyle(document.documentElement);
    const starRGB = css.getPropertyValue("--star").trim() || "236,231,223";

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const mouse = { x: -9999, y: -9999 };

    const COUNT = Math.min(90, Math.floor((w * h) / 19000));
    const stars = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.4 + 0.4,
    }));

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0 || s.x > w) s.vx *= -1;
        if (s.y < 0 || s.y > h) s.vy *= -1;

        // gentle gravitation toward cursor
        const dxm = mouse.x - s.x;
        const dym = mouse.y - s.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 160) {
          s.x += (dxm / dm) * 0.35;
          s.y += (dym / dm) * 0.35;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starRGB},0.55)`;
        ctx.fill();
      }

      // connect neighbours
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 128) {
            const near =
              Math.hypot(mouse.x - a.x, mouse.y - a.y) < 180;
            ctx.strokeStyle = near
              ? `rgba(255,106,26,${0.22 * (1 - d / 128)})`
              : `rgba(${starRGB},${0.1 * (1 - d / 128)})`;
            ctx.lineWidth = near ? 0.8 : 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-0 h-full w-full opacity-60"
    />
  );
}
