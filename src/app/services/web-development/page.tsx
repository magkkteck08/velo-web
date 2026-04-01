"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CTA from "../../../components/sections/CTA";

export default function WebDevPage() {
  return (
    <div className="min-h-screen bg-navy pt-[120px]">
      <div className="px-7 lg:px-20 pb-[80px] max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          
          <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-el mb-[14px] flex items-center gap-[10px]">
            <span className="w-[22px] h-[1px] bg-current" /> Engineering
          </div>
          <h1 className="font-bebas text-[clamp(4rem,8vw,7rem)] leading-[0.9] tracking-[0.02em] mb-6">
            WEB <span className="text-el">DEVELOPMENT</span>
          </h1>
          <p className="text-[1.1rem] leading-[1.8] text-g max-w-[700px] mb-10">
            We don't just build websites; we engineer scalable digital platforms. From high-converting landing pages to complex Python-powered SaaS applications, VELO writes production-grade code that performs globally.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/services#contact" className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-el px-[30px] py-[13px] no-underline cursor-none transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_10px_40px_rgba(0,212,255,0.2)]">
              Request a Quote →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--color-b)] border border-[var(--color-b)] mb-16">
            {[
              { title: "Frontend Architecture", desc: "Lightning-fast, SEO-optimized user interfaces built with React, Next.js, and Tailwind CSS." },
              { title: "Backend Systems", desc: "Robust, secure data processing and APIs engineered in Python using FastAPI and PostgreSQL." },
              { title: "SaaS Development", desc: "End-to-end product development. Authentication, database modeling, and payment integration." },
              { title: "E-Commerce", desc: "Custom storefronts designed for high conversion, fully integrated with Paystack." },
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