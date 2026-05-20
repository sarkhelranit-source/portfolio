/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { SplineHero } from './components/SplineHero';
import { BentoGallery } from './components/BentoGallery';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Credentials } from './components/Credentials';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import LiquidEther from '../components/LiquidEther';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  const [showEther, setShowEther] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // Create ScrollSmoother — smooth: 0.8 provides direct control with a hint of polish, effects: true enables data-speed parallax
    smootherRef.current = ScrollSmoother.create({
      smooth: 0.8,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });

    const handleScroll = () => {
      // Use ScrollSmoother's scroll position for accurate tracking
      const sy = smootherRef.current ? smootherRef.current.scrollTop() : window.scrollY;
      const vh = window.innerHeight;
      setShowEther(sy > vh * 0.5);
    };

    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // ScrollSmoother fires native scroll events, so this still works
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScreenSize, { passive: true });

    handleScroll();
    checkScreenSize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Fixed elements — OUTSIDE the smooth wrapper so they don't get smoothed */}

      {/* Background LiquidEther */}
      <div
        className="fixed inset-0 z-[-1] bg-zinc-950 pointer-events-none"
        style={{ display: showEther ? 'block' : 'none' }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {showEther && isDesktop && (
            <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B19EEF']}
              mouseForce={20}
              cursorSize={55}
              isViscous
              viscous={30}
              iterationsViscous={8}
              iterationsPoisson={8}
              resolution={0.25}
              isBounce={false}
              autoDemo
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          )}
        </div>
      </div>

      <Navbar />

      {/* ScrollSmoother wrapper — all scrollable content inside */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="relative z-10 min-h-screen text-zinc-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
            <SplineHero />
            <BentoGallery />
            <Hero />
            <About />
            <Experience />
            <div className="relative z-20 bg-zinc-950">
              <Credentials />
              <Projects />
              <Contact />
            </div>
          </main>
          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

