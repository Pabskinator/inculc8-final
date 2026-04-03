"use client";

import { useRef, useState, FormEvent, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Mouse-Parallel Camera movement - Tracks Global Mouse for Unblocked Interactivity
function Rig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const vec = new THREE.Vector3();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return useFrame(() => {
    // Subtle, global camera tilt that works even over the form
    camera.position.lerp(vec.set(mouse.current.x * 0.6, mouse.current.y * 0.3, 6), 0.05);
    camera.lookAt(0, 0, 0);
  });
}

// Giant Infinity Loop (TorusKnot) Engine - Tuned for Precision
function InfinityLoopEngine({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slower, more sophisticated rotation ("Living Logic")
      meshRef.current.rotation.x += delta * (active ? 0.2 : 0.07);
      meshRef.current.rotation.y += delta * (active ? 0.3 : 0.1);
    }
  });

  return (
    <mesh ref={meshRef} scale={[0.8, 0.8, 0.8]} position={[-1, 0, 0]}>
      <torusKnotGeometry args={[1.5, 0.4, window.innerWidth < 1024 ? 64 : 256, window.innerWidth < 1024 ? 16 : 32, 2, 3]} />
      <meshStandardMaterial 
        color={active ? "#FBC02D" : "#2D2D2D"} 
        wireframe 
        transparent
        opacity={0.08}
        emissive={active ? "#FBC02D" : "#2D2D2D"}
        emissiveIntensity={active ? 0.8 : 0.1}
      />
    </mesh>
  );
}

