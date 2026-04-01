"use client";

import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section id="mission" className="bg-navy2 overflow-hidden">
      <div className="px-7 lg:px-20 py-[120px] max-w-[1600px] mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-el mb-[48px] flex items-center gap-[10px]"
        >
          <span className="w-[22px] h-[1px] bg-current" /> What Drives Us
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--color-b)] border border-[var(--color-b)]"
        >
          {/* Mission Card */}
          <div className="bg-navy p-[40px] lg:p-[60px] relative overflow-hidden">
            {/* Glowing Top Line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-el shadow-[0_0_18px_var(--color-elglow)]" />
            
            <div className="font-bebas text-[0.82rem] tracking-[0.3em] uppercase text-el mb-[18px]">
              // Mission
            </div>
            <p className="text-[1.28rem] font-bold leading-[1.55] text-w max-w-[440px] mb-[18px]">
              To build world-class software that solves real problems for African businesses and entertains a global audience through immersive gaming experiences.
            </p>
            <p className="text-[0.86rem] text-g leading-[1.78]">
              Every product we ship is a commitment to our users, our market, and our continent. We build things that last — not for the trend cycle, but for the long arc of progress.
            </p>
            
            {/* Watermark */}
            <div className="absolute right-[-10px] bottom-[-20px] font-bebas text-[8rem] text-el/[0.03] leading-none pointer-events-none">
              MISSION
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-navy p-[40px] lg:p-[60px] relative overflow-hidden">
            {/* Glowing Top Line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-lime shadow-[0_0_18px_rgba(170,255,46,0.35)]" />
            
            <div className="font-bebas text-[0.82rem] tracking-[0.3em] uppercase text-lime mb-[18px]">
              // Vision
            </div>
            <p className="text-[1.28rem] font-bold leading-[1.55] text-w max-w-[440px] mb-[18px]">
              To become the most recognised African-founded technology brand at the intersection of fintech and interactive entertainment.
            </p>
            <p className="text-[0.86rem] text-g leading-[1.78]">
              From Version 1 to Version 10. From one app to a full ecosystem. VELO is not a moment — it is a movement. Built deliberately. Scaled intelligently. Sustained forever.
            </p>
            
            {/* Watermark */}
            <div className="absolute right-[-10px] bottom-[-20px] font-bebas text-[8rem] text-lime/[0.03] leading-none pointer-events-none">
              VISION
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}