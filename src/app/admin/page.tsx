"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Define the shape of our data
type Inquiry = { id: number; name: string; project_type: string; budget: string; details: string; created_at: string };
type Application = { id: number; name: string; role: string; links: string; message: string; created_at: string };

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"inquiries" | "applications">("inquiries");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from our Python Backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === "inquiries") {
          const res = await fetch("https://velo-backend-ajjw.onrender.com/api/admin/inquiries");
          if (res.ok) setInquiries(await res.json());
        } else {
          const res = await fetch("https://velo-backend-ajjw.onrender.com/api/admin/applications");
          if (res.ok) setApplications(await res.json());
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#020509] pt-[120px] pb-[80px]">
      <div className="px-7 lg:px-20 max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-[var(--color-b)] pb-6">
          <div>
            <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-w mb-[10px] flex items-center gap-[10px]">
              <span className="w-[8px] h-[8px] bg-lime rounded-full animate-pulse" /> Live Database
            </div>
            <h1 className="font-bebas text-[3.5rem] leading-none text-w tracking-[0.02em]">
              COMMAND <span className="text-el">CENTER</span>
            </h1>
          </div>
          <Link href="/" className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-g hover:text-w transition-colors">
            ← Back to Site
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-10">
          <button 
            onClick={() => setActiveTab("inquiries")}
            className={`px-6 py-3 text-[0.75rem] font-extrabold tracking-[0.1em] uppercase transition-all duration-200 border border-[var(--color-b)] ${activeTab === "inquiries" ? "bg-el text-navy border-el" : "bg-navy3 text-g hover:text-w"}`}
          >
            Project Inquiries ({activeTab === "inquiries" ? inquiries.length : '-'})
          </button>
          <button 
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-3 text-[0.75rem] font-extrabold tracking-[0.1em] uppercase transition-all duration-200 border border-[var(--color-b)] ${activeTab === "applications" ? "bg-lime text-navy border-lime" : "bg-navy3 text-g hover:text-w"}`}
          >
            Job Applications ({activeTab === "applications" ? applications.length : '-'})
          </button>
        </div>

        {/* Data Display */}
        {loading ? (
          <div className="text-g text-[0.8rem] font-bold uppercase tracking-[0.1em] py-10">Fetching secure data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Render Inquiries */}
            {activeTab === "inquiries" && inquiries.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-navy border border-[var(--color-b)] p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start border-b border-[var(--color-b)] pb-3">
                  <div>
                    <h3 className="text-w font-bold text-[1.1rem] mb-1">{item.name}</h3>
                    <span className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-el bg-el/10 px-2 py-1">{item.project_type}</span>
                  </div>
                  <span className="text-[0.6rem] text-g">{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold text-g uppercase tracking-[0.1em] mb-1">Budget</div>
                  <div className="text-w font-bebas text-xl tracking-[0.05em]">{item.budget}</div>
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold text-g uppercase tracking-[0.1em] mb-1">Details</div>
                  <p className="text-[0.85rem] text-w leading-[1.6] line-clamp-4">{item.details}</p>
                </div>
              </motion.div>
            ))}

            {/* Render Applications */}
            {activeTab === "applications" && applications.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-navy border border-[var(--color-b)] p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start border-b border-[var(--color-b)] pb-3">
                  <div>
                    <h3 className="text-w font-bold text-[1.1rem] mb-1">{item.name}</h3>
                    <span className="text-[0.65rem] font-extrabold tracking-[0.1em] uppercase text-lime bg-lime/10 px-2 py-1">{item.role}</span>
                  </div>
                  <span className="text-[0.6rem] text-g">{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold text-g uppercase tracking-[0.1em] mb-1">Portfolio / Links</div>
                  <a href={item.links.startsWith('http') ? item.links : `https://${item.links}`} target="_blank" rel="noopener noreferrer" className="text-[0.85rem] text-lime hover:underline break-all">{item.links}</a>
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold text-g uppercase tracking-[0.1em] mb-1">Message</div>
                  <p className="text-[0.85rem] text-w leading-[1.6] line-clamp-4">{item.message}</p>
                </div>
              </motion.div>
            ))}

            {/* Empty States */}
            {activeTab === "inquiries" && inquiries.length === 0 && (
              <div className="col-span-full py-10 text-g text-[0.85rem]">No project inquiries found.</div>
            )}
            {activeTab === "applications" && applications.length === 0 && (
              <div className="col-span-full py-10 text-g text-[0.85rem]">No job applications found.</div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}