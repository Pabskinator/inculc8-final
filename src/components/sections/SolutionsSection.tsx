"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const solutions = [
  {
    id: "01",
    category: "Development",
    title: "Bespoke Web Platforms",
    description: "High-performance, scalable web architectures built with modern frameworks for seamless user interaction.",
    tags: ["React", "Next.js", "Performance"],
    status: "Service Active"
  },
  {
    id: "02",
    category: "Automation",
    title: "AI Business Integration",
    description: "Custom AI solutions designed to automate complex workflows and provide real-time data insights for your business.",
    tags: ["AI", "Automation", "Workflows"],
    status: "Service Active"
  },
  {
    id: "03",
    category: "Experience",
    title: "Creative Engineering",
    description: "Visually stunning, high-performance interfaces that blend cutting-edge motion with intuitive design.",
    tags: ["Motion", "GSAP", "UX"],
    status: "Service Active"
  },
  {
    id: "04",
    category: "Strategy",
    title: "Digital Ecosystems",
    description: "Comprehensive software solutions that orchestrate your entire digital landscape with precision and speed.",
    tags: ["API", "Cloud", "Integration"],
    status: "Service Active"
  }
];

export default function SolutionsSection() {
  const container = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(() => {
    // ── REVEAL ENTITIES ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      }
    });

    tl.from(".solutions-header-text", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power4.out",
    })
      .from('.solution-ledger-item', {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
      }, "-=0.6");

    // ── PARALLAX: BACKGROUND GRID ──
    gsap.to(gridRef.current, {
      yPercent: -25,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // ── PARALLAX: FLOATING MARKERS ──
    gsap.utils.toArray('.float-marker').forEach((marker: any, i) => {
      const distance = i % 2 === 0 ? 150 : -100;
      gsap.to(marker, {
        y: distance,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    });

    // Parallax logic for ghost numbers removed for static alignment and performance.

    // Force recalculation
    ScrollTrigger.refresh();
  }, { scope: container, dependencies: [] });

  return (
    <section id="solutions" ref={container} className="py-32 relative overflow-hidden border-t border-charcoal/5" style={{ backgroundColor: '#FDFCF6' }}>

      {/* ── PARALLAX LAYER: BACKGROUND GRID ── */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none opacity-[0.08] z-0"
        style={{
          backgroundImage: `radial-gradient(circle, #3F51B5 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* ── PARALLAX LAYER: SYNC MARKERS ── */}
      <div className="absolute top-1/4 left-[10%] float-marker pointer-events-none z-0">
        <span className="font-mono text-[8px] text-indigo/20 uppercase tracking-[0.5em] whitespace-nowrap">
          SYNC_NODE_PH // ACTIVE
        </span>
      </div>
      <div className="absolute top-2/3 right-[15%] float-marker pointer-events-none z-0 text-right">
        <span className="font-mono text-[8px] text-indigo/20 uppercase tracking-[0.5em] whitespace-nowrap block">
          REF_FLOW_01.INC
        </span>
        <span className="font-mono text-[6px] text-indigo/10 uppercase block">
          EST: 2024.INC8
        </span>
      </div>

      {/* Parallax layer for ghost numbers removed - replaced with static row-based watermarks */}

      <div className="container-max relative z-10">

        {/* SECTION HEADER — Bold & Sophisticated */}
        <div className="solutions-header-text mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-amber" />
            <span className="font-mono text-[10px] text-amber tracking-[0.3em] uppercase font-bold">
              Infinite Architectures // Growth Services
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <h2 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl text-charcoal leading-[0.85] tracking-tight uppercase">
              How we <br />
              <span className="text-indigo">Empower.</span>
            </h2>
            <p className="max-w-xs text-charcoal/50 font-sans text-sm md:text-base leading-relaxed border-l border-charcoal/10 pl-6">
              Strategic technology partner for brands <br /> ready to scale their digital presence <br /> with precision-engineered solutions.
            </p>
          </div>
        </div>

        {/* SOLUTIONS LIST — The Flow */}
        <div className="border-t border-charcoal/10">
          {solutions.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="solution-ledger-item group relative border-b border-charcoal/10 cursor-pointer block"
            >
              <div className="py-10 md:py-16 flex flex-col md:flex-row md:items-center gap-6 md:gap-20 transition-all duration-500">

                {/* Static Ghost Number Watermark */}
                <span className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 font-sans font-black text-[120px] md:text-[180px] text-charcoal/[0.04] select-none pointer-events-none z-0">
                  {item.id}
                </span>

                {/* ID & CATEGORY */}
                <div className="flex items-center md:flex-col md:items-start gap-4 md:gap-2 min-w-[120px]">
                  <span className="font-mono text-xs text-charcoal/20">{item.id}</span>
                  <span className="font-mono text-[9px] text-amber tracking-widest uppercase font-bold px-2 py-0.5 bg-amber/5 rounded-sm border border-amber/10">
                    {item.category}
                  </span>
                </div>

                {/* TITLE & HOVER STROKE */}
                <div className="flex-grow relative">
                  <h3 className={`font-sans font-black text-3xl md:text-5xl lg:text-6xl transition-all duration-500 uppercase tracking-tighter ${hoveredIndex === i
                    ? 'text-transparent scale-[1.02] translate-x-4'
                    : 'text-charcoal'
                    }`}
                    style={{
                      WebkitTextStroke: hoveredIndex === i ? '1.5px #3F51B5' : '0px transparent',
                    }}>
                    {item.title}
                  </h3>
                </div>

                {/* STATUS & TAGS — Desktop Only for Cleanliness */}
                <div className="hidden lg:flex items-center gap-8 text-right shrink-0">
                  <div className="flex flex-col gap-1 items-end">
                    <span className="font-mono text-[8px] text-charcoal/30 uppercase tracking-widest">Focus</span>
                    <div className="flex gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="font-mono text-[9px] text-charcoal/50 uppercase">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end min-w-[100px]">
                    <span className="font-mono text-[8px] text-charcoal/30 uppercase tracking-widest">Availability</span>
                    <span className="font-mono text-[10px] text-charcoal/60 font-bold tracking-tighter flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-teal" />
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* DESCRIPTION — Revealed on Hover */}
                <div className={`overflow-hidden transition-all duration-500 max-w-sm ml-auto ${hoveredIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  <p className="text-charcoal/60 font-sans text-sm md:text-right italic pr-4">
                    {item.description}
                  </p>
                </div>

              </div>

              {/* Background Highlight on Hover */}
              <div className={`absolute inset-x-[-2vw] inset-y-2 bg-indigo/2 -z-10 transition-opacity duration-500 pointer-events-none rounded-xl ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'
                }`} />
            </div>
          ))}
        </div>

        {/* Technical Footer */}
        <div className="mt-20 flex items-center justify-between">
          <span className="font-mono text-[8px] text-charcoal/20 tracking-[0.4em] uppercase">Inculc8 Solutions // Expert Portfolio</span>
          <div className="flex gap-8">
            <span className="font-mono text-[8px] text-charcoal/20 uppercase tracking-[0.2em]">Philippine Based</span>
            <span className="font-mono text-[8px] text-charcoal/20 uppercase tracking-[0.2em]">© 2024</span>
          </div>
        </div>

      </div>
    </section>
  );
}
