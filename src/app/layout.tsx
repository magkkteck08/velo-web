import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import CustomCursor from "../components/ui/CustomCursor";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer"; // NEW IMPORT

const bebas = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-bebas'
});

export const metadata: Metadata = {
  title: "VELO — Built for the Future",
  description: "A technology company at the intersection of financial software and interactive gaming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@900,800,700,500,400,300&display=swap" rel="stylesheet" />
      </head>
      <body className={`${bebas.variable} antialiased selection:bg-el selection:text-navy`}>
        <CustomCursor />
        <Navbar /> 
        <main>{children}</main>
        {/* Mount Footer globally below main */}
        <Footer /> 
      </body>
    </html>
  );
}