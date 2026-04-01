"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { div } from "three/src/nodes/math/OperatorNode";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name"); // Only used for register

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const res = await fetch("https://velo-backend-ajjw.onrender.com/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          // Save the JWT Token and User Data to localStorage!
          localStorage.setItem("velo_token", data.access_token);
          localStorage.setItem("velo_user", JSON.stringify(data.user));
          
          // Redirect to Dashboard
          router.push("/dashboard");
        } else {
          setError(data.detail || "Login failed");
        }
      } else {
        // --- REGISTER LOGIC ---
        const res = await fetch("https://velo-backend-ajjw.onrender.com/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        if (res.ok) {
          // Successfully registered, auto-switch to login screen
          setIsLogin(true);
          setError("Account created! Please log in.");
        } else {
          const data = await res.json();
          setError(data.detail || "Registration failed");
        }
      }
    } catch (err) {
      setError("Network error. Is the Python server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020509] flex items-center justify-center p-6 relative overflow-hidden text-w">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 backgroundImage-[linear-gradient(rgba(0,229,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"></div>
      
      <div className="bg-navy border border-[var(--color-b)] p-10 w-full max-w-[450px] relative z-10 shadow-[0_0_50px_rgba(0,229,255,0.05)]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="font-bebas text-5xl tracking-[0.12em] text-w block mb-2 hover:text-el transition-colors">
            VE<em className="text-el not-italic">L</em>O
          </Link>
          <p className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-g">
            {isLogin ? "Secure Access Portal" : "Create Developer Account"}
          </p>
        </div>

        {error && (
          <div className={`p-3 mb-6 text-[0.75rem] font-bold tracking-wider uppercase text-center border ${error.includes("created") ? "border-lime text-lime bg-lime/10" : "border-red-500 text-red-500 bg-red-500/10"}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div>
              <label className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-g mb-2">Full Name</label>
              <input type="text" name="name" required className="w-full bg-[#010812] border border-[var(--color-b)] p-3 text-w focus:border-el outline-none transition-colors" />
            </div>
          )}

          <div>
            <label className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-g mb-2">Email Address</label>
            <input type="email" name="email" required className="w-full bg-[#010812] border border-[var(--color-b)] p-3 text-w focus:border-el outline-none transition-colors" />
          </div>

          <div>
            <label className="block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-g mb-2">Password</label>
            <input type="password" name="password" required className="w-full bg-[#010812] border border-[var(--color-b)] p-3 text-w focus:border-el outline-none transition-colors" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-el text-navy font-extrabold uppercase tracking-[0.2em] py-4 mt-2 hover:bg-w transition-all disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Initialize Session" : "Deploy Account"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--color-b)] text-center">
          <p className="text-[0.75rem] text-g">
            {isLogin ? "Don't have an account?" : "Already have clearance?"}{" "}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="text-el font-bold hover:text-w transition-colors uppercase tracking-widest ml-2"
            >
              {isLogin ? "Register" : "Log In"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}