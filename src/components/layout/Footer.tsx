"use client";

import { useRef } from "react";
import Link from 'next/link';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
  const container = useRef<HTMLElement>(null);
  const bigLogoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── STAGGERED REVEAL ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
      }
    });

    tl.from('.footer-reveal', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out"
    })
    .from(bigLogoRef.current, {
      opacity: 0,
      y: 80,
      duration: 1.5,
      ease: "expo.out"
    }, "-=0.8");

    // ── LOGO PARALLAX ──
    gsap.to(bigLogoRef.current, {
      y: -40,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <footer 
      ref={container} 
      className="relative bg-[#2F353A] text-cream pt-24 pb-0 overflow-hidden border-t border-white/5"
    >
      {/* ── TECHNICAL OVERLAY ── */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber/30 to-transparent" />
      
      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* ── BRAND COLUMN ── */}
          <div className="md:col-span-5 footer-reveal">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <span className="font-mono text-[9px] text-amber tracking-[0.4em] uppercase font-bold">
                System_Terminal // Active
              </span>
            </div>
            <h3 className="font-sans font-black text-4xl md:text-5xl text-white leading-tight uppercase tracking-tighter mb-6">
              Inculc8 <br /> Solutions.
            </h3>
            <p className="text-cream/50 max-w-sm text-sm font-sans leading-relaxed border-l border-white/10 pl-6">
              Engineering high-performance digital ecosystems and intelligent 
              architectures for the next generation of industry leaders.
            </p>
          </div>

          {/* ── NAVIGATION: CORE ── */}
          <div className="md:col-span-3 footer-reveal">
            <h4 className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase mb-8 font-bold">
              Navigation
            </h4>
            <ul className="space-y-4">
              {[
                { label: "01 // Home", href: "#hero" },
                { label: "02 // Solutions Engine", href: "#solutions" },
                { label: "03 // Strategic Value", href: "#strategic-value" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="group relative inline-flex items-center gap-3 font-sans font-bold text-lg text-cream/70 hover:text-amber transition-colors"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-amber transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── NAVIGATION: EXTENDED ── */}
          <div className="md:col-span-2 footer-reveal">
            <h4 className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase mb-8 font-bold">
              Resources
            </h4>
            <ul className="space-y-4">
              {[
                { label: "The Core Blueprint", href: "#mission" },
                { label: "Engineering Excellence", href: "#trust" },
                { label: "Connect Now", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="group relative inline-flex items-center gap-3 font-sans font-bold text-lg text-cream/40 hover:text-white transition-colors"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-white transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── TECHNICAL METADATA ── */}
          <div className="md:col-span-2 footer-reveal lg:text-right">
            <h4 className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase mb-8 font-bold">
              Metadata
            </h4>
            <div className="space-y-6 font-mono text-[9px] text-cream/30 uppercase tracking-widest">
              <div>
                <span className="block text-white/50 mb-1">Location</span>
                PH // NCR_METRO
              </div>
              <div>
                <span className="block text-white/50 mb-1">Timezone</span>
                UTC+08:00
              </div>
              <div>
                <span className="block text-white/50 mb-1">Build_Ref</span>
                REL_2024.11
              </div>
            </div>
          </div>

        </div>

        {/* ── LOWER UTILITY BAR ── */}
        <div className="footer-reveal border-t border-white/5 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-10">
            <Link href="/privacy" className="font-mono text-[9px] text-cream/30 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="font-mono text-[9px] text-cream/30 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
          <p className="font-mono text-[9px] text-cream/20 uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} Inculc8 Solutions. Built for precision.
          </p>
        </div>
      </div>

      {/* ── BIG BRAND MARK ── */}
      <div 
        ref={bigLogoRef}
        className="relative w-full overflow-hidden select-none pointer-events-none mt-[-4vw]"
      >
        <span 
          className="block w-full text-center font-sans font-black text-[25vw] leading-[0.8] tracking-tighter text-transparent lowercase opacity-[0.3]"
          style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.8)" }}
        >
          inculc8.
        </span>
      </div>

    </footer>
  );
}
