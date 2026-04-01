"use client";

import { useState } from "react";
import CTA from "../../components/sections/CTA";

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const jobs = [
    { title: "Senior Frontend Developer", dept: "ENGINEERING", type: "Remote · Full Time" },
    { title: "Backend Engineer (Python / FastAPI)", dept: "ENGINEERING", type: "Remote · Full Time" },
    { title: "Game Developer — Football Simulation", dept: "GAMING", type: "Remote · Contract" },
    { title: "Product Designer (UI/UX)", dept: "DESIGN", type: "Remote · Full Time" }
  ];

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      portfolio: formData.get("portfolio"),
      message: formData.get("message"),
      _subject: `New VELO Application: ${selectedJob}`
    };

    try {
      const res = await fetch("https://formsubmit.co/ajax/magkk.muizomoyele@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        setFormStatus("success");
        setTimeout(() => {
          setSelectedJob(null);
          setFormStatus("idle");
        }, 2000); // Closes automatically after success
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#020509] pt-[120px] text-w">
      <div className="px-7 lg:px-20 max-w-[1200px] mx-auto pb-[100px]">
        
        <div className="mb-16">
          <h1 className="font-bebas text-[5rem] leading-none text-el tracking-widest">POSITIONS</h1>
          <p className="text-g mt-4 max-w-[500px] leading-relaxed text-[0.9rem]">
            Hiring across engineering, design, gaming, and marketing.<br/>
            Remote-first. Build something real.
          </p>
        </div>

        <div className="border-t border-[var(--color-b)]">
          {jobs.map((job, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedJob(job.title)}
              className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-[var(--color-b)] hover:bg-navy2 cursor-pointer transition-colors group"
            >
              <h3 className="font-bold text-lg text-w group-hover:text-el transition-colors">{job.title}</h3>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-el border border-el px-3 py-1">{job.dept}</span>
                <span className="text-[0.7rem] text-g tracking-widest uppercase">{job.type}</span>
                <span className="text-g group-hover:text-w transition-colors">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CTA />

      {/* --- SEAMLESS APPLICATION MODAL --- */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-[#020509]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-navy border border-el p-8 max-w-[500px] w-full max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(0,229,255,0.1)]">
            <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-6 text-g hover:text-red-500 font-bold text-xl transition-colors">✕</button>
            
            <h2 className="font-bebas text-3xl mb-1 text-w tracking-widest">APPLY NOW</h2>
            <p className="text-el text-[0.75rem] uppercase tracking-[0.2em] mb-8 font-bold">{selectedJob}</p>
            
            {formStatus === "success" ? (
              <div className="text-center py-12 border border-lime/30 bg-lime/5">
                <div className="text-lime text-4xl mb-4">✓</div>
                <h3 className="font-bebas text-2xl text-w tracking-widest mb-2">APPLICATION SENT</h3>
                <p className="text-g text-[0.8rem]">Our team will review your details soon.</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-g mb-2">Full Name</label>
                  <input type="text" name="name" required className="w-full bg-[#010812] border border-[var(--color-b)] p-3 text-w focus:border-el outline-none transition-colors" />
                </div>
                
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-g mb-2">Email Address</label>
                  <input type="email" name="email" required className="w-full bg-[#010812] border border-[var(--color-b)] p-3 text-w focus:border-el outline-none transition-colors" />
                </div>
                
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-g mb-2">Portfolio / LinkedIn URL</label>
                  <input type="url" name="portfolio" required className="w-full bg-[#010812] border border-[var(--color-b)] p-3 text-w focus:border-el outline-none transition-colors" />
                </div>
                
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-g mb-2">Why VELO?</label>
                  <textarea name="message" required rows={2} className="w-full bg-[#010812] border border-[var(--color-b)] p-3 text-w focus:border-el outline-none transition-colors resize-none"></textarea>
                </div>
                
                <button type="submit" disabled={formStatus === "loading"} className="bg-el text-navy font-extrabold uppercase tracking-[0.2em] py-4 mt-2 hover:bg-w transition-all disabled:opacity-50">
                  {formStatus === "loading" ? "SENDING..." : "SEND APPLICATION"}
                </button>
                {formStatus === "error" && <p className="text-red-500 text-[0.7rem] text-center mt-2">Error sending application. Please try again.</p>}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}