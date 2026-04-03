"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animations
  useGSAP(() => {
    if (isVisible) {
      gsap.to(buttonRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        display: "flex",
      });
    } else {
      gsap.to(buttonRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          if (buttonRef.current) buttonRef.current.style.display = "none";
        }
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    
    // Kinetic click animation
    gsap.to(buttonRef.current, {
      y: -10,
      repeat: 1,
      yoyo: true,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-amber-500 rounded-full shadow-2xl flex items-center justify-center text-charcoal group transition-all duration-300 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 hidden cursor-pointer"
      style={{ opacity: 0, transform: "scale(0)" }}
    >
      {/* Icon: Arrow Up */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transform transition-transform duration-300 group-hover:-translate-y-1"
      >
        <path d="m18 15-6-6-6 6"/>
      </svg>
      
      {/* Subtle Ring Ripple Effect */}
      <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
    </button>
  );
}
