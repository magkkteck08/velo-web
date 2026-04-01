"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    status: "Live — receipta-iota.vercel.app",
    statusColor: "text-lime",
    dotColor: "bg-lime shadow-[0_0_8px_var(--color-lime)]",
    title: "Receipta",
    desc: "Digital receipt generator with built-in sales tracking, customer management, and inventory control.",
    tags: ["Next.js", "Supabase", "React", "TypeScript"],
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format",
    link: "https://receipta-iota.vercel.app",
    linkLabel: "Visit Live App ↗",
  },
  {
    status: "Live — catalogpalzyx.vercel.app",
    statusColor: "text-lime",
    dotColor: "bg-lime shadow-[0_0_8px_var(--color-lime)]",
    title: "CatalogPal",
    desc: "Get a custom domain link to broadcast what you sell. The ultimate digital storefront and catalog for vendors.",
    tags: ["React", "Python", "FastAPI"],
    img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80&auto=format",
    link: "https://catalogpalzyx.vercel.app",
    linkLabel: "Visit Live App ↗",
  },
  {
    status: "In Development",
    statusColor: "text-org",
    dotColor: "hidden",
    title: "VELO Audio",
    desc: "An audio platform bringing creative tools and experiences under the VELO brand ecosystem.",
    tags: ["Web Audio API", "Python", "FastAPI"],
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80&auto=format",
    link: "/fintech/audio",
    linkLabel: "View Details →",
  },
];

const features = [
  { icon: "⚡", title: "African-First Engineering", desc: "Designed around African business — payment rails, connectivity, and real user behaviour." },
  { icon: "🔒", title: "Built to Scale", desc: "From 10 users to 10,000 — VELO software handles growth. Python/FastAPI backend architecture." },
  { icon: "💳", title: "Paystack Native", desc: "Full Paystack integration across all fintech products. Collections, subscriptions, splits." },
  { icon: "📱", title: "Mobile-Ready", desc: "Every interface is responsive by default. Africa is mobile-first and VELO knows that." },
];

export default function Fintech() {
  return (
    <section id="fintech" className="relative bg-navy overflow-hidden">
      {/* Background Watermark Text */}
      <div className="absolute -right-[1%] top-1/2 -translate-y-1/2 font-bebas text-[19vw] text-lime/[0.022] pointer-events-none leading-none z-10 tracking-[-0.02em]">
        FINTECH
      </div>

      <div className="relative z-20 px-7 lg:px-20 py-[120px] max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-10 lg:gap-20 items-start">
          
          {/* Left Column: Header & Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-lime mb-[14px] flex items-center gap-[10px]">
              <span className="w-[22px] h-[1px] bg-current" /> Fintech Division
            </div>
            <h2 className="font-bebas text-[clamp(3rem,5vw,5.5rem)] leading-[0.92] tracking-[0.02em] mb-5">
              VELO<br />PRODUCTS
            </h2>
            <p className="text-[0.96rem] leading-[1.8] text-g max-w-[540px] mb-10">
              A growing suite of business and financial tools built for African markets and designed to global standards, powered by robust Python backends.
            </p>

            {/* Product Cards */}
            <div className="flex flex-col gap-4">
              {products.map((product, idx) => (
                <div key={idx} className="bg-navy3 border border-[var(--color-b)] overflow-hidden transition-all duration-300 hover:border-el hover:translate-x-[6px] group cursor-none">
                  <div 
                    className="h-[175px] bg-cover bg-center relative" 
                    style={{ backgroundImage: `url('${product.img}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy3" />
                  </div>
                  <div className="p-5 lg:p-6">
                    <div className={`text-[0.6rem] font-extrabold tracking-[0.14em] uppercase flex items-center gap-[6px] mb-2 ${product.statusColor}`}>
                      <span className={`w-[6px] h-[6px] rounded-full animate-pulse ${product.dotColor}`} />
                      {product.status}
                    </div>
                    <div className="font-bebas text-[1.65rem] tracking-[0.05em] text-w mb-2">{product.title}</div>
                    <p className="text-[0.78rem] text-g leading-[1.6] mb-3">{product.desc}</p>
                    
                    <div className="flex flex-wrap gap-[5px] mb-3">
                      {product.tags.map((tag, i) => (
                        <span key={i} className="text-[0.56rem] font-bold tracking-[0.1em] uppercase text-el border border-[var(--color-b)] px-2 py-[3px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {product.link && (
                      <Link href={product.link} target="_blank" className="text-[0.68rem] font-extrabold tracking-[0.1em] uppercase text-el no-underline inline-flex items-center gap-[5px] transition-all duration-200 hover:gap-[10px] cursor-none">
                        {product.linkLabel}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Stats & Features (Sticky) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-[100px]"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-[1px] bg-[var(--color-b)] border border-[var(--color-b)] mb-7">
              <div className="bg-navy3 p-[26px_20px]">
                <div className="font-bebas text-[3.2rem] text-lime leading-none tracking-[0.02em]">3+</div>
                <div className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-g mt-1">Live Products</div>
              </div>
              <div className="bg-navy3 p-[26px_20px]">
                <div className="font-bebas text-[3.2rem] text-lime leading-none tracking-[0.02em]">3+</div>
                <div className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-g mt-1">In Pipeline</div>
              </div>
              <div className="bg-navy3 p-[26px_20px]">
                <div className="font-bebas text-[3.2rem] text-lime leading-none tracking-[0.02em]">AFRICA</div>
                <div className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-g mt-1">Market Focus</div>
              </div>
              <div className="bg-navy3 p-[26px_20px]">
                <div className="font-bebas text-[3.2rem] text-lime leading-none tracking-[0.02em]">∞</div>
                <div className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-g mt-1">Roadmap</div>
              </div>
            </div>

            {/* Feature List */}
            <div className="flex flex-col gap-[10px]">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-[14px] p-[16px_18px] bg-navy3 border border-[var(--color-b)] transition-colors duration-250 hover:border-eldim">
                  <div className="w-9 h-9 bg-eldim border border-[var(--color-b)] flex items-center justify-center text-[1rem] shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <div className="text-[0.82rem] font-bold text-w mb-[3px]">{feat.title}</div>
                    <div className="text-[0.72rem] text-g leading-[1.5]">{feat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}