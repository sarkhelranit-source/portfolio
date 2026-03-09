import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import TextType from '../../components/TextType';
import SplitText from '../../components/SplitText';
import FluidGlass from '../../components/FluidGlass';
import { useState, useEffect } from 'react';
import { Image as ThreeImage } from '@react-three/drei';

function HeroBackground3D() {
  return (
    <group>
      <ThreeImage
        url="/headshot.jpg"
        scale={[11, 11]}
        position={[0, 0, 0]}
        transparent
        opacity={0.35}
        grayscale={1}
      />
    </group>
  );
}

export function Hero() {
  const [showGlass, setShowGlass] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      const vh = window.innerHeight;
      // Show glass when scrolled into view, hide when scrolled past completely
      setShowGlass(sy > vh * 0.1 && sy < vh * 1.6);
    };
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-zinc-950 z-10 pb-20">
      {/* Background Grid - subtle indication of 3D space */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-[-1]"></div>

      {/* Refined Headshot Aura - Only show DOM version if glass is NOT active or if on mobile to avoid duplicates */}
      {(!showGlass || !isDesktop) && (
        <div className="absolute inset-0 w-full h-full opacity-35 pointer-events-none z-10 flex items-center justify-center overflow-hidden">
          {/* Stronger radial shadow to help it fade completely at the edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_50%,#09090b_72%)] z-10"></div>
          <img
            src="/headshot.jpg"
            alt="Ranit Sarkhel Aura"
            className="h-[50vh] w-[50vh] md:h-[70vh] md:w-[70vh] max-w-full md:max-w-none object-contain grayscale brightness-90 contrast-110 [mask-image:radial-gradient(circle_at_center,black_55%,transparent_70%)]"
          />
        </div>
      )}


      <div className="absolute inset-0 z-20 pointer-events-auto overflow-hidden">
        {showGlass && isDesktop && (
          <FluidGlass
            mode="lens"
            lensProps={{
              scale: 0.25,
              ior: 1.15,
              thickness: 2,
              transmission: 1,
              roughness: 0,
              chromaticAberration: 0.05,
              anisotropy: 0.01
            }}
          >
            <HeroBackground3D />
          </FluidGlass>
        )}
      </div>

      {/* Main content - Higher z-index than background but lower than or same as FluidGlass if needed. 
          Set pointer-events-none on the wrapper to allow mouse to reach FluidGlass layer below if we needed to,
          but here FluidGlass is z-20 and content is z-30. */}
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
