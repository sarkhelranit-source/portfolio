import React, { useCallback } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Magnet } from './Magnet';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';

export function Hero() {
  const scrollTo = useCallback((selector: string) => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(selector, true, 'top top');
    } else {
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen w-full flex flex-col justify-between bg-[#0C0C0C] text-[#D7E2EA] overflow-hidden select-none z-20"
      style={{ contentVisibility: 'auto' }}
    >
      {/* Navbar: Horizontal nav bar with logo and links */}
      <FadeIn delay={0} y={-20} as="nav" className="relative z-30 w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
        {/* Logo */}
        <a href="#home" className="flex-shrink-0 cursor-pointer" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>
          <img src="/logo-v2.png" alt="Ranit Sarkhel" className="h-8 md:h-10 lg:h-12 w-auto object-contain" />
        </a>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6 md:gap-8 lg:gap-12">
          <button
            onClick={() => scrollTo('#about')}
            className="font-medium uppercase tracking-wider text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('#services')}
            className="font-medium uppercase tracking-wider text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            Price
          </button>
          <button
            onClick={() => scrollTo('#projects')}
            className="font-medium uppercase tracking-wider text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="font-medium uppercase tracking-wider text-sm md:text-base lg:text-lg hover:opacity-70 transition-opacity duration-200 cursor-pointer"
          >
            Contact
          </button>
        </div>

      </FadeIn>

      {/* Hero Heading: Massive H1 */}
      <div className="relative z-20 w-full overflow-hidden text-center mt-6 sm:mt-4 md:-mt-5 pointer-events-none">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            hi, i&rsquo;m ranit
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait: Centered absolutely */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="w-full h-full"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Ranit portrait"
            className="w-full h-auto object-contain pointer-events-none select-none"
            referrerPolicy="no-referrer"
          />
        </Magnet>
      </FadeIn>

      {/* Bottom Bar */}
      <div className="relative z-30 w-full flex justify-between items-center pb-8 sm:pb-10 md:pb-12 px-6 md:px-10 mt-auto">
        {/* Left tagline */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug text-[#D7E2EA] max-w-[160px] sm:max-w-[220px] md:max-w-[260px] select-none"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.25rem)' }}
          >
            an aws engineer driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        {/* Right Contact button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={() => scrollTo('#contact')} />
        </FadeIn>
      </div>
    </section>
  );
}
