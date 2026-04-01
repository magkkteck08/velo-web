"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// --- MASTER NAVIGATION DATA ---
const navItems = [
  {
    title: "Fintech",
    href: "/#fintech", 
    dropdown: [
      { icon: "🧾", title: "Receipta", desc: "Receipt SaaS · Live Now", href: "/fintech/receipta" },
      { icon: "📦", title: "CatalogPal", desc: "Custom Domain Storefront", href: "/fintech/catalogpal" },
      { icon: "🎵", title: "VELO Audio", desc: "Audio Platform · In Dev", href: "/fintech/audio" },
      { divider: true },
      { icon: "→", title: "All Products", desc: "See the full lineup", href: "/fintech" },
    ],
  },
  {
    title: "The Game",
    href: "/game", 
    dropdown: [
      { icon: "⚽", title: "VELO FM", desc: "Football Manager Sim", href: "/game" },
      { icon: "🗺", title: "Version Roadmap", desc: "v1 → v2 → v3", href: "/game/roadmap" },
      { icon: "🎮", title: "Early Access", desc: "Join the waitlist", href: "/game#early-access" },
    ],
  },
  {
    title: "Company",
    href: "/company", 
    dropdown: [
      { icon: "🏢", title: "About VELO", desc: "Who we are", href: "/company" },
      { icon: "🎯", title: "Mission & Vision", desc: "What drives us", href: "/company#mission" },
      { icon: "👤", title: "The Founder", desc: "Behind the brand", href: "/company#founder" },
    ],
  },
  {
    title: "Careers",
    href: "/careers", 
    dropdown: [
      { icon: "💼", title: "Open Positions", desc: "6 roles available now", href: "/careers" },
      { icon: "🌍", title: "Remote First", desc: "Work from anywhere", href: "/careers/remote" }, 
      { icon: "🚀", title: "Apply Now", desc: "Submit your resume", href: "/careers" }, // Pointing directly to the page with the modal
    ],
  },
  {
    title: "Services",
    href: "/services", 
    dropdown: [
      { icon: "🖥", title: "Web Development", desc: "Sites, apps, SaaS", href: "/services/web-development" },
      { icon: "🎨", title: "UI/UX Design", desc: "Premium interfaces", href: "/services/ui-ux" },
      { icon: "✉️", title: "Start a Project", desc: "Send us an inquiry", href: "/services#contact" },
    ],
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle the glassmorphism scroll effect AND Authentication Check
  useEffect(() => {
    // Scroll Logic
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Auth Logic
    const userToken = localStorage.getItem("velo_token");
    if (userToken) {
      setIsLoggedIn(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 lg:px-14 h-[72px] transition-all duration-400 ${
        isScrolled
          ? "bg-[#03080f]/95 border-b border-[var(--color-b)] backdrop-blur-[20px]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Brand Logo */}
      <Link href="/" className="font-bebas text-w text-3xl tracking-[0.12em] no-underline cursor-none">
        VE<em className="text-el not-italic">L</em>O
      </Link>

      {/* Desktop Links */}
      <ul className="hidden lg:flex items-center gap-1 list-none">
        {navItems.map((item, idx) => (
          <li key={idx} className="relative group">
            <Link
              href={item.href}
              className="flex items-center gap-[5px] px-4 py-2 text-[0.76rem] font-extrabold tracking-[0.08em] uppercase text-g transition-colors duration-200 group-hover:text-w cursor-none whitespace-nowrap"
            >
              {item.title}
              <span className="text-[0.5rem] transition-transform duration-250 group-hover:rotate-180">
                ▾
              </span>
            </Link>

            {/* Glassmorphism Dropdown */}
            <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 translate-y-2 bg-[#060e1c]/95 border border-[var(--color-b)] backdrop-blur-[24px] min-w-[240px] p-2 opacity-0 pointer-events-none transition-all duration-250 z-[600] group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 shadow-2xl">
              {item.dropdown.map((dropItem, dropIdx) =>
                dropItem.divider ? (
                  <div key={dropIdx} className="h-[1px] bg-[var(--color-b)] my-[6px]" />
                ) : (
                  <Link
                    key={dropIdx}
                    href={dropItem.href!}
                    className="flex items-center gap-3 p-[10px] px-[14px] text-g text-[0.8rem] font-medium transition-all duration-200 hover:text-w hover:bg-el/10 cursor-none group/link"
                  >
                    <div className="w-7 h-7 bg-eldim border border-[var(--color-b)] flex items-center justify-center text-[0.85rem] shrink-0 transition-colors duration-200 group-hover/link:bg-el/20 group-hover/link:border-el">
                      {dropItem.icon}
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-w font-bold text-[0.78rem]">{dropItem.title}</span>
                      <span className="text-[0.62rem] text-g tracking-[0.04em]">{dropItem.desc}</span>
                    </div>
                  </Link>
                )
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* SMART CTA BUTTON: Changes based on Login State */}
      {isLoggedIn ? (
        <Link
          href="/dashboard"
          className="text-[0.74rem] font-extrabold tracking-[0.12em] uppercase text-navy bg-lime px-[26px] py-[10px] border-none transition-all duration-200 hover:bg-w hover:-translate-y-[1px] whitespace-nowrap cursor-none shadow-[0_0_15px_rgba(163,230,53,0.3)]"
        >
          Dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className="text-[0.74rem] font-extrabold tracking-[0.12em] uppercase text-navy bg-el px-[26px] py-[10px] border-none transition-all duration-200 hover:bg-lime hover:-translate-y-[1px] whitespace-nowrap cursor-none"
        >
          Join VELO
        </Link>
      )}
    </nav>
  );
}