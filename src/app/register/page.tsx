"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(form);
    const password = formData.get("Password") as string;
    const confirmPassword = formData.get("ConfirmPassword") as string;

    // Basic frontend validation
    if (password !== confirmPassword) {
      setStatus("error");
      setErrorMessage("Passwords do not match.");
      return;
    }

    const payload = {
      company_name: formData.get("CompanyName"),
      email: formData.get("Email"),
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.detail || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setStatus("error");
      setErrorMessage("Failed to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020509] pt-[120px] pb-[100px] flex items-center justify-center relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-el/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="px-7 w-full max-w-[500px] relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          
          <div className="text-center mb-10">
            <Link href="/" className="font-bebas text-w text-4xl tracking-[0.12em] no-underline cursor-none inline-block mb-6">
              VE<em className="text-el not-italic">L</em>O
            </Link>
            <h1 className="font-bebas text-[2.5rem] leading-none text-w tracking-[0.02em] mb-3">
              CREATE <span className="text-el">ACCOUNT</span>
            </h1>
            <p className="text-[0.85rem] text-g">
              Join VELO to access Receipta and CatalogPal.
            </p>
          </div>

          {status === "success" ? (
            <div className="bg-navy border border-el p-8 text-center">
              <div className="w-16 h-16 bg-el/10 text-el flex items-center justify-center rounded-full mx-auto mb-4 text-2xl border border-el">✓</div>
              <h2 className="font-bebas text-2xl text-w mb-2">ACCOUNT SECURED</h2>
              <p className="text-[0.85rem] text-g mb-6">Your business profile has been created successfully.</p>
              <Link href="/dashboard" className="inline-block text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-el px-[30px] py-[13px] hover:bg-w transition-colors">
                Enter Dashboard →
              </Link>
            </div>
          ) : (
            <div className="bg-navy border border-[var(--color-b)] p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-g">Company / Business Name</label>
                  <input type="text" name="CompanyName" required disabled={status === "loading"} className="bg-navy3 border border-[var(--color-b)] p-3 text-[0.85rem] text-w focus:outline-none focus:border-el transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-g">Work Email</label>
                  <input type="email" name="Email" required disabled={status === "loading"} className="bg-navy3 border border-[var(--color-b)] p-3 text-[0.85rem] text-w focus:outline-none focus:border-el transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-g">Password</label>
                  <input type="password" name="Password" required minLength={6} disabled={status === "loading"} className="bg-navy3 border border-[var(--color-b)] p-3 text-[0.85rem] text-w focus:outline-none focus:border-el transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-g">Confirm Password</label>
                  <input type="password" name="ConfirmPassword" required minLength={6} disabled={status === "loading"} className="bg-navy3 border border-[var(--color-b)] p-3 text-[0.85rem] text-w focus:outline-none focus:border-el transition-colors" />
                </div>

                {status === "error" && (
                  <div className="text-[0.75rem] text-red-400 bg-red-400/10 p-3 border border-red-400/20">
                    {errorMessage}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="mt-4 w-full flex justify-center items-center gap-[8px] text-[0.76rem] font-extrabold tracking-[0.1em] uppercase text-navy bg-el px-[36px] py-[14px] hover:bg-w transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Creating Account..." : "Register Business →"}
                </button>

              </form>

              <div className="mt-6 text-center text-[0.75rem] text-g pt-6 border-t border-[var(--color-b)]">
                Already have an account? <Link href="#" className="text-el hover:underline">Log in</Link>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}