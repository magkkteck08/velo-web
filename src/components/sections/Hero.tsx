"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleWeb from "../canvas/ParticleWeb";

const slides = [
  {
    id: 0,
    bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80&auto=format",
    tag: "The Brand — Est. 2024",
    tagColor: "text-el",
    title: <motion.h1 className="font-bebas text-[clamp(4.5rem,9vw,9.5rem)] leading-[0.9] tracking-[0.02em] mb-6">WE BUILD<br/><span className="text-el">THE</span><br/>FUTURE.</motion.h1>,
    body: "VELO is a technology company at the intersection of financial software and interactive gaming. We move fast, we build right, and we are here for the long arc.",
  },
  {
    id: 1,
    bg: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80&auto=format",
    tag: "Fintech Division",
    tagColor: "text-lime",
    title: <motion.h1 className="font-bebas text-[clamp(4.5rem,9vw,9.5rem)] leading-[0.9] tracking-[0.02em] mb-6">TOOLS THAT<br/><span className="text-lime">POWER</span><br/>BUSINESS.</motion.h1>,
    body: "From digital receipts to business platforms — VELO fintech software is engineered for African businesses with global standards. Fast, reliable, and built for scale.",
  },
  {
    id: 2,
    bg: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80&auto=format",
    tag: "Gaming Division",
    tagColor: "text-org",
    title: <motion.h1 className="font-bebas text-[clamp(4.5rem,9vw,9.5rem)] leading-[0.9] tracking-[0.02em] mb-6">MANAGE.<br/><span className="text-org">TACTIZE.</span><br/>DOMINATE.</motion.h1>,
    body: "VELO Football Manager — a deep simulation game built from scratch. Multiple version releases. The most ambitious football management title ever built by an African studio.",
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6100);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-screen min-h-[700px] overflow-hidden bg-navy">
      {/* 3D Canvas Background */}
      <ParticleWeb />

      {/* Slider Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex items-center px-10 md:px-20 z-10"
        >
          {/* Background Image with Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center -z-10"
            style={{ backgroundImage: `url(${slides[currentSlide].bg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/25" />
          </div>

          {/* Text Content */}
          <div className="relative z-20 max-w-[680px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className={`text-[0.66rem] font-extrabold tracking-[0.22em] uppercase mb-[18px] flex items-center gap-[10px] ${slides[currentSlide].tagColor}`}
            >
              <span className="w-[26px] h-[1px] bg-current" />
              {slides[currentSlide].tag}
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
              {slides[currentSlide].title}
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[1rem] leading-[1.78] text-w/70 max-w-[500px] mb-9"
            >
              {slides[currentSlide].body}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-11 left-10 md:left-20 z-30 flex">
        <button onClick={prevSlide} className="w-[46px] h-[46px] bg-navy/60 border border-b text-g flex items-center justify-center hover:bg-eldim hover:text-el hover:border-el transition-all backdrop-blur-md cursor-none">←</button>
        <button onClick={nextSlide} className="w-[46px] h-[46px] bg-navy/60 border border-b text-g flex items-center justify-center hover:bg-eldim hover:text-el hover:border-el transition-all backdrop-blur-md cursor-none">→</button>
      </div>

      {/* Progress Line */}
      <motion.div 
        key={`prog-${currentSlide}`}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 6, ease: "linear" }}
        className="absolute bottom-0 left-0 h-[2px] bg-el shadow-[0_0_12px_var(--el)] z-30"
      />
    </div>
  );
}