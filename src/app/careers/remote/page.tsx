"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CTA from "../../../components/sections/CTA";

export default function RemotePage() {
  return (
    <div className="min-h-screen bg-navy pt-[120px]">
      <div className="px-7 lg:px-20 pb-[80px] max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          
          <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-el mb-[14px] flex items-center gap-[10px]">
            <span className="w-[22px] h-[1px] bg-current" /> Work Culture
          </div>
          <h1 className="font-bebas text-[clamp(4rem,8vw,7rem)] leading-[0.9] tracking-[0.02em] mb-6">
            REMOTE <span className="text-el">FIRST</span>
          </h1>
          <p className="text-[1.1rem] leading-[1.8] text-g max-w-[700px] mb-16">
            VELO is built on a distributed architecture, and our team operates exactly the same way. We don't care where you sit; we care about the code you write, the designs you craft, and the products you ship. 
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-navy3 border border-[var(--color-b)] p-8 lg:p-12 mb-16">
            <div>
              <h3 className="font-bebas text-3xl text-w mb-4">GLOBAL TALENT, NO BORDERS</h3>
              <p className="text-[0.9rem] text-g leading-[1.7] mb-6">
                We hire top engineering and design talent across Africa and the world, providing the flexibility to do your best work without the daily commute. Our async-first communication style means you can manage your own hours.
              </p>
              <ul className="flex flex-col gap-3 text-[0.85rem] text-w">
                <li className="flex items-center gap-3"><span className="text-el">✓</span> Flexible Hours (Async-first)</li>
                <li className="flex items-center gap-3"><span className="text-el">✓</span> Home Office Equipment Stipend</li>
                <li className="flex items-center gap-3"><span className="text-el">✓</span> Annual Team Retreats</li>
                <li className="flex items-center gap-3"><span className="text-el">✓</span> Performance Bonuses based on shipped features</li>
              </ul>
            </div>
            <div className="h-full min-h-[300px] bg-cover bg-center border border-[var(--color-b)]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80')" }} />
          </div>

          <Link href="/careers/apply" className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-el px-[30px] py-[13px] no-underline cursor-none transition-all duration-250 hover:-translate-y-[2px]">
            View Open Roles & Apply →
          </Link>

        </motion.div>
      </div>
      <CTA />
    </div>
  );
}