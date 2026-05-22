import React, { useCallback } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

export function About() {
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
      id="about"
      className="relative min-h-screen bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-20 flex flex-col items-center justify-center overflow-hidden z-20"
      style={{ contentVisibility: 'auto' }}
    >
      {/* 4 decorative 3D images positioned absolutely in corners */}

      {/* Top-left Moon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none select-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Moon 3D decoration"
          className="w-[60px] sm:w-[120px] md:w-[160px] lg:w-[210px] h-auto pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* Bottom-left 3D Object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none select-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="Geometric 3D decoration"
          className="w-[50px] sm:w-[100px] md:w-[140px] lg:w-[180px] h-auto pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* Top-right Lego */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none select-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Lego 3D decoration"
          className="w-[60px] sm:w-[120px] md:w-[160px] lg:w-[210px] h-auto pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* Bottom-right 3D group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none select-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="Cubes 3D decoration"
          className="w-[65px] sm:w-[130px] md:w-[170px] lg:w-[220px] h-auto pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* Centered contents */}
      <div className="relative z-20 flex flex-col items-center text-center gap-10 sm:gap-14 md:gap-16 w-full max-w-4xl px-4">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Text Block & Button */}
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24 w-full">
          <AnimatedText
            text="With more than five years of experience in IT and systems engineering, i focus on cloud architecture, system security, and workflow automation. I truly enjoy working with organizations that aim to scale reliably and secure their cloud assets. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] text-center"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          <FadeIn delay={0.4} y={30}>
            <ContactButton onClick={() => scrollTo('#contact')} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
