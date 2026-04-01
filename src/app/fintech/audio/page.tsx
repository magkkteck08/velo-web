"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AudioPage() {
  return (
    <div className="min-h-screen bg-navy pt-[120px] pb-[80px] px-7 lg:px-20 max-w-[1200px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        
        <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-el mb-[14px] flex items-center gap-[10px]">
          <span className="w-[22px] h-[1px] bg-current" /> In Development
        </div>
        <h1 className="font-bebas text-[clamp(4rem,8vw,7rem)] leading-[0.9] tracking-[0.02em] mb-6">
          VELO AUDIO
        </h1>
        <p className="text-[1.1rem] leading-[1.8] text-g max-w-[600px] mb-10">
          Expanding the VELO ecosystem into creative tools. An upcoming audio platform engineered for creators, producers, and artists, featuring high-fidelity processing and seamless distribution.
        </p>

        <div className="flex flex-wrap gap-4 mb-16">
          <Link href="#waitlist" className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-el px-[30px] py-[13px] no-underline cursor-none transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_10px_40px_rgba(0,212,255,0.2)]">
            Join Waitlist
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--color-b)] border border-[var(--color-b)] mb-16">
          {[
            { title: "Browser-Based Engine", desc: "Lightning-fast audio processing directly in the web browser." },
            { title: "Creator Ecosystem", desc: "Built to integrate seamlessly with the rest of the VELO software suite." },
          ].map((feat, i) => (
            <div key={i} className="bg-navy3 p-8 transition-colors hover:bg-navy2">
              <h3 className="font-bebas text-2xl text-w mb-2">{feat.title}</h3>
              <p className="text-[0.8rem] text-g leading-[1.6]">{feat.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--color-b)] pt-8">
          <h4 className="text-[0.62rem] font-extrabold tracking-[0.18em] uppercase text-w mb-4">Core Architecture</h4>
          <div className="flex flex-wrap gap-2">
            {["Web Audio API", "React", "Python", "FastAPI"].map((tag, i) => (
              <span key={i} className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-el border border-[var(--color-b)] bg-el/5 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}