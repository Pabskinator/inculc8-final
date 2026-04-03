"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Confirmed by user — matches the actual video background
const VIDEO_BG = "#F8F1E7";

export default function HeroSection() {
  const setIsHovering = useAppStore((s) => s.setIsHovering);
  const container = useRef<HTMLElement>(null);
  const videoPanel = useRef<HTMLDivElement>(null);
  const textContent = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── INITIAL REVEAL ──
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: 10,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".hero-line",
          {
            yPercent: 110,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.08,
          },
          "-=0.5"
        )
        .from(
          ".hero-sub",
          { opacity: 0, y: 14, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          { opacity: 0, y: 10, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          videoPanel.current,
          { opacity: 0, duration: 1.2, ease: "power2.out" },
          "<-=1.0"
        );

      // ── SCROLL PARALLAX: PANELS ──
      gsap.to(videoPanel.current, {
        yPercent: 15,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(textContent.current, {
        yPercent: -15,
        opacity: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── SCROLL PARALLAX: TECHNICAL SIDEBAR REVEAL ──
      gsap.to(".hero-technical-marker", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container, dependencies: [] }
  );

  return (
    <section
      id="hero"
      ref={container}
      className="relative w-full overflow-hidden flex flex-col md:flex-row"
      style={{ backgroundColor: VIDEO_BG, height: "100svh" }}
    >
      {/* ── PARALLAX LAYER: TECHNICAL SIDEBAR MARKER ── */}
      <div 
        className="hero-technical-marker absolute left-8 top-1/3 h-64 w-8 pointer-events-none z-0 hidden md:flex flex-col items-center justify-between opacity-[0.1]"
      >
        <span className="font-mono text-[7px] uppercase tracking-[1em] [writing-mode:vertical-lr] rotate-180 text-charcoal font-bold">
          INC8_CORE_SYSTEM_ACTIVE
        </span>
        <div className="w-[1px] h-24 bg-charcoal/20" />
        <span className="font-mono text-[7px] uppercase tracking-[1.2em] [writing-mode:vertical-lr] rotate-180 text-charcoal/40">
          STABLE_BUILD_v2.4
        </span>
      </div>

      {/* ── LEFT: TEXT PANEL ── */}
      <div 
        ref={textContent}
        className="relative z-10 flex flex-col justify-center w-full min-h-[60svh] md:min-h-0 md:w-[50%] lg:w-[48%] px-8 md:px-14 lg:px-20 pt-28 md:pt-24 pb-12 md:pb-16"
      >

        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-3 mb-7">
          <div className="w-5 h-[1px] bg-amber shrink-0" />
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-amber">
            Web &amp; AI Solutions
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-sans font-black leading-[0.9] tracking-[-0.03em] uppercase mb-7">
          <div className="overflow-hidden">
            <span className="hero-line block text-[11vw] md:text-[6vw] lg:text-[5.5vw] text-charcoal">
              Architect
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line block text-[11vw] md:text-[6vw] lg:text-[5.5vw] text-charcoal">
              The{" "}
              <span
                className="italic font-black text-transparent"
                style={{ WebkitTextStroke: "1px #3F51B5" }}
              >
                Future
              </span>
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line block text-[11vw] md:text-[6vw] lg:text-[5.5vw] text-charcoal">
              Of{" "}
              <span className="text-amber">Digital.</span>
            </span>
          </div>
        </h1>

        {/* Description */}
        <p className="hero-sub font-sans text-sm md:text-base text-charcoal/55 leading-relaxed max-w-sm mb-10">
          High-performance web platforms and intelligent AI workflow automation —
          engineered for ambitious businesses.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-wrap items-center gap-4">
          <Link
            href="#solutions"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="px-7 py-3.5 bg-indigo text-white font-sans font-bold text-xs uppercase tracking-widest hover:bg-teal transition-all duration-300 rounded-sm shadow-lg shadow-indigo/20"
          >
            Get started
          </Link>
          <Link
            href="#contact"
            className="px-7 py-3.5 font-sans font-semibold text-xs uppercase tracking-widest text-indigo hover:text-white hover:bg-indigo transition-all duration-300 rounded-sm border border-indigo/40 hover:border-indigo"
          >
            Talk to us
          </Link>
        </div>
      </div>


      {/* ── RIGHT: VIDEO — split container ── */}
      <div 
        ref={videoPanel}
        className="hero-video-panel relative md:absolute right-0 top-0 w-full h-[40svh] md:h-full md:w-[50%] lg:w-[52%] overflow-hidden" 
      >
        {/* Left feather (Desktop split blend) */}
        <div
          className="absolute inset-y-0 left-0 w-32 lg:w-48 z-10 pointer-events-none hidden md:block"
          style={{
            background: `linear-gradient(to right, ${VIDEO_BG} 0%, transparent 100%)`,
          }}
        />
        {/* Top feather (Universal/Mobile top blend) */}
        <div
          className="absolute inset-x-0 top-0 h-28 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${VIDEO_BG} 0%, transparent 100%)`,
          }}
        />
        {/* Bottom feather (Desktop/Mobile bottom bleed) */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${VIDEO_BG} 0%, transparent 100%)`,
          }}
        />

        <video
          className="w-full h-full object-cover object-left-top"
          src="/video/inculc8.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  );
}
