"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const engineeringUnits = [
  {
    index: "01",
    tag: "INFRASTRUCTURE",
    title: "Global Scalability Framework",
    desc: "Engineered for maximum availability and architectural elegance. Our systems feature sub-second time-to-interactive, modular design patterns, and enterprise-grade edge distribution.",
    specs: ["Modular Logic", "Edge Intelligence", "Distributed Resilience"],
    stat: "99.9%",
    label: "Core Uptime"
  },
  {
    index: "02",
    tag: "INTELLIGENCE",
    title: "Seamless Solution Logic",
    desc: "Optimizing the synergy between automated workflows and human efficiency. We design intelligent orchestrators that simplify complex business processes with predictive logic.",
    specs: ["Behavioral Logic", "Real-Time Sync", "Orchestration"],
    stat: "50+",
    label: "Active Workflows"
  },
  {
    index: "03",
    tag: "RESILIENCE",
    title: "Secure Enterprise Systems",
    desc: "Reliability is defined by structural integrity. We leverage industry-standard compliance and deep code validation to ensure your digital ecosystem remains stable and secure.",
    specs: ["ISO/IEC 27001", "WCAG 2.2", "System Audits"],
    stat: "100%",
    label: "System Compliance"
  }
];

export default function TrustProofSection() {
  const container = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP: PINNED EXPERIENCE ──
    mm.add("(min-width: 1024px)", () => {
      const nodes = gsap.utils.toArray<HTMLElement>('.protocol-node');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1
        }
      });

      gsap.set(nodes, { opacity: 0, y: 50, display: 'none' });
      gsap.set(".tp-header", { opacity: 0, scale: 0.9, y: 50 });

      tl.to(".tp-header", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      });

      tl.to({}, { duration: 0.3 });

      tl.to(".tp-header", {
        opacity: 0,
        y: -50,
        scale: 0.95,
        duration: 0.6,
        ease: "power2.inOut"
      });

      engineeringUnits.forEach((_, i) => {
        tl.to(nodes[i], { 
          display: 'flex', 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power2.out" 
        });

        tl.to(`.spine-segment-${i}`, {
          scaleY: 1,
          transformOrigin: "top",
          duration: 0.8,
          ease: "none"
        }, "<");

        tl.to({}, { duration: 0.4 });

        if (i < engineeringUnits.length - 1) {
          tl.to(nodes[i], { 
            opacity: 0, 
            y: -50, 
            duration: 0.6,
            ease: "power3.in",
            onComplete: () => { gsap.set(nodes[i], { display: 'none' }); } 
          });
        }
      });
    });

    // ── MOBILE/TABLET: NATIVE SCROLL REVEAL ──
    mm.add("(max-width: 1023px)", () => {
      // Reveal cards as they enter viewport
      const nodes = gsap.utils.toArray<HTMLElement>('.protocol-node');
      
      nodes.forEach((node) => {
        gsap.fromTo(node, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Special reveal for the header
      gsap.fromTo(".tp-header", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: ".tp-header",
            start: "top 80%"
          }
        }
      );
    });

    return () => mm.revert();
  }, { scope: container });

  return (
    <section 
      id="trust" 
      ref={container} 
      className="relative min-h-screen bg-cream text-charcoal overflow-hidden selection:bg-indigo selection:text-white"
    >
      {/* ── SUBTLE CANVAS OVERLAY (PREMIUM EDITORIAL FEEL) ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0" 
             style={{ backgroundImage: 'radial-gradient(circle, #2F353A 0.5px, transparent 0.5px)', backgroundSize: '80px 80px' }} 
        />
      </div>

      <div className="container-max min-h-screen relative z-10 px-6 pt-[400px] pb-20 lg:py-0 flex flex-col items-center lg:justify-center justify-start">
        
        <div className="tp-header relative lg:absolute lg:inset-0 flex flex-col items-center justify-center text-center px-6 z-10 mb-12 lg:mb-0">
          {/* Brand Subtitle */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-yellow-400/50" />
            <span className="font-mono text-[10px] font-bold tracking-[0.4em] uppercase text-yellow-500">
              Technical Standard
            </span>
            <div className="w-8 h-px bg-yellow-400/50" />
          </div>

          <h2 className="font-sans font-black text-6xl md:text-9xl tracking-tighter uppercase leading-[0.8] mb-4">
            Engineering <br/>
            <span 
              className="italic text-indigo"
              style={{ 
                WebkitTextStroke: '2px #4F46E5', 
                color: 'transparent' 
              }}
            >
              Excellence.
            </span>
          </h2>
        </div>

        {/* ── THE PINNED LOOM ── */}
        <div ref={pinWrapRef} className="relative w-full max-w-4xl lg:h-[600px] h-auto flex items-center justify-center">
          
          {/* Central Animated Spine - Desktop Only */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-charcoal/5 -translate-x-1/2 z-0 hidden lg:block">
            {engineeringUnits.map((_, i) => (
              <div 
                key={i}
                className={`spine-segment-${i} absolute left-0 w-full bg-indigo/20 origin-top`}
                style={{ 
                  top: `${(i / engineeringUnits.length) * 100}%`, 
                  height: `${(1 / engineeringUnits.length) * 100}%`,
                  transform: 'scaleY(0)' 
                }} 
              />
            ))}
          </div>

          <div className="w-full relative z-10">
            {engineeringUnits.map((p, i) => {
              return (
                <div 
                  key={p.index} 
                  className={`protocol-node relative lg:absolute lg:inset-0 flex flex-col items-center justify-center text-center pointer-events-none mb-12 lg:mb-0`}
                >
                  <div className="max-w-2xl bg-cream/95 backdrop-blur-xl p-10 md:p-14 border border-charcoal/10 rounded-2xl pointer-events-auto shadow-2xl shadow-charcoal/5">
                    <span className="font-mono text-[10px] font-bold text-charcoal/40 tracking-[0.5em] uppercase mb-8 block">
                      {p.tag} // {p.index}
                    </span>
                    <h3 className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tighter leading-tight mb-8">
                      {p.title}
                    </h3>

                    <p className="text-charcoal/70 leading-relaxed text-sm md:text-lg font-medium mb-12 max-w-lg mx-auto">
                      {p.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center mb-12">
                      {p.specs.map((spec, j) => (
                        <div key={j} className="px-4 py-1.5 bg-charcoal/5 rounded-full border border-charcoal/10">
                          <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-charcoal/60">{spec}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="font-sans font-black text-6xl text-indigo tracking-tighter">{p.stat}</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal/30 mt-2">{p.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── SEAMLESS BOTTOM WAVE (MATCH CREAM) ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none transform translate-y-[99%]">
        <svg 
          viewBox="0 0 1200 120" 
          xmlns="http://www.w3.org/2000/svg" 
          className="relative block w-full h-[100px] md:h-[180px]"
          preserveAspectRatio="none"
          fill="#FDFCF6"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,38.5,88.51,27.08,181.69,45.24,274.2,36.5,69.57-6.57,135-34.82,204.8-40.5,49.1-4,97.7,1.88,138,15.5V0Z" />
        </svg>
      </div>
    </section>
  );
}
