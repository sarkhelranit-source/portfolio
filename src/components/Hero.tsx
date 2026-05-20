import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import TextType from '../../components/TextType';
import { useRef, useCallback } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollTo = useCallback((selector: string) => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(selector, true, 'top top');
    } else {
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-zinc-950 z-10 pb-20">

      {/* Main content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center pointer-events-none">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Available for new opportunities
        </motion.div>

        <TextType
          as="h1"
          text="Ranit Sarkhel"
          typingSpeed={100}
          initialDelay={100}
          cursorClassName="text-zinc-500"
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500 mb-6"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
        >
          <button
            onClick={() => scrollTo('#projects')}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-100 text-zinc-950 font-medium hover:bg-zinc-300 transition-all cursor-pointer"
          >
            View Work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-800 transition-all cursor-pointer"
          >
            Contact Me
          </button>
        </motion.div>
      </div>
    </section>
  );
}
