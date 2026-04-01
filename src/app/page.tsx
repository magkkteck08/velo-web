import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Fintech from "../components/sections/Fintech";
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Fintech />
      <CTA />
    </div>
  );
}