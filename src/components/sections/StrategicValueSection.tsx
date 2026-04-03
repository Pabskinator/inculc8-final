"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const pillars = [
  {
    id: "01",
    title: "Endless Connectivity",
    desc: "We bridge the gap between fragmented systems, creating fluid API networks and secure data bridges that never rest.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Network Mesh */}
        <circle cx="20" cy="20" r="2" fill="currentColor" className="animate-pulse" />
        <circle cx="10" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="30" cy="10" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="32" cy="28" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="12" cy="30" r="1.5" fill="currentColor" opacity="0.4" />
        
        {/* Connecting Lines */}
        <path d="M20 20L10 12M20 20L30 10M20 20L32 28M20 20L12 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="animate-dash-1 opacity-30" />
        <path d="M10 12L30 10M30 10L32 28M32 28L12 30M12 30L10 12" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="2 4" className="opacity-20 translate-x-[2px] translate-y-[-2px]" />
        
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" className="animate-spin-slow opacity-10" />
      </svg>
    ),
    accent: "#3F51B5",
  },
  {
    id: "02",
    title: "Adaptive Intelligence",
    desc: "Our logic cores evolve in real-time, anticipating market shifts and scaling with the precise agility your growth demands.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Octahedron Logic Core */}
        <path d="M20 6L32 20L20 34L8 20L20 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="animate-pulse" />
        <path d="M8 20H32M20 6V34" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <path d="M20 14L26 20L20 26L14 20L20 14Z" fill="currentColor" className="animate-breath opacity-20" />
        
        {/* Floating Data Bits */}
        <rect x="14" y="10" width="2" height="2" fill="currentColor" className="animate-bounce opacity-40" style={{ animationDelay: "0.2s" }} />
        <rect x="24" y="28" width="2" height="2" fill="currentColor" className="animate-bounce opacity-40" style={{ animationDelay: "0.5s" }} />
        <rect x="30" y="16" width="2" height="2" fill="currentColor" className="animate-bounce opacity-40" style={{ animationDelay: "0.8s" }} />
      </svg>
    ),
    accent: "#26C6DA",
  },
  {
    id: "03",
    title: "Total Resilience",
    desc: "Built on a foundation of modular code, our systems are designed to endure, compounding value over time.",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Modular Grid Lattice */}
        <rect x="10" y="10" width="6" height="6" stroke="currentColor" strokeWidth="1.5" className="animate-pulse" />
        <rect x="18" y="10" width="6" height="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <rect x="26" y="10" width="6" height="6" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        
        <rect x="10" y="18" width="6" height="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <rect x="18" y="18" width="6" height="6" fill="currentColor" className="animate-breath opacity-20" />
        <rect x="26" y="18" width="6" height="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        
        <rect x="10" y="26" width="6" height="6" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <rect x="18" y="26" width="6" height="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <rect x="26" y="26" width="6" height="6" stroke="currentColor" strokeWidth="1.5" className="animate-pulse" />
        
        <path d="M8 8H32V32H8V8Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" className="animate-spin-slow opacity-10" />
      </svg>
    ),
    accent: "#FBC02D",
  }
];

