import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, Github, Twitter, Linkedin, Mail } from 'lucide-react';

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#home" className="text-xl font-display font-bold tracking-tighter text-zinc-100">
          RANIT<span className="text-emerald-500">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-950 text-sm font-medium hover:bg-zinc-300 transition-colors"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-zinc-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800/50 p-6 flex flex-col gap-4 md:hidden"
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
    </motion.nav>
  );
}
