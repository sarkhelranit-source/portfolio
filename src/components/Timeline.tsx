import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  title: string;
  logo?: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // GSAP animations for timeline entries
  useGSAP(() => {
    // Heading animations
    gsap.from('.timeline-heading', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.timeline-heading',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.timeline-subtitle', {
      y: 25,
      opacity: 0,
      duration: 0.7,
      delay: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.timeline-heading',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Animate each timeline entry
    const entries = gsap.utils.toArray<HTMLElement>('.timeline-entry');
    entries.forEach((entry, i) => {
      const content = entry.querySelector('.timeline-entry-content');
      const logo = entry.querySelector('.timeline-entry-logo');
      const dot = entry.querySelector('.timeline-dot-inner');

      // Content slides in from left
      if (content) {
        gsap.from(content, {
          x: -60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Logo fades in
      if (logo) {
        gsap.from(logo, {
          scale: 0.85,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Dot pulses on enter
      if (dot) {
        gsap.from(dot, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: entry,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div
      className="w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto pt-10 pb-6 md:pt-12 md:pb-12 px-4 md:px-8 lg:px-10">
        <h2 className="timeline-heading text-lg md:text-4xl mb-4 text-zinc-100 max-w-4xl font-display font-bold">
          Experience
        </h2>
        <p className="timeline-subtitle text-zinc-400 text-sm md:text-base max-w-sm">
          My professional journey and the milestones I've achieved along the way.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="timeline-entry flex justify-start pt-10 md:pt-24 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-zinc-950 flex items-center justify-center">
                <div className="timeline-dot-inner h-4 w-4 rounded-full bg-zinc-800 border border-zinc-700 p-2" />
              </div>
              {item.logo ? (
                <div className="timeline-entry-logo hidden md:flex md:pl-20 w-56 items-center justify-start">
                  <img src={item.logo} alt={item.title} className="w-auto h-auto max-w-[120px] max-h-[60px] object-contain opacity-80 hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                </div>
              ) : (
                <h3 className="timeline-entry-logo hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-zinc-500">
                  {item.title}
                </h3>
              )}
            </div>

            <div className="timeline-entry-content relative pl-20 pr-4 md:pl-4 w-full">
              {item.logo ? (
                <div className="md:hidden flex mb-6 w-full items-center justify-start">
                  <img src={item.logo} alt={item.title} className="w-auto h-auto max-w-[100px] max-h-[50px] object-contain opacity-80" />
                </div>
              ) : (
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-zinc-500">
                  {item.title}
                </h3>
              )}
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-zinc-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-emerald-500 via-emerald-400 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
