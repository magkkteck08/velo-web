"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section id="cta" className="bg-navy3 border-t border-[var(--color-b)] text-center py-[100px] lg:py-[120px] px-7 lg:px-20 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_50%_50%,rgba(0,212,255,0.05),transparent)] pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-[800px] mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-bebas text-[clamp(3.5rem,7vw,8rem)] leading-[0.92] tracking-[0.02em] mb-5">
          READY TO BUILD<br />WITH <span className="text-el">VELO?</span>
        </h2>
        <p className="text-[0.98rem] text-g mb-10 max-w-[500px] mx-auto">
          Invest. Partner. Hire. Or just follow the journey. VELO is moving.
        </p>

        <div className="flex flex-wrap justify-center gap-[14px]">
          <Link href="mailto:hello@velobuilds.com" className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-el px-[30px] py-[13px] no-underline cursor-none transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_10px_40px_rgba(0,212,255,0.3)] relative overflow-hidden group">
            <span className="absolute inset-0 bg-lime -translate-x-full transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-x-0" />
            <span className="relative z-10">Get in Touch</span>
          </Link>
          <Link href="#careers" className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-el bg-transparent border border-[var(--color-elglow)] px-[30px] py-[12px] no-underline cursor-none transition-all duration-200 hover:border-el hover:bg-eldim hover:-translate-y-[2px]">
            View Open Roles
          </Link>
        </div>
      </motion.div>
    </section>
  );
}