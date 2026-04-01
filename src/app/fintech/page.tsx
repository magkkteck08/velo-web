"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const allProducts = [
  {
    status: "Live",
    statusColor: "text-lime",
    title: "Receipta",
    desc: "Digital receipt generator with built-in sales tracking, customer management, and inventory control.",
    link: "/fintech/receipta",
    linkLabel: "View Receipta →",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format"
  },
  {
    status: "Beta",
    statusColor: "text-org",
    title: "CatalogPal",
    desc: "Get a custom domain link to broadcast what you sell. The ultimate digital storefront for vendors.",
    link: "/fintech/catalogpal",
    linkLabel: "View CatalogPal →",
    img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80&auto=format"
  },
  {
    status: "In Development",
    statusColor: "text-el",
    title: "VELO Audio",
    desc: "An upcoming audio platform engineered for creators, producers, and artists.",
    link: "/fintech/audio",
    linkLabel: "View VELO Audio →",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80&auto=format"
  }
];

export default function FintechHub() {
  return (
    <div className="min-h-screen bg-navy pt-[120px] pb-[80px]">
      
      {/* Header */}
      <div className="px-7 lg:px-20 max-w-[1600px] mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-w mb-[14px] flex items-center gap-[10px]">
            <span className="w-[22px] h-[1px] bg-current" /> The VELO Ecosystem
          </div>
          <h1 className="font-bebas text-[clamp(4rem,8vw,7rem)] leading-[0.9] tracking-[0.02em] mb-6">
            ALL <span className="text-el">PRODUCTS</span>
          </h1>
          <p className="text-[1.1rem] leading-[1.8] text-g max-w-[600px]">
            Explore our entire suite of business tools, SaaS platforms, and creative software. Engineered in Africa, built for global scale using Next.js and Python architectures.
          </p>
        </motion.div>
      </div>

      {/* Products Directory Grid */}
      <div className="px-7 lg:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[var(--color-b)] border border-[var(--color-b)]">
          {allProducts.map((prod, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-navy3 group flex flex-col h-full"
            >
              {/* Product Image */}
              <div 
                className="h-[220px] bg-cover bg-center border-b border-[var(--color-b)] relative overflow-hidden"
                style={{ backgroundImage: `url('${prod.img}')` }}
              >
                <div className="absolute inset-0 bg-navy/60 transition-colors duration-300 group-hover:bg-transparent" />
                <div className="absolute top-4 right-4 bg-navy3/90 backdrop-blur-md border border-[var(--color-b)] px-3 py-1 text-[0.6rem] font-extrabold tracking-[0.1em] uppercase">
                  <span className={prod.statusColor}>{prod.status}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-bebas text-3xl text-w mb-3">{prod.title}</h3>
                <p className="text-[0.85rem] text-g leading-[1.6] mb-8 flex-grow">{prod.desc}</p>
                
                <Link 
                  href={prod.link} 
                  className="inline-flex items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-el bg-transparent border border-[var(--color-b)] px-[20px] py-[10px] no-underline cursor-none transition-all duration-200 hover:border-el hover:bg-eldim self-start"
                >
                  {prod.linkLabel}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}