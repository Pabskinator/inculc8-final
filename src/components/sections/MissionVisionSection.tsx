"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function MissionVisionSection() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Kinetic Typography Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
        end: "center center",
        scrub: 1,
      }
    });

    // Slide in Solid Text from left
    tl.from(".mv-text-solid", {
      xPercent: -15,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    }, 0);

    // Slide in Hollow Text from right
    tl.from(".mv-text-hollow", {
      xPercent: 15,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    }, 0);

    // Fade in mission/vision blocks
    gsap.from(".mv-block", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".mv-blocks-container",
        start: "top 85%",
      }
    });

  }, { scope: container });

  return (
    <section
      id="mission"
      ref={container}
      className="relative pt-48 pb-48 bg-charcoal text-cream overflow-hidden selection:bg-indigo selection:text-white"
    >
      {/* ── IMMERSIVE BACKGROUND ── */}
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Premium SVG Topography/Workflow Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* ── TOP WAVY DIVIDER (Cream spilling into Charcoal) ── */}
      <div className="absolute -top-[1px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[80px] md:h-[120px]"
          fill="#F8F1E7"
          style={{ transform: "rotateY(180deg)" }}
        >
          <path d="M0,0V15.89C151.43,35.29,313.43,107.88,477.5,101.25c136.33-5.5,273.49-86.21,511.14-91.25,103.01-3.78,206.14,16.25,311.36,65.89V0Z"></path>
        </svg>
      </div>

      <div className="container-max relative z-10 px-6 mt-32 md:mt-48">

        {/* HEADER - Massive Kinetic Typography */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-yellow-400/50" />
            <span className="font-mono text-[10px] text-yellow-500 tracking-[0.4em] uppercase font-bold">
              Our Mission & Vision
            </span>
          </div>

          <h2 className="font-sans font-black text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.9] tracking-tighter uppercase flex flex-col gap-2">
            <span className="mv-text-solid text-white drop-shadow-lg">
              Elevating Digital<br />Experiences.
            </span>
            <span
              className="mv-text-hollow text-transparent"
              style={{ WebkitTextStroke: "2px #5C6BC0" }}
            >
              Smarter Workflows.
            </span>
          </h2>
        </div>

        {/* CONTENT BLOCKS */}
        <div className="mv-blocks-container grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative">

          {/* subtle background separator */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block -translate-x-1/2" />

          {/* Mission Block */}
          <div className="mv-block group">
            <h3 className="text-sm font-mono font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-4">
              <span className="w-8 h-px bg-white/30 group-hover:bg-amber-400 group-hover:w-12 transition-all duration-300"></span>
              The Mission
            </h3>
            <p className="text-xl md:text-2xl text-cream/70 font-light leading-relaxed tracking-wide">
              To architect pristine, high-performance web applications and engineer seamless workflow automations that eliminate manual friction. We build robust digital foundations, empowering organizations to scale efficiently by discarding bloated processes in favor of elite, modern development.
            </p>
          </div>

          {/* Vision Block */}
          <div className="mv-block group">
            <h3 className="text-sm font-mono font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-4">
              <span className="w-8 h-px bg-white/30 group-hover:bg-amber-400 group-hover:w-12 transition-all duration-300"></span>
              The Vision
            </h3>
            <p className="text-xl md:text-2xl text-cream/70 font-light leading-relaxed tracking-wide">
              To act as the invisible engine for forward-thinking enterprises. We envision a digital landscape where captivating web experiences converge with intelligent automation to transform complex, repetitive tasks into streamlined systems that drive unparalleled growth.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

