import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020509] border-t border-[var(--color-b)] pt-16 lg:pt-20 px-7 lg:px-20 pb-10">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-14 mb-14">
          
          {/* Brand Column */}
          <div>
            <Link href="/" className="font-bebas text-w text-3xl tracking-[0.12em] no-underline cursor-none block mb-[14px]">
              VE<em className="text-el not-italic">L</em>O
            </Link>
            <p className="text-[0.78rem] text-g leading-[1.7] max-w-[230px]">
              A technology company building fintech software and interactive gaming experiences. Founded in Africa. Built for the world.
            </p>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-[0.62rem] font-extrabold tracking-[0.18em] uppercase text-w mb-[14px]">Products</h4>
            <ul className="list-none flex flex-col gap-[9px] p-0 m-0">
              <li><Link href="/fintech/receipta" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">Receipta</Link></li>
              <li><Link href="/fintech/catalogpal" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">CatalogPal</Link></li>
              <li><Link href="/fintech/audio" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">VELO Audio</Link></li>
              <li><Link href="/game" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">VELO FM</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-[0.62rem] font-extrabold tracking-[0.18em] uppercase text-w mb-[14px]">Company</h4>
            <ul className="list-none flex flex-col gap-[9px] p-0 m-0">
              <li><Link href="/company" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">About Us</Link></li>
              <li><Link href="/company#mission" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">Mission & Vision</Link></li>
              <li><Link href="/game/roadmap" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">Game Roadmap</Link></li>
              <li><Link href="/careers" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">Careers</Link></li>
            </ul>
          </div>

          {/* Work With Us Column */}
          <div>
            <h4 className="text-[0.62rem] font-extrabold tracking-[0.18em] uppercase text-w mb-[14px]">Work With Us</h4>
            <ul className="list-none flex flex-col gap-[9px] p-0 m-0">
              <li><Link href="/services" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">Web Dev Services</Link></li>
              <li><a href="mailto:magkk.muizomoyele@gmail.com" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">magkk.muizomoyele@gmail.com</a></li>
              <li><a href="https://x.com/IdanMagkk" target="_blank" rel="noreferrer" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">𝕏 Twitter / X</a></li>
              <li><a href="https://instagram.com/magkk_tigrr8" target="_blank" rel="noreferrer" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">Instagram</a></li>
              <li><a href="https://github.com/magkkteck08" target="_blank" rel="noreferrer" className="text-[0.78rem] text-g no-underline cursor-none transition-colors duration-200 hover:text-el">GitHub</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar (Legal & Copyright) */}
        <div className="border-t border-[var(--color-b)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.7rem] text-g">
          <p>© {currentYear} VELO. All rights reserved. Built by <em className="text-el not-italic font-bold">Muiz Omoyele</em>.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-w transition-colors cursor-none">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-w transition-colors cursor-none">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}