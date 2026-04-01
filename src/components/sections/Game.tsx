"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const versions = [
  {
    id: "v1",
    name: "VERSION 1.0 — THE FOUNDATION",
    title: "Core Game Engine",
    desc: "Squad management, match simulation, league tables, player stats, basic management loop.",
  },
  {
    id: "v2",
    name: "VERSION 2.0 — DEPTH & STRATEGY",
    title: "Tactical Intelligence",
    desc: "Advanced tactics engine, transfer market, player morale system, press conferences.",
  },
  {
    id: "v3",
    name: "VERSION 3.0 — WORLD STAGE",
    title: "Global Expansion",
    desc: "Multi-league support, youth academy, international management, enhanced match viewer.",
  },
];

export default function Game() {
  const [activeVersion, setActiveVersion] = useState(0);

  return (
    <section id="game" className="relative bg-gradient-to-b from-[var(--color-navy)] to-[#05101e] overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "linear-gradient(rgba(255,87,34,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,87,34,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      />

      <div className="relative z-20 px-7 lg:px-20 py-[120px] max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
            <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-org mb-[14px] flex items-center gap-[10px]">
              <span className="w-[22px] h-[1px] bg-current" /> Gaming Division
            </div>
            <h2 className="font-bebas text-[clamp(3rem,5vw,5.5rem)] leading-[0.92] tracking-[0.02em] mb-5">
              VELO FOOTBALL<br />MANAGER
            </h2>
            <p className="text-[0.96rem] leading-[1.8] text-g max-w-[540px]">
              A full-scale football manager simulation built from the ground up. Squad management, match engine, tactics, transfers — and it only gets deeper with each version.
            </p>

            <div className="flex flex-col gap-1 mt-10">
              {versions.map((v, idx) => (
                <div 
                  key={v.id}
                  onMouseEnter={() => setActiveVersion(idx)}
                  className={`p-[18px_22px] border-l-[2px] cursor-none transition-all duration-250 ${
                    activeVersion === idx 
                      ? "border-org bg-[rgba(255,87,34,0.06)]" 
                      : "border-transparent hover:border-org/50 hover:bg-[rgba(255,87,34,0.03)]"
                  }`}
                >
                  <div className="font-bebas text-[0.9rem] text-org tracking-[0.1em] mb-1">{v.name}</div>
                  <div className="text-[0.86rem] font-bold text-w mb-[3px]">{v.title}</div>
                  <div className="text-[0.74rem] text-g leading-[1.5]">{v.desc}</div>
                </div>
              ))}
            </div>

            {/* CRITICAL UPDATE: The id="early-access" anchor and the mailto link */}
            <div id="early-access" className="mt-[38px] pt-4">
              <Link 
                href="mailto:magkk.muizomoyele@gmail.com?subject=VELO FM Early Access Waitlist" 
                className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-[var(--color-navy)] bg-org px-[30px] py-[13px] no-underline cursor-none transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_10px_40px_rgba(255,87,34,0.3)] relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-w -translate-x-full transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-org transition-colors duration-200">Get Early Access</span>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="h-[440px] bg-cover bg-center border border-[rgba(255,87,34,0.2)] relative overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80&auto=format')" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#03080f]/45 to-transparent" />
              <div className="absolute top-5 right-5 bg-[rgba(255,87,34,0.15)] border border-[rgba(255,87,34,0.4)] p-[7px_14px] text-[0.6rem] font-extrabold tracking-[0.14em] uppercase text-org backdrop-blur-md">
                ⚽ VELO FM · Season 1
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#03080f]/95 to-transparent p-6">
                <div className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-org mb-[10px]">
                  Lagos FC vs. Kano United · Matchday 12
                </div>
                <div className="flex gap-2">
                  {[
                    { val: "68%", label: "Possession" },
                    { val: "2–1", label: "Score", color: "text-lime" },
                    { val: "14", label: "Shots" },
                    { val: "87", label: "Rating" },
                  ].map((stat, i) => (
                    <div key={i} className="flex-1 bg-[#060e1c]/80 border border-[var(--color-b)] p-[10px] text-center backdrop-blur-md">
                      <div className={`font-bebas text-[1.7rem] leading-none ${stat.color || "text-org"}`}>{stat.val}</div>
                      <div className="text-[0.56rem] font-bold tracking-[0.1em] uppercase text-g mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}