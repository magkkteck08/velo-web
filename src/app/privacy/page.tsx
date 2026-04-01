"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPage() {
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
            PRIVACY <span className="text-w">POLICY</span>
          </h1>
          <p className="text-[0.85rem] text-g mb-12 border-b border-[var(--color-b)] pb-6">
            Last Updated: {lastUpdated}
          </p>

          {/* Content */}
          <div className="text-w text-[0.95rem] leading-[1.8] flex flex-col gap-10">
            
            <section>
              <h2 className="font-bebas text-2xl tracking-[0.05em] mb-3 text-el">1. Introduction</h2>
              <p className="text-g">
                Welcome to VELO. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our software applications, including Receipta, CatalogPal, and VELO FM.
              </p>
            </section>

            <section>
              <h2 className="font-bebas text-2xl tracking-[0.05em] mb-3 text-el">2. Data We Collect</h2>
              <p className="text-g mb-3">We may collect information about you in a variety of ways. The information we may collect includes:</p>
              <ul className="list-disc pl-5 text-g flex flex-col gap-2">
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when registering for our SaaS products.</li>
                <li><strong>Financial Data:</strong> Data related to your payment method (e.g., valid credit card number, card brand, expiration date) processed securely by our payment gateways (e.g., Paystack). We do not store full credit card details on our servers.</li>
                <li><strong>Business Data:</strong> Information regarding your inventory, customer lists, and sales volumes entered into platforms like Receipta and CatalogPal.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bebas text-2xl tracking-[0.05em] mb-3 text-el">3. How We Use Your Information</h2>
              <p className="text-g mb-3">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
              <ul className="list-disc pl-5 text-g flex flex-col gap-2">
                <li>Create and manage your account.</li>
                <li>Process transactions and send related information, including transaction confirmations and digital receipts.</li>
                <li>Improve our software applications and website performance.</li>
                <li>Respond to customer service requests and provide technical support.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-bebas text-2xl tracking-[0.05em] mb-3 text-el">4. Data Security</h2>
              <p className="text-g">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>
            </section>

            <section>
              <h2 className="font-bebas text-2xl tracking-[0.05em] mb-3 text-el">5. Contact Us</h2>
              <p className="text-g">
                If you have questions or comments about this Privacy Policy, please contact us at: <br/>
                <Link href="mailto:magkk.muizomoyele@gmail.com" className="text-el hover:underline">magkk.muizomoyele@gmail.com</Link>
              </p>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}