export default function StrategicValueSection() {
  const container = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Reveal Header
    gsap.fromTo(".sv-header-line", 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { 
          trigger: ".sv-header", 
          start: "top 90%",
          once: true 
        }
      }
    );

    // Individual Reveal for each card to eliminate lag
    const cards = gsap.utils.toArray<HTMLElement>('.value-module');
    cards.forEach((card) => {
      gsap.fromTo(card,
        { autoAlpha: 0, y: 30, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "expo.out",
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50px",
            once: true,
            toggleActions: "play none none none"
          }
        }
      );

      // 3D Magnetic Tilt and Depth Lift
      card.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within element
        const y = e.clientY - rect.top; // y position within element
        
        // Calculate rotation (center is 0, edges are -15 to 15 deg)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; // Invert Y for tilt
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.02,
          translateZ: 20,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.25)",
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, { 
          rotateX: 0,
          rotateY: 0,
          scale: 1, 
          translateZ: 0,
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
          overwrite: "auto"
        });
      });
    });

  }, { scope: container });

  return (
    <section 
      id="strategic-value" 
      ref={container} 
      className="relative pt-48 pb-48 bg-charcoal text-cream overflow-visible uppercase"
    >
      {/* ── TOP WAVY DIVIDER (Section Above to Charcoal) ── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[100px] md:h-[150px]"
          fill="#FDFCF6"
        >
          {/* A more emphasized, fluid asymmetrical wave */}
          <path d="M0,0V15.89C151.43,35.29,313.43,107.88,477.5,101.25c136.33-5.5,273.49-86.21,511.14-91.25,103.01-3.78,206.14,16.25,311.36,65.89V0Z"></path>
        </svg>
      </div>
      <div className="container-max relative z-10 px-6">
        
        {/* HEADER - Rescaled for better pillar visibility */}
        <div className="sv-header mb-20 max-w-5xl">
          <div className="sv-header-line flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-amber" />
            <span className="font-mono text-[10px] text-amber tracking-[0.4em] uppercase font-bold">
              Strategic Excellence
            </span>
          </div>
          
          <h2 className="sv-header-line font-sans font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tighter uppercase mb-8">
            Adaptive Growth.<br/>
            <span className="text-indigo">Smarter</span>{" "}
            <span className="text-transparent" style={{ WebkitTextStroke: "1px #3F51B5" }}>Scaling.</span>
          </h2>
          
          <p className="sv-header-line max-w-xl text-cream/40 font-sans text-sm md:text-base leading-relaxed">
            Integrating ecosystems where connectivity is seamless and resilience is infinite.
          </p>
        </div>

        <div className="value-grid grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch" style={{ perspective: "1500px" }}>
          {pillars.map((pillar) => (
            <div 
              key={pillar.id}
              className="value-module relative group bg-white/[0.03] border border-white/5 backdrop-blur-3xl p-10 flex flex-col h-full overflow-hidden will-change-[transform,opacity] backface-hidden transform-gpu rounded-xl"
              style={{
                boxShadow: `0 0 40px -10px ${pillar.accent}15`,
                transformStyle: "preserve-3d"
              }}
            >
              {/* ── IMMERSIVE BACKGROUND ICON (LIVING LOGIC) ── */}
              <div 
                className="absolute inset-0 w-full h-full grayscale opacity-[0.05] group-hover:opacity-[0.15] group-hover:grayscale-0 transition-all duration-1000 pointer-events-none z-0 overflow-hidden flex items-center justify-center scale-[1.1] rotate-[-5deg] group-hover:rotate-0"
                style={{ color: pillar.accent }}
              >
                <div className="scale-[1.8] origin-center transition-transform duration-[3000ms] ease-out group-hover:scale-[2.2]">
                  {React.isValidElement(pillar.icon) 
                    ? React.cloneElement(pillar.icon as React.ReactElement<{ className?: string }>, { className: "w-full h-full" })
                    : pillar.icon
                  }
                </div>
              </div>

              {/* Ambient Accent Glow */}
              <div 
                className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[120px] opacity-10 pointer-events-none group-hover:opacity-30 transition-opacity duration-1000"
                style={{ backgroundColor: pillar.accent }}
              />

              {/* Functional Header */}
              <div className="flex justify-between items-center mb-12 relative z-10">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-white/20 tracking-[0.4em] font-bold uppercase transition-colors group-hover:text-amber/40">
                    Pillar_{pillar.id}
                  </span>
                  <div className="w-6 h-[2px] bg-white/10 group-hover:bg-amber/30 transition-all group-hover:w-10" />
                </div>
                
                {/* Small Marker Icon */}
                <div 
                  className="w-10 h-10 flex items-center justify-center transition-all duration-700 bg-white/[0.03] rounded-lg border border-white/10 group-hover:border-white/20"
                  style={{ color: pillar.accent }}
                >
                  <div className="scale-75 opacity-60 group-hover:opacity-100 group-hover:scale-95 transition-all">
                    {pillar.icon}
                  </div>
                </div>
              </div>

              {/* CONTENT AREA */}
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="font-sans font-black text-2xl lg:text-3xl tracking-tight leading-[1.1] mb-6 text-white/80 group-hover:text-white transition-colors uppercase">
                  {pillar.title}
                </h3>
                
                <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium group-hover:text-white/70 transition-colors">
                  {pillar.desc}
                </p>

                {/* Technical Interaction Row */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] text-white/10 tracking-widest uppercase">System Status</span>
                    <span className="font-mono text-[10px] text-white/30 tracking-tight group-hover:text-white/60 transition-colors uppercase font-bold">
                      Ecosystem: Optimized
                    </span>
                  </div>
                  
                  {/* ── PREMIUM STRATEGIC ARROW (DASH SLIDE) ── */}
                  <div className="relative w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/5 transition-all overflow-hidden group/arrow">
                    <div className="flex transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1">
                      <svg className="w-5 h-5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    {/* Ghost Dash Reflection */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                      <div className="w-8 h-px bg-white translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── THE INFINITY WAVE DIVIDER (SEAMLESS COLOR MATCH) ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[99%] z-20 pointer-events-none">
        <svg 
          viewBox="0 0 1200 120" 
          xmlns="http://www.w3.org/2000/svg" 
          className="relative block w-full h-[100px] md:h-[180px]"
          preserveAspectRatio="none"
        >
          {/* Wave body matching section color exactly (#2F353A) */}
          <path 
            fill="#2F353A" 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,38.5,88.51,27.08,181.69,45.24,274.2,36.5,69.57-6.57,135-34.82,204.8-40.5,49.1-4,97.7,1.88,138,15.5V0Z"
          />
        </svg>
      </div>
    </section>
  );
}
