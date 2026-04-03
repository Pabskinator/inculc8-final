"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
        if (navRef.current) {
          const isMobile = window.innerWidth < 768;
          gsap.to(navRef.current, {
            backgroundColor: scrolled ? (isMobile ? "rgba(248, 241, 231, 0.98)" : "rgba(248, 241, 231, 0.92)") : "rgba(248, 241, 231, 0)",
            backdropFilter: scrolled && !isMobile ? "blur(16px)" : "blur(0px)",
            borderBottomColor: scrolled ? "rgba(47, 53, 58, 0.08)" : "rgba(47, 53, 58, 0)",
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);

    if (nextState) {
      // Open Menu Animation
      gsap.to(menuRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power4.out"
      });
      gsap.fromTo(".mobile-nav-link", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "expo.out", delay: 0.2 }
      );
    } else {
      // Close Menu Animation
      gsap.to(menuRef.current, {
        autoAlpha: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
      });
    }
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      gsap.to(menuRef.current, {
        autoAlpha: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
      });
    }
  };

  return (
    <>
      <header 
        className="fixed top-2 md:top-3 left-4 right-4 md:left-12 md:right-12 z-[100] transition-all rounded-full border border-transparent" 
        ref={navRef}
      >
        <div className="flex items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-3 group relative z-[110]" onClick={closeMenu}>
            <div className="relative w-8 h-8 md:w-9 md:h-9">
                <Image src="/images/logo/inculc8-logo-final.png" alt="Inculc8 Logo" fill className="object-contain" priority />
            </div>
            <span className="font-sans font-bold text-lg tracking-tight text-charcoal group-hover:text-indigo transition-colors duration-300">
              Inculc8 Solutions
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-7 items-center font-sans font-semibold text-[12px] tracking-wide">
            <Link href="#solutions" className="text-charcoal hover:text-indigo hover:underline underline-offset-[6px] decoration-amber decoration-2 transition-all">
              Solutions Engine
            </Link>
            <Link href="#strategic-value" className="text-charcoal hover:text-indigo hover:underline underline-offset-[6px] decoration-amber decoration-2 transition-all">
              Strategic Value
            </Link>
            <Link href="#trust" className="text-charcoal hover:text-indigo hover:underline underline-offset-[6px] decoration-amber decoration-2 transition-all">
              Engineering Excellence
            </Link>
            <Link href="#mission" className="text-charcoal hover:text-indigo hover:underline underline-offset-[6px] decoration-amber decoration-2 transition-all">
              The Core Blueprint
            </Link>
            <Link href="#contact" className="ml-4 px-5 py-2.5 bg-charcoal text-cream hover:bg-indigo hover:text-white transition-colors duration-300 font-mono text-[10px] uppercase tracking-widest rounded-full shadow-md hover:shadow-lg">
              Connect Now
            </Link>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={toggleMenu}
            className="md:hidden relative z-[110] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none group"
            aria-label="Toggle Menu"
          >
            <span className={`w-6 h-[2px] bg-charcoal transition-all duration-300 origin-center ${isMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
            <span className={`w-6 h-[2px] bg-charcoal transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[2px] bg-charcoal transition-all duration-300 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[90] bg-cream md:bg-cream/98 md:backdrop-blur-2xl md:hidden overflow-hidden flex flex-col pt-32 px-10 invisible"
        style={{ opacity: 0, transform: "translateY(-20px)" }}
      >
        <nav className="flex flex-col gap-8 text-left" ref={menuLinksRef}>
          {[
            { label: "Solutions Engine", href: "#solutions" },
            { label: "Strategic Value", href: "#strategic-value" },
            { label: "Engineering Excellence", href: "#trust" },
            { label: "The Core Blueprint", href: "#mission" },
            { label: "Connect Now", href: "#contact", special: true }
          ].map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={closeMenu}
              className={`mobile-nav-link text-3xl font-sans font-black uppercase tracking-tighter ${
                link.special ? "text-indigo" : "text-charcoal/80"
              } hover:text-indigo transition-colors`}
            >
              {link.label}
              {link.special && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-amber animate-pulse" />}
            </Link>
          ))}
        </nav>

        {/* Mobile Footer Decor */}
        <div className="mt-auto pb-12 opacity-30">
          <div className="h-px w-full bg-charcoal/10 mb-8" />
          <div className="flex justify-between items-center font-mono text-[8px] uppercase tracking-[0.4em]">
            <span>INC8_SYSTEM // MOBILE</span>
            <span>v2.4.INC</span>
          </div>
        </div>
      </div>
    </>
  );
}
