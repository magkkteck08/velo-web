"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CTA from "../../../components/sections/CTA";

export default function UIUXPage() {
  return (
    <div className="min-h-screen bg-navy pt-[120px]">
      <div className="px-7 lg:px-20 pb-[80px] max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          
          <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-lime mb-[14px] flex items-center gap-[10px]">
            <span className="w-[22px] h-[1px] bg-current" /> Design Lab
          </div>
          <h1 className="font-bebas text-[clamp(4rem,8vw,7rem)] leading-[0.9] tracking-[0.02em] mb-6">
            UI/UX <span className="text-lime">DESIGN</span>
          </h1>
          <p className="text-[1.1rem] leading-[1.8] text-g max-w-[700px] mb-10">
            Great software requires world-class design. We craft intuitive, visually striking interfaces that command attention and drive user retention. From wireframes to fully interactive prototypes.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/services#contact" className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-lime px-[30px] py-[13px] no-underline cursor-none transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_10px_40px_rgba(170,255,46,0.2)]">
              Start Design Project →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--color-b)] border border-[var(--color-b)] mb-16">
            {[
              { title: "User Interface (UI)", desc: "Pixel-perfect visual design. Typography, color theory, and modern layout structures." },
              { title: "User Experience (UX)", desc: "Frictionless user journeys. Information architecture, wireframing, and usability testing." },
              { title: "Interactive Prototyping", desc: "High-fidelity Figma prototypes so you can feel the product before a single line of code is written." },
              { title: "Brand Identity", desc: "Establishing a cohesive visual language that sets your software apart in the market." },
            ].map((feat, i) => (
              <div key={i} className="bg-navy3 p-8 transition-colors hover:bg-navy2">
                <h3 className="font-bebas text-2xl text-w mb-2">{feat.title}</h3>
                <p className="text-[0.8rem] text-g leading-[1.6]">{feat.desc}</p>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
      <CTA />
    </div>
  );
}