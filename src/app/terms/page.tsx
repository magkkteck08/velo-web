"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "March 30, 2026";

  return (
    <div className="min-h-screen bg-navy pt-[120px] pb-[100px]">
      <div className="px-7 lg:px-20 max-w-[900px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          
          {/* Header */}
          <div className="text-[0.66rem] font-extrabold tracking-[0.22em] uppercase text-g mb-[14px] flex items-center gap-[10px]">
            <span className="w-[22px] h-[1px] bg-current" /> Legal Documentation
          </div>
          <h1 className="font-bebas text-[clamp(3.5rem,7vw,6rem)] leading-[0.9] tracking-[0.02em] mb-6">
            TERMS OF <span className="text-w">SERVICE</span>
          </h1>
          <p className="text-[0.85rem] text-g mb-12 border-b border-[var(--color-b)] pb-6">
            Last Updated: {lastUpdated}
          </p>

          {/* Content */}
          <div className="text-w text-[0.95rem] leading-[1.8] flex flex-col gap-10">
            
            <section>
              <h2 className="font-bebas text-2xl tracking-[0.05em] mb-3 text-lime">1. Agreement to Terms</h2>
              <p className="text-g">
                By accessing or using the software, websites, and services provided by VELO (including but not limited to Receipta, CatalogPal, and VELO FM), you agree to be bound by these Terms of Service. If you do not agree with all of these terms, you are expressly prohibited from using our services and must discontinue use immediately.
              </p>
            </section>

            <section>
              <h2 className="font-bebas text-2xl tracking-[0.05em] mb-3 text-lime">2. Intellectual Property Rights</h2>
              <p className="text-g">
                Unless otherwise indicated, the Site and our Software are our proprietary property. All source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein are owned or controlled by us, and are protected by copyright and trademark laws.
              </p>
            </section>

            <section>
              <h2 className="font-bebas text-2xl tracking-[0.05em] mb-3 text-lime">3. User Representations & Responsibilities</h2>
              <p className="text-g mb-3">By using the VELO platforms, you represent and warrant that:</p>
              <ul className="list-disc pl-5 text-g flex flex-col gap-2">
                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update it as necessary.</li>
                <li>You will not use our platforms for any illegal or unauthorized purpose (including selling counterfeit goods via CatalogPal).</li>
                <li>Your use of the Services will not violate any applicable law or regulation.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bebas text-2xl tracking-[0.05em] mb-3 text-lime">4. Subscriptions and Payments</h2>
              <p className="text-g">
                Certain products, such as Receipta and CatalogPal, may require paid subscriptions. You agree to provide current, complete, and accurate purchase and account information for all purchases made via our platforms. We bill you through an online billing account for purchases. Sales tax will be added to the price of purchases as deemed required by us.
              </p>
            </section>

            <section>
              <h2 className="font-bebas text-2xl tracking-[0.05em] mb-3 text-lime">5. Limitation of Liability</h2>
              <p className="text-g">
                In no event will VELO, or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site or our software.
              </p>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}