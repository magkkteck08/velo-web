"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const roadmap = [
  {
    version: "v1.0",
    title: "THE FOUNDATION",
    status: "In Active Development",
    statusColor: "text-org",
    desc: "The core simulation engine. Establishing the fundamental gameplay loop of managing a squad, setting tactics, and simulating match results based on underlying player attributes.",
    features: [
      "Core Match Engine (Python/FastAPI)",
      "Basic Squad Management & Player Morale",
      "Single League Simulation (Nigeria Pro League)",
      "Text-based Match Commentary"
    ]
  },
  {
    version: "v2.0",
    title: "DEPTH & STRATEGY",
    status: "Planning Phase",
    statusColor: "text-g",
    desc: "Expanding the management experience outside the pitch. Introducing financial constraints, the transfer market, and media interactions.",
    features: [
      "Dynamic Transfer Market & AI Bidding",
      "Club Finances & Board Expectations",
      "Press Conferences & Media Impact",
      "Youth Academy Generation"
    ]
  },
  {
    version: "v3.0",
    title: "WORLD STAGE",
    status: "Future Vision",
    statusColor: "text-g",
    desc: "Global expansion. Transforming VELO FM from a regional simulation into a multi-continent football management powerhouse.",
    features: [
      "Multi-League Global Simulation",
      "International Management (National Teams)",
      "Enhanced 2D Match Viewer",
      "Multiplayer / Leaderboard Integration"
    ]
  }
];

export default function GameRoadmapPage() {
  return (
    <div className="min-h-screen bg-navy pt-[120px] pb-[80px]">
      
      {/* Header */}
      <div className="px-7 lg:px-20 max-w-[1000px] mx-auto mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-org mb-[14px] flex items-center justify-center gap-[10px]">
            <span className="w-[22px] h-[1px] bg-current" /> Engineering Plan
          </div>
          <h1 className="font-bebas text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.9] tracking-[0.02em] mb-6">
            VERSION <span className="text-org">ROADMAP</span>
          </h1>
          <p className="text-[1.1rem] leading-[1.8] text-g max-w-[700px] mx-auto">
            VELO FM is not a simple mobile game; it is a complex data simulation. We are building it deliberately, version by version, ensuring the Python-powered match engine is flawless before scaling globally.
          </p>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="px-7 lg:px-20 max-w-[1000px] mx-auto relative">
        
        {/* The Vertical Line */}
        <div className="absolute left-[35px] lg:left-[50px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-org via-[var(--color-b)] to-transparent" />

        <div className="flex flex-col gap-16">
          {roadmap.map((phase, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative pl-[60px] lg:pl-[100px]"
            >
              {/* Timeline Dot */}
              <div className={`absolute left-[-5px] lg:left-[10px] top-[6px] w-[22px] h-[22px] rounded-full border-4 border-navy bg-navy3 flex items-center justify-center shadow-[0_0_0_2px_var(--color-b)] ${i === 0 ? 'shadow-[0_0_0_2px_var(--color-org)]' : ''}`}>
                {i === 0 && <div className="w-[8px] h-[8px] bg-org rounded-full animate-pulse" />}
              </div>

              {/* Content Card */}
              <div className="bg-navy3 border border-[var(--color-b)] p-8 lg:p-10 transition-colors duration-300 hover:border-org/40">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="font-bebas text-2xl text-org tracking-[0.1em] mb-1">{phase.version}</div>
                    <h2 className="font-bebas text-[2.5rem] text-w leading-none">{phase.title}</h2>
                  </div>
                  <div className={`text-[0.65rem] font-extrabold tracking-[0.1em] uppercase border border-[var(--color-b)] px-3 py-1 bg-navy ${phase.statusColor}`}>
                    {phase.status}
                  </div>
                </div>

                <p className="text-[0.9rem] text-g leading-[1.7] mb-8 max-w-[600px]">
                  {phase.desc}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {phase.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-navy p-3 border border-[var(--color-b)]">
                      <div className="text-org text-[0.8rem] mt-[2px]">✓</div>
                      <div className="text-[0.8rem] text-w">{feat}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-24">
        <Link href="mailto:magkk.muizomoyele@gmail.com?subject=Early Access: VELO FM" className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-org px-[30px] py-[13px] no-underline cursor-none transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_10px_40px_rgba(255,87,34,0.3)] relative overflow-hidden group">
          <span className="absolute inset-0 bg-w -translate-x-full transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-x-0" />
          <span className="relative z-10 group-hover:text-org transition-colors duration-200">Join Early Access Waitlist</span>
        </Link>
      </div>

    </div>
  );
}