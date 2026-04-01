"use client";

import { useState } from "react";
import Link from "next/link";
import About from "../../components/sections/About";
import Mission from "../../components/sections/Mission";
import CTA from "../../components/sections/CTA";

export default function CompanyPage() {
  const [showContact, setShowContact] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      _subject: "New Direct Inquiry from VELO Website"
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
          setShowContact(false);
          setFormStatus("idle");
        }, 2000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#020509] pt-[72px] text-w">
      
      <div id="about"><About /></div>
      <div id="mission"><Mission /></div>

      {/* THE UPDATED FOUNDER SECTION */}
      <div id="founder" className="px-7 lg:px-20 max-w-[1200px] mx-auto py-20 border-t border-[var(--color-b)]">
         <div className="flex items-center gap-4 mb-16">
            <div className="w-8 h-[1px] bg-el"></div>
            <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-el">The Person Behind Velo</span>
         </div>
         
         <div className="flex flex-col md:flex-row gap-16 items-start justify-between">
            <div className="bg-[#010812] border border-[var(--color-b)] p-12 text-center w-full md:w-[400px] shadow-[0_0_30px_rgba(0,255,255,0.02)]">
                
                {/* YOUR PHOTO */}
                <div className="w-32 h-32 rounded-full border border-el mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.15)] bg-navy overflow-hidden">
                    <img src="/me.jpg" alt="Muiz Omoyele" className="w-full h-full object-cover" />
                </div>
                
                {/* YOUR NAME */}
                <h2 className="font-bebas text-4xl tracking-widest text-w mb-2">MUIZ OMOYELE</h2>
                <p className="text-el text-[0.65rem] font-bold tracking-[0.2em] uppercase">Founder & Lead Developer</p>
                
                {/* LIVE SOCIAL LINKS */}
                <div className="flex justify-center gap-4 mt-8 pt-8 border-t border-[var(--color-b)]">
                   <a href="https://x.com/IdanMagkk" target="_blank" rel="noreferrer" className="w-8 h-8 border border-[var(--color-b)] flex items-center justify-center text-[0.6rem] text-g hover:text-el hover:border-el transition-all">X</a>
                   <a href="https://instagram.com/magkk_tigrr8" target="_blank" rel="noreferrer" className="w-8 h-8 border border-[var(--color-b)] flex items-center justify-center text-[0.6rem] text-g hover:text-el hover:border-el transition-all">IG</a>
                   <a href="https://github.com/magkkteck08" target="_blank" rel="noreferrer" className="w-8 h-8 border border-[var(--color-b)] flex items-center justify-center text-[0.6rem] text-g hover:text-el hover:border-el transition-all">GH</a>
                </div>
            </div>

            <div className="flex-1 max-w-[650px]">
                <h3 className="font-bebas text-4xl tracking-widest text-w mb-8 leading-snug border-l-2 border-el pl-6">
                    "I'm building VELO the way I wish products were built in Africa — with ambition, precision, and zero shortcuts."
                </h3>
                <p className="text-g text-[0.95rem] leading-relaxed mb-6">
                    VELO was founded by a developer and product owner with a clear vision: build technology that matters and lasts. Starting with Receipta, a practical SaaS for Nigerian vendors, the brand is expanding into business software, audio tools, and a fully-fledged football manager simulation game.
                </p>
                <p className="text-g text-[0.95rem] leading-relaxed mb-12">
                    This is not a startup looking for a quick exit. VELO is a long-term technology company. Every version release, every product launch, every hire is a brick in a much larger structure. The roadmap is years long. The ambition is global. And it has only just begun.
                </p>
                
                <div className="flex flex-wrap gap-4">
                    <button onClick={() => setShowContact(true)} className="bg-el text-navy font-bold uppercase tracking-[0.15em] px-8 py-4 text-[0.75rem] hover:bg-w transition-all">
                        GET IN TOUCH
                    </button>
                    <Link href="/careers" className="border border-[var(--color-b)] text-g font-bold uppercase tracking-[0.15em] px-8 py-4 text-[0.75rem] hover:border-w hover:text-w transition-all">
                        VIEW OPEN ROLES
                    </Link>
                </div>
            </div>
         </div>
      </div>

      <CTA />

      {/* CONTACT MODAL */}
      {showContact && (
        <div className="fixed inset-0 z-50 bg-[#020509]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-navy border border-el p-8 max-w-[500px] w-full max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(0,229,255,0.1)]">
            <button onClick={() => setShowContact(false)} className="absolute top-4 right-6 text-g hover:text-red-500 font-bold text-xl transition-colors">✕</button>
            
            <h2 className="font-bebas text-3xl mb-1 text-w tracking-widest">CONTACT FOUNDER</h2>
            <p className="text-el text-[0.75rem] uppercase tracking-[0.2em] mb-8 font-bold">Direct Inquiry</p>
            
            {formStatus === "success" ? (
              <div className="text-center py-12 border border-lime/30 bg-lime/5">
                <div className="text-lime text-4xl mb-4">✓</div>
                <h3 className="font-bebas text-2xl text-w tracking-widest mb-2">MESSAGE SENT</h3>
                <p className="text-g text-[0.8rem]">I will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-g mb-2">Name / Company</label>
                  <input type="text" name="name" required className="w-full bg-[#010812] border border-[var(--color-b)] p-3 text-w focus:border-el outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-g mb-2">Email Address</label>
                  <input type="email" name="email" required className="w-full bg-[#010812] border border-[var(--color-b)] p-3 text-w focus:border-el outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-g mb-2">Message</label>
                  <textarea name="message" required rows={3} className="w-full bg-[#010812] border border-[var(--color-b)] p-3 text-w focus:border-el outline-none transition-colors resize-none"></textarea>
                </div>
                <button type="submit" disabled={formStatus === "loading"} className="bg-el text-navy font-extrabold uppercase tracking-[0.2em] py-4 mt-2 hover:bg-w transition-all disabled:opacity-50">
                  {formStatus === "loading" ? "SENDING..." : "SEND MESSAGE"}
                </button>
                {formStatus === "error" && <p className="text-red-500 text-[0.7rem] text-center mt-2">Error sending message. Please try again.</p>}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}