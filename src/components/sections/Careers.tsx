"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const jobs = [
  { title: "Senior Frontend Developer", dept: "Engineering", type: "Remote · Full Time" },
  { title: "Backend Engineer (Python / FastAPI)", dept: "Engineering", type: "Remote · Full Time" },
  { title: "Game Developer — Football Simulation", dept: "Gaming", type: "Remote · Contract" },
  { title: "Product Designer (UI/UX)", dept: "Design", type: "Remote · Full Time" },
  { title: "Growth & Marketing Lead", dept: "Marketing", type: "Remote · Full Time" },
  { title: "Community Manager — Gaming", dept: "Gaming", type: "Remote · Part Time" },
];

export default function Careers() {
  return (
    <section id="careers" className="bg-navy3">
      {/* Hero Banner for Careers */}
      <div 
        className="w-full h-[280px] bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80&auto=format')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#03080f]/90 via-[#03080f]/60 to-[#03080f]/25" />
        
        <motion.div 
          className="absolute left-7 lg:left-20 top-1/2 -translate-y-1/2 z-10"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-el mb-[10px] flex items-center gap-[10px]">
             <span className="w-[22px] h-[1px] bg-current" /> Join the Team
          </div>
          <h2 className="font-bebas text-[clamp(2.5rem,5vw,5rem)] leading-[0.95]">
            OPEN<br /><span className="text-el">POSITIONS</span>
          </h2>
        </motion.div>
      </div>

      {/* Jobs List */}
      <div className="px-7 lg:px-20 py-[56px] max-w-[1200px] mx-auto">
        
        <motion.div 
          className="flex flex-wrap justify-between items-end gap-[18px] mb-[36px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[0.96rem] leading-[1.8] text-g max-w-[400px]">
            Hiring across engineering, design, gaming, and marketing. Remote-first. Build something real.
          </p>
          <Link href="mailto:careers@velobuilds.com" className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-el px-[30px] py-[13px] no-underline cursor-none transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_10px_40px_rgba(0,212,255,0.3)] relative overflow-hidden group">
            <span className="absolute inset-0 bg-lime -translate-x-full transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-x-0" />
            <span className="relative z-10">Apply Now</span>
          </Link>
        </motion.div>

        {/* The List */}
        <motion.div 
          className="flex flex-col gap-[1px] bg-[var(--color-b)] border border-[var(--color-b)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {jobs.map((job, idx) => (
            <Link 
              key={idx} 
              href="mailto:careers@velobuilds.com"
              className="group bg-navy3 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-[10px] md:gap-[20px] items-center p-[22px_36px] transition-colors duration-200 hover:bg-navy2 cursor-none no-underline"
            >
              <div className="text-[0.92rem] font-bold text-w">{job.title}</div>
              <div className="hidden md:block text-[0.6rem] font-extrabold tracking-[0.12em] uppercase text-el border border-[var(--color-b)] p-[4px_10px] whitespace-nowrap">
                {job.dept}
              </div>
              <div className="hidden md:block text-[0.73rem] text-g whitespace-nowrap">{job.type}</div>
              <div className="text-g text-[1rem] transition-all duration-200 group-hover:text-el group-hover:translate-x-[5px]">
                →
              </div>
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
}