"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Founder() {
  return (
    <section id="founder" className="bg-navy2 overflow-hidden">
      <div className="px-7 lg:px-20 py-[120px] max-w-[1200px] mx-auto">
        
        <motion.div 
          className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-el mb-[56px] flex items-center gap-[10px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-[22px] h-[1px] bg-current" /> The Person Behind VELO
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-20 items-center">
          
          {/* Founder Card */}
          <motion.div 
            className="bg-navy3 border border-[var(--color-b)] p-[38px_30px] text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-[110px] h-[110px] mx-auto mb-[18px] bg-gradient-to-br from-eldim to-transparent border-2 border-el rounded-full flex items-center justify-center font-bebas text-[2.8rem] text-el shadow-[0_0_40px_rgba(0,212,255,0.14)]">
              VF
            </div>
            <div className="font-bebas text-[1.8rem] tracking-[0.08em] text-w mb-1">
              VELO FOUNDER
            </div>
            <div className="text-[0.66rem] font-extrabold tracking-[0.14em] uppercase text-el">
              Founder & Lead Developer
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-[10px] mt-4">
              {["𝕏", "in", "gh"].map((soc, i) => (
                <Link key={i} href="#" className="w-[34px] h-[34px] border border-[var(--color-b)] flex items-center justify-center text-g text-[0.82rem] no-underline cursor-none transition-colors duration-200 hover:border-el hover:text-el">
                  {soc}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Founder Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[1.45rem] font-bold leading-[1.45] text-w mb-5 relative pl-5 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-gradient-to-b before:from-el before:to-transparent">
              "I'm building VELO the way I wish products were built in Africa — with ambition, precision, and zero shortcuts."
            </p>
            <p className="text-[0.88rem] text-g leading-[1.8] mb-7">
              VELO was founded by a developer and product owner with a clear vision: build technology that matters and lasts. Starting with Receipta, a practical SaaS for Nigerian vendors, the brand is expanding into business software, audio tools, and a fully-fledged football manager simulation game.<br /><br />
              This is not a startup looking for a quick exit. VELO is a long-term technology company. Every version release, every product launch, every hire is a brick in a much larger structure. The roadmap is years long. The ambition is global. And it has only just begun.
            </p>
            
            <div className="flex flex-wrap gap-[14px]">
              <Link href="mailto:hello@velobuilds.com" className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-el px-[30px] py-[13px] no-underline cursor-none transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_10px_40px_rgba(0,212,255,0.3)] relative overflow-hidden group">
                <span className="absolute inset-0 bg-lime -translate-x-full transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-x-0" />
                <span className="relative z-10">Get in Touch</span>
              </Link>
              <Link href="#careers" className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-el bg-transparent border border-[var(--color-elglow)] px-[30px] py-[12px] no-underline cursor-none transition-all duration-200 hover:border-el hover:bg-eldim hover:-translate-y-[2px]">
                View Open Roles
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}