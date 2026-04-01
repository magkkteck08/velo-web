"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

export default function ApplyPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");

    const formData = new FormData(form);
    
    // Package the data to match our FastAPI JobApplication Pydantic model
    const payload = {
      name: formData.get("Name"),
      role: formData.get("Role"),
      links: formData.get("Links"),
      message: formData.get("Message")
    };

    try {
      const response = await fetch("https://velo-backend-ajjw.onrender.com/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        form.reset(); // Clear the form
        setTimeout(() => setStatus("idle"), 5000); // Reset button after 5 seconds
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Failed to submit:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-navy pt-[120px] pb-[80px]">
      <div className="px-7 lg:px-20 max-w-[900px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          
          <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-lime mb-[14px] flex items-center gap-[10px]">
            <span className="w-[22px] h-[1px] bg-current" /> Hiring Portal
          </div>
          <h1 className="font-bebas text-[clamp(4rem,8vw,7rem)] leading-[0.9] tracking-[0.02em] mb-10">
            SUBMIT <span className="text-lime">APPLICATION</span>
          </h1>

          <div className="bg-navy3 p-8 lg:p-14 border border-[var(--color-b)] relative overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-lime/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <p className="text-[0.9rem] text-g mb-10 max-w-[500px]">
                Fill out the details below. This will send your application directly to our secure database for the engineering team to review. Ensure your links to GitHub or your Portfolio are active.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-g">Full Name</label>
                    <input type="text" name="Name" required disabled={status === "loading"} className="bg-navy border border-[var(--color-b)] p-3 text-[0.85rem] text-w focus:outline-none focus:border-lime disabled:opacity-50" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-g">Role Applying For</label>
                    <input type="text" name="Role" required disabled={status === "loading"} className="bg-navy border border-[var(--color-b)] p-3 text-[0.85rem] text-w focus:outline-none focus:border-lime disabled:opacity-50" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-g">Portfolio / GitHub / LinkedIn</label>
                  <input type="url" name="Links" required disabled={status === "loading"} className="bg-navy border border-[var(--color-b)] p-3 text-[0.85rem] text-w focus:outline-none focus:border-lime disabled:opacity-50" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-g">Cover Letter / Message</label>
                  <textarea name="Message" placeholder="Tell us why you belong at VELO and what you want to build..." rows={6} required disabled={status === "loading"} className="bg-navy border border-[var(--color-b)] p-3 text-[0.85rem] text-w focus:outline-none focus:border-lime resize-none disabled:opacity-50" />
                </div>
                
                <div className="flex items-center gap-4 mt-2">
                  <button 
                    type="submit" 
                    disabled={status === "loading" || status === "success"}
                    className="inline-flex items-center justify-center min-w-[180px] gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-lime px-[36px] py-[14px] border-none cursor-none transition-all duration-200 hover:bg-w hover:-translate-y-[2px] disabled:bg-g disabled:translate-y-0 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Sending..." : status === "success" ? "Application Sent! ✓" : "Send Application →"}
                  </button>
                  
                  {status === "error" && (
                    <span className="text-[0.8rem] text-red-500 font-bold">Failed to connect to server.</span>
                  )}
                </div>
              </form>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}