export default function ContactSection() {
  const container = useRef<HTMLElement>(null);
  const [activeInput, setActiveInput] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile for geometry optimization
    setIsMobile(window.innerWidth < 1024);

    // Smart Pre-warm: Initialize 3D context when 500px away from viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px" }
    );

    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
      } else {
        console.error(result);
        setStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert("Network error. Please check your connection.");
    }
  };

  useGSAP(() => {
    // Reveal kinetic typography with premium stagger
    gsap.from(".premium-reveal", {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%"
      }
    });

    // Animate the line separator
    gsap.from(".premium-separator", {
      scaleX: 0,
      transformOrigin: "left",
      duration: 1.5,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%"
      }
    });
  }, { scope: container });

  return (
    <section 
      id="contact" 
      ref={container} 
      className="relative min-h-[85vh] bg-[#F8F1E7] text-charcoal overflow-hidden py-24 md:py-32 flex items-center"
    >
      {/* ── IMMERSIVE 3D BACKGROUND ── */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${isInView ? "opacity-60" : "opacity-0"}`}>
        {isInView && (
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#FBC02D" />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#2D2D2D" />
              <InfinityLoopEngine active={activeInput || status === "submitting"} />
              <Rig />
            </Canvas>
          </Suspense>
        )}
      </div>

      {/* Decorative Branding Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D2D2D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container-max relative z-10 px-6 w-full pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Messaging */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-6 mb-8">
              <div className="premium-separator h-px w-16 bg-charcoal/20" />
              <span className="font-mono text-[9px] text-[#FBC02D] tracking-[0.6em] uppercase font-bold">
                Project Inquiry
              </span>
            </div>
            
            <h2 className="premium-reveal font-sans font-black text-5xl md:text-7xl tracking-tighter leading-[0.85] mb-10 uppercase flex flex-col">
              <span className="text-charcoal">Your Vision.</span>
              <span className="text-transparent" style={{ WebkitTextStroke: "1px #FBC02D" }}>Our Engine.</span>
            </h2>
            
            <p className="premium-reveal font-sans text-xl text-charcoal/90 mb-12 max-w-sm leading-relaxed font-normal">
              High performance digital architecture engineered for the next generation of industry leaders.
            </p>
            
            <div className="premium-reveal flex items-center gap-4 text-charcoal/40">
              <div className="w-2 h-2 rounded-full bg-[#FBC02D]/40 shadow-[0_0_8px_rgba(251,192,45,0.2)]" />
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Active Collaboration · Available for Partnership</span>
            </div>
          </div>

          {/* Right Side: The Form - Professional & Accessible */}
          <div className="lg:col-span-7 lg:pl-8 pointer-events-auto">
            <div className="relative p-8 md:p-14 rounded-[2.5rem] bg-white shadow-[0_30px_100px_-20px_rgba(45,45,45,0.08)] border border-charcoal/5 overflow-hidden">
              {/* Internal Soft Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#FBC02D]/5 rounded-full blur-[100px] pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="relative z-10 w-full">
                <input type="hidden" name="access_key" value="3d555215-fe19-4a76-9adb-85132c3f7239" />
                <input type="hidden" name="subject" value="New Contact Form Submission - Inculc8" />
                <input type="checkbox" name="botcheck" id="" style={{ display: "none" }} />
                {status === "success" ? (
                  <div className="py-20 flex flex-col items-center text-center animate-fade-in">
                    <div className="w-24 h-24 rounded-full border border-green-500/10 bg-green-500/5 flex items-center justify-center mb-8">
                      <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-sans font-black text-4xl text-charcoal mb-4 uppercase tracking-tight">Message Received</h3>
                    <p className="font-sans text-lg text-charcoal/50 font-light max-w-sm mx-auto">We've logged your request. Our team will contact you shortly to discuss your project.</p>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div className="group relative">
                      <label className="block font-mono text-[10px] text-charcoal/40 uppercase tracking-[0.5em] mb-4 font-bold group-focus-within:text-[#FBC02D] transition-colors duration-500">
                        Full Name / Organization
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        placeholder="E.g. Alexander Brooks"
                        className="w-full bg-transparent border-b border-charcoal/10 group-focus-within:border-[#FBC02D] px-0 py-5 font-sans text-xl md:text-2xl text-charcoal font-medium focus:outline-none transition-all duration-500 placeholder:text-charcoal/10"
                        onFocus={() => setActiveInput(true)}
                        onBlur={() => setActiveInput(false)}
                      />
                    </div>
                    
                    <div className="group relative">
                      <label className="block font-mono text-[10px] text-charcoal/40 uppercase tracking-[0.5em] mb-4 font-bold group-focus-within:text-[#FBC02D] transition-colors duration-500">
                        Professional Email
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="E.g. contact@domain.ai"
                        className="w-full bg-transparent border-b border-charcoal/10 group-focus-within:border-[#FBC02D] px-0 py-5 font-sans text-xl md:text-2xl text-charcoal font-medium focus:outline-none transition-all duration-500 placeholder:text-charcoal/10"
                        onFocus={() => setActiveInput(true)}
                        onBlur={() => setActiveInput(false)}
                      />
                    </div>

                    <div className="group relative">
                      <label className="block font-mono text-[10px] text-charcoal/40 uppercase tracking-[0.5em] mb-4 font-bold group-focus-within:text-[#FBC02D] transition-colors duration-500">
                        Project Details
                      </label>
                      <textarea 
                        name="message"
                        required
                        rows={3}
                        placeholder="Tell us about your requirements..."
                        className="w-full bg-transparent border-b border-charcoal/10 group-focus-within:border-[#FBC02D] px-0 py-5 font-sans text-xl md:text-2xl text-charcoal font-medium focus:outline-none transition-all duration-500 placeholder:text-charcoal/10 resize-none h-28"
                        onFocus={() => setActiveInput(true)}
                        onBlur={() => setActiveInput(false)}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={status === "submitting"}
                      className={`group relative overflow-hidden w-full py-8 px-12 transition-all duration-700 font-black flex items-center justify-center gap-6 rounded-[1.5rem]
                        ${status === "submitting" ? "bg-charcoal/5 text-charcoal cursor-wait" : "bg-charcoal text-cream hover:bg-[#FBC02D] hover:text-charcoal hover:-translate-y-2 active:scale-95 shadow-xl hover:shadow-[0_20px_50px_rgba(251,192,45,0.3)]"}`}
                    >
                      <span className="font-mono text-xs uppercase tracking-[0.6em] relative z-10 transition-colors duration-500">
                        {status === "submitting" ? "Sending..." : "Reach Out"}
                      </span>
                      {!status.includes('submitting') && (
                        <svg className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

