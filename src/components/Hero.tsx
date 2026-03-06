import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Grid - subtle indication of 3D space */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Refined Headshot Aura - Round with feathered edges */}
      <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        {/* Subtle radial shadow to help it fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,#09090b_85%)] z-10"></div>
        <img
          src="/headshot.jpg"
          alt="Ranit Sarkhel Aura"
          className="h-[80vh] w-auto max-w-none object-contain grayscale brightness-90 contrast-110 rounded-full [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Available for new opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500 mb-6"
        >
          Ranit <br className="hidden md:block" /> Sarkhel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 font-light"
        >
          Cloud Engineer specializing in AWS, Docker, and Security. Passionate about driving efficiency and innovation in cloud computing and automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-100 text-zinc-950 font-medium hover:bg-zinc-300 transition-all"
          >
            View Work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-800 transition-all"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
