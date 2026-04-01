"use client";

import { motion } from "framer-motion";

const pillars = [
  { icon: "⚡", title: "Fintech Software", desc: "Business tools for African markets — receipts, catalogs, management platforms, and more." },
  { icon: "🎮", title: "Football Manager Game", desc: "A deep simulation game built version by version. Strategy, squad management, full match engine." },
  { icon: "🌍", title: "African-First, World-Class", desc: "Built with the African user in mind. Targeting global quality and international reach." },
  { icon: "🔁", title: "Built to Iterate", desc: "VELO products never stop improving. Every version is better than the last." },
];

export default function About() {
  return (
    <section id="about" className="bg-navy2 relative overflow-hidden">
      <div className="px-7 lg:px-20 py-[120px] max-w-[1600px] mx-auto">
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Image & Badge */}
          <div className="relative h-[280px] lg:h-[520px]">
            <div 
              className="h-full bg-cover bg-center border border-[var(--color-b)] relative overflow-hidden"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#03080f]/40 to-transparent" />
            </div>
            {/* Year Badge */}
            <div className="absolute -bottom-5 -right-5 bg-navy3 border border-[var(--color-b)] p-[24px_26px] z-10">
              <div className="font-bebas text-5xl text-el leading-none">2024</div>
              <div className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-g mt-1">Founded</div>
            </div>
          </div>

          {/* Text & Pillars */}
          <div>
            <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-el mb-[14px] flex items-center gap-[10px]">
              <span className="w-[22px] h-[1px] bg-current" /> Who We Are
            </div>
            <h2 className="font-bebas text-[clamp(3rem,5vw,5.5rem)] leading-[0.92] tracking-[0.02em] mb-5">
              ONE BRAND.<br />MULTIPLE<br />FRONTIERS.
            </h2>
            <p className="text-[0.96rem] leading-[1.8] text-g max-w-[540px]">
              VELO is a founder-led technology company operating across fintech and gaming. We build with precision, ship with purpose, and grow with patience.
            </p>

            {/* Pillars Array */}
            <div className="flex flex-col gap-[14px] mt-9">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex gap-4 items-start p-[18px_20px] bg-navy3 border border-[var(--color-b)] transition-all duration-250 hover:border-el/25 hover:translate-x-[5px]">
                  <div className="w-10 h-10 bg-eldim border border-[var(--color-b)] flex items-center justify-center text-[1.1rem] shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <div className="text-[0.84rem] font-bold text-w mb-[3px]">{pillar.title}</div>
                    <div className="text-[0.73rem] text-g leading-[1.55]">{pillar.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}