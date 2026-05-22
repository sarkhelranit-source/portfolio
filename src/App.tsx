/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from './components/Hero';

import { About } from './components/About';
import { ServicesSection } from './components/ServicesSection';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // Only create ScrollSmoother on desktop — it causes scroll hijacking and jank on touch devices
    if (window.innerWidth >= 1024) {
      smootherRef.current = ScrollSmoother.create({
        smooth: 0.8,
        effects: true,
        smoothTouch: false,
        normalizeScroll: true,
      });
    }

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* ScrollSmoother wrapper — all scrollable content inside */}
      <div id="smooth-wrapper" className="main-wrapper bg-[#0C0C0C] min-h-screen overflow-x-clip">
        <div id="smooth-content">
          <main className="relative z-10 min-h-screen text-[#D7E2EA] font-sans">
            <Hero />

            <About />
            <ServicesSection />
            <Projects />
            <Contact />
          </main>
          <div className="relative z-10">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
