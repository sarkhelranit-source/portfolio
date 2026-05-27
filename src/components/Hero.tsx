import { ArrowRight } from 'lucide-react';
import TextType from '../../components/TextType';
import { useRef, useCallback } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

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

  useGSAP(() => {
    // Set initial hidden state explicitly, then animate to visible.
    // Using gsap.set + gsap.to avoids the immediateRender issues
    // that cause elements to vanish when ScrollSmoother initializes.
    gsap.set('.hero-badge', { y: 30, opacity: 0 });
    gsap.set('.hero-btn', { y: 30, scale: 0.6, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    // Badge slides in
    tl.to('.hero-badge', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    });

    // CTA buttons spring in
    tl.to('.hero-btn', {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'elastic.out(1, 0.5)',
    }, '-=0.3');

  }, { scope: sectionRef });

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden z-10 pb-20">

      {/* Main content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center pointer-events-none">

        <div
          className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Available for new opportunities
        </div>

        <TextType
          as="h1"
          text="Ranit Sarkhel"
          typingSpeed={100}
          initialDelay={100}
          cursorClassName="text-zinc-500"
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500 mb-4 md:mb-6 px-4"
        />

        <div
          className="hero-cta-group flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pointer-events-auto w-full sm:w-auto px-4"
        >
          <button
            onClick={() => scrollTo('#projects')}
            className="hero-btn w-full sm:w-auto justify-center group flex items-center gap-2 px-6 py-3.5 sm:py-3 rounded-full bg-zinc-100 text-zinc-950 font-medium hover:bg-zinc-300 transition-all cursor-pointer"
          >
            View Work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="hero-btn w-full sm:w-auto justify-center px-6 py-3.5 sm:py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-800 transition-all cursor-pointer"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}
