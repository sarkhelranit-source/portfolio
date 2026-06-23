/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

import { About } from './components/About';
import { Experience } from './components/Experience';
import { Credentials } from './components/Credentials';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

const SplineHero = lazy(() => import('./components/SplineHero').then(m => ({ default: m.SplineHero })));
const LiquidEther = lazy(() => import('../components/LiquidEther'));
const DarkVeil = lazy(() => import('./components/DarkVeil'));
import BlobCursor from './components/BlobCursor';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  const [showEther, setShowEther] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();

    // Only create ScrollSmoother on desktop — it causes scroll hijacking and jank on touch devices
    if (window.innerWidth >= 1024) {
      smootherRef.current = ScrollSmoother.create({
        smooth: 0.8,
        effects: true,
        smoothTouch: false,
        normalizeScroll: true,
      });
    }

    const handleScroll = () => {
      // Use ScrollSmoother's scroll position for accurate tracking
      const sy = smootherRef.current ? smootherRef.current.scrollTop() : window.scrollY;
      const vh = window.innerHeight;
      setShowEther(sy > vh * 0.5);
    };

    // ScrollSmoother fires native scroll events, so this still works
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScreenSize, { passive: true });

    handleScroll();

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

      {/* Blob Cursor - renders custom cursor effects globally */}
      <BlobCursor
        blobType="circle"
        fillColor="#5227FF"
        trailCount={3}
        sizes={[27, 58, 36]}
        innerSizes={[9, 16, 11]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6, 0.6, 0.6]}
        shadowColor="rgba(0,0,0,0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={12}
        useFilter={true}
        boxShadow="inset -5px -5px 15px rgba(0,0,0,0.4), inset 5px 5px 15px rgba(255,255,255,0.3), 0px 10px 20px rgba(0,0,0,0.6)"
        fastDuration={0.02}
        slowDuration={0.25}
        zIndex={100}
      />

      {/* Fixed DarkVeil background — always visible behind everything */}
      <div className="fixed inset-0 z-[-2] pointer-events-none">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Suspense fallback={null}>
            <DarkVeil speed={1} />
          </Suspense>
        </div>
      </div>

      {/* Background LiquidEther */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none"
        style={{ display: showEther ? 'block' : 'none' }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {showEther && isDesktop && (
            <Suspense fallback={null}>
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
            </Suspense>
          )}
        </div>
      </div>

      <Navbar />

      {/* ScrollSmoother wrapper — all scrollable content inside */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="relative z-10 min-h-screen text-zinc-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
            {isDesktop && (
              <Suspense fallback={<div className="h-screen w-full bg-zinc-950" />}>
                <SplineHero />
              </Suspense>
            )}
            <Hero />

            <About />
            <Experience />
            <div className="relative z-20">
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

