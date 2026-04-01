"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  { num: "01", title: "Landing Page", desc: "High-converting premium pages that make your brand look like it has a ₦500M budget.", price: "From ₦80K" },
  { num: "02", title: "SaaS Web App", desc: "Full-stack applications on Next.js and FastAPI/Python. Concept to deployment, ready to scale.", price: "From ₦300K" },
  { num: "03", title: "Brand Website", desc: "Multi-page company sites with CMS, animations, and production design. Built to grow.", price: "From ₦150K" },
  { num: "04", title: "E-Commerce", desc: "Full stores with Paystack, inventory management, and admin dashboards built for Africa.", price: "From ₦200K" },
];

export default function Services() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 1. Grab the form BEFORE we pause for the server
    const form = e.currentTarget; 
    
    setStatus("loading");

    const formData = new FormData(form);
    const payload = {
      name: formData.get("Name"),
      project_type: formData.get("ProjectType"),
      budget: formData.get("Budget") || "Not specified",
      details: formData.get("Details")
    };

    try {
      // 2. We use 127.0.0.1 to avoid Windows IPv6 localhost routing issues
      const response = await fetch("http://127.0.0.1:8000/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        form.reset(); // 3. Use our saved form variable to clear the inputs
        setTimeout(() => setStatus("idle"), 5000); 
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Failed to submit:", error);
      setStatus("error");
    }
  };

  return (
    <section id="services" className="bg-navy overflow-hidden">
      <div className="px-7 lg:px-20 py-[120px] max-w-[1600px] mx-auto">
        
        {/* Top Section: Intro & Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start mb-24">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
            <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-el mb-[14px] flex items-center gap-[10px]">
              <span className="w-[22px] h-[1px] bg-current" /> Work With Us
            </div>
            <h2 className="font-bebas text-[clamp(3rem,5vw,5.5rem)] leading-[0.92] tracking-[0.02em] mb-5">
              WEB DEV<br />SERVICES
            </h2>
            <p className="text-[0.96rem] leading-[1.8] text-g max-w-[540px] mb-7">
              Beyond our own products, VELO takes on select web development projects. Landing pages, web apps, full SaaS — built right.
            </p>

            <div className="mb-6 flex flex-col gap-[10px]">
              {[
                { title: "Next.js & React", desc: "Production-grade code, every time" },
                { title: "Python & FastAPI", desc: "Scalable backend architecture" },
                { title: "Vercel Deployment", desc: "Fast, global, zero downtime" },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-[14px] items-start p-[16px_18px] bg-navy3 border border-[var(--color-b)]">
                  <div className="w-9 h-9 bg-eldim border border-[var(--color-b)] flex items-center justify-center text-[1rem] shrink-0 text-el">✓</div>
                  <div>
                    <div className="text-[0.82rem] font-bold text-w mb-[3px]">{item.title}</div>
                    <div className="text-[0.72rem] text-g leading-[1.5]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--color-b)] border border-[var(--color-b)]">
            {services.map((svc, idx) => (
              <div key={idx} className="bg-navy2 p-[34px_30px] transition-colors duration-250 hover:bg-navy3 relative overflow-hidden group cursor-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-eldim)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                <div className="font-bebas text-[2.7rem] text-el/10 leading-none mb-3 tracking-[0.05em] relative z-10">{svc.num}</div>
                <div className="text-[0.92rem] font-extrabold text-w mb-[9px] relative z-10">{svc.title}</div>
                <p className="text-[0.76rem] text-g leading-[1.65] mb-4 relative z-10">{svc.desc}</p>
                <div className="font-bebas text-[1.5rem] text-el tracking-[0.05em] relative z-10">{svc.price}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Project Inquiry Form - NOW CONNECTED TO PYTHON */}
        <motion.div 
          id="contact" 
          className="bg-navy3 p-8 lg:p-14 border border-[var(--color-b)] max-w-[900px] mx-auto relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-el/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h3 className="font-bebas text-[3rem] text-w mb-2 leading-none">START A PROJECT</h3>
            <p className="text-[0.9rem] text-g mb-10 max-w-[500px]">Fill out the details below to request a quote. Our engineering team will review your requirements and get back to you within 24 hours.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-g">Your Name / Company</label>
                  <input type="text" name="Name" required disabled={status === "loading"} className="bg-navy border border-[var(--color-b)] p-3 text-[0.85rem] text-w focus:outline-none focus:border-el transition-colors disabled:opacity-50" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-g">Project Type</label>
                  <select name="ProjectType" disabled={status === "loading"} className="bg-navy border border-[var(--color-b)] p-3 text-[0.85rem] text-w focus:outline-none focus:border-el transition-colors appearance-none cursor-none disabled:opacity-50">
                    <option value="Landing Page">Landing Page</option>
                    <option value="SaaS Web App">SaaS Web App</option>
                    <option value="Brand Website">Brand Website</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Other">Other / Custom</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-g">Estimated Budget (₦)</label>
                <input type="text" name="Budget" placeholder="e.g. ₦300K - ₦500K" disabled={status === "loading"} className="bg-navy border border-[var(--color-b)] p-3 text-[0.85rem] text-w focus:outline-none focus:border-el transition-colors disabled:opacity-50" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-g">Project Details</label>
                <textarea name="Details" placeholder="Tell us about the features, timeline, and goals..." rows={5} required disabled={status === "loading"} className="bg-navy border border-[var(--color-b)] p-3 text-[0.85rem] text-w focus:outline-none focus:border-el transition-colors resize-none disabled:opacity-50" />
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <button 
                  type="submit" 
                  disabled={status === "loading" || status === "success"}
                  className="inline-flex items-center justify-center min-w-[180px] gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-el px-[36px] py-[14px] border-none cursor-none transition-all duration-200 hover:bg-lime hover:-translate-y-[2px] disabled:bg-g disabled:translate-y-0 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending..." : status === "success" ? "Sent! ✓" : "Submit Inquiry →"}
                </button>
                
                {status === "error" && (
                  <span className="text-[0.8rem] text-red-500 font-bold">Failed to connect to server.</span>
                )}
              </div>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}