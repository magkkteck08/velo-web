"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ReceiptaPage() {
  return (
    <div className="min-h-screen bg-navy pt-[120px] pb-[80px] px-7 lg:px-20 max-w-[1200px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        
        {/* Header */}
        <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-lime mb-[14px] flex items-center gap-[10px]">
          <span className="w-[6px] h-[6px] rounded-full bg-lime shadow-[0_0_8px_var(--color-lime)] animate-pulse" /> Live SaaS
        </div>
        <h1 className="font-bebas text-[clamp(4rem,8vw,7rem)] leading-[0.9] tracking-[0.02em] mb-6">
          RECEIPTA
        </h1>
        <p className="text-[1.1rem] leading-[1.8] text-g max-w-[600px] mb-10">
          The all-in-one digital receipt generator built for modern vendors. Issue receipts, track sales, manage your customers, and control your inventory from a single, beautiful dashboard.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          <Link href="https://receipta-iota.vercel.app" target="_blank" className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-lime px-[30px] py-[13px] no-underline cursor-none transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_10px_40px_rgba(170,255,46,0.2)]">
            Open Receipta ↗
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--color-b)] border border-[var(--color-b)] mb-16">
          {[
            { title: "Digital Receipts", desc: "Generate and send professional, branded receipts instantly to customers." },
            { title: "Sales Tracking", desc: "Monitor revenue, daily sales volume, and overall business performance." },
            { title: "Customer CRM", desc: "Keep a directory of your buyers, track their purchase history, and build loyalty." },
            { title: "Inventory Control", desc: "Never run out of stock unexpectedly. Track every item in real-time." },
          ].map((feat, i) => (
            <div key={i} className="bg-navy3 p-8 transition-colors hover:bg-navy2">
              <h3 className="font-bebas text-2xl text-w mb-2">{feat.title}</h3>
              <p className="text-[0.8rem] text-g leading-[1.6]">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="border-t border-[var(--color-b)] pt-8">
          <h4 className="text-[0.62rem] font-extrabold tracking-[0.18em] uppercase text-w mb-4">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "Supabase", "React", "TypeScript", "Tailwind CSS"].map((tag, i) => (
              <span key={i} className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-lime border border-[var(--color-b)] bg-lime/5 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}