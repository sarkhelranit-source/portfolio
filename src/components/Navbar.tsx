import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import GooeyNav from '../../components/GooeyNav';

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Show navbar instantly on mobile since Spline intro is disabled
    if (window.innerWidth < 1024) {
      setIsVisible(true);
    }

    const handleScroll = () => {
      // Reveal navbar after scrolling down some distance on desktop, always visible on mobile
      if (window.innerWidth >= 1024) {
        setIsVisible(window.scrollY > 100);
      }
      // Change background style after some scroll
      setIsScrolled(window.scrollY > 50);
    };

    // Listen for resize to update visibility if screen changes
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsVisible(true);
      else setIsVisible(window.scrollY > 100);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[90%] max-w-[800px] rounded-xl border ${isScrolled
            ? 'top-4 bg-zinc-950/80 backdrop-blur-md border-zinc-800/50 shadow-lg py-2'
            : 'top-8 bg-zinc-950/40 backdrop-blur-sm border-white/10 py-3'
          }`}
      >
        <div className="flex items-center justify-between w-full px-4 md:px-6 h-[44px]">

          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <a href="#home" className="text-xl font-display font-bold tracking-tighter text-zinc-100">
              RANIT<span className="text-emerald-500">.</span>
            </a>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden md:flex flex-[2] justify-center items-center">
            <GooeyNav
              items={navLinks.map(link => ({ label: link.name, href: link.href }))}
            />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[90px] left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-40 bg-zinc-950/95 backdrop-blur-md border border-zinc-800/50 rounded-xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
