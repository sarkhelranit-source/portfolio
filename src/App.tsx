/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { SplineHero } from './components/SplineHero';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Credentials } from './components/Credentials';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import LiquidEther from '../components/LiquidEther';
import { useState, useEffect } from 'react';

export default function App() {
  const [showEther, setShowEther] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Only render/enable the WebGL background if scrolled past the SplineHero 
      // This prevents conflicting WebGL contexts from lagging the browser
      setShowEther(window.scrollY > window.innerHeight * 0.5);
    };
    
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScreenSize, { passive: true });
    
    handleScroll(); // Initial check
    checkScreenSize(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div className="min-h-screen text-zinc-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Background Component that takes effect behind transparent sections (like About onwards) */}
      <div 
        className="fixed inset-0 z-[-1] bg-zinc-950 pointer-events-none"
        style={{ display: showEther ? 'block' : 'none' }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {showEther && isDesktop && (
            <LiquidEther
              colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
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
      <main className="relative z-10">
        <SplineHero />
        <Hero />
        <About />
        <Experience />
        <Credentials />
        <Projects />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
