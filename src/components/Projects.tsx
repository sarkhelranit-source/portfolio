import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Folder from './Folder';
import GradientText from './GradientText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const projects = [
  {
    id: 1,
    title: 'AWS Security Incident Response',
    category: 'AWS / Security',
    image: '/projects/aws.png',
    accent: '#10B981',
    link: 'https://github.com/sarkhelranit-source/AWS-Incident-Response',
    brief: "A serverless security solution built via AWS CloudFormation. It utilizes CloudTrail to monitor console access without MFA, leveraging EventBridge rules to trigger a real-time Lambda function. This automatically dispatches alerts down to SNS for immediate security personnel response, ensuring secure, compliant operational environments."
  },
  {
    id: 2,
    title: 'Personal Discord AI Agent',
    category: 'AI / n8n',
    image: '/projects/discord.png',
    accent: '#818CF8',
    link: 'https://github.com/sarkhelranit-source/DiscordAI/tree/main',
    brief: "An advanced Discord command center modeled after Marvel's J.A.R.V.I.S., engineered atop n8n, LangChain, and Google Gemini. It autonomously fields mission directives with dynamic sub-systems for Redis knowledge graphs, Gmail summarization, metrics diagnostics, and real-time webhook operations."
  },
  {
    id: 5,
    title: 'Sniplink',
    category: 'AWS / Serverless',
    image: '/sniplink_architecture_v4.png',
    accent: '#F472B6',
    link: 'https://github.com/sarkhelranit-source/sniplink',
    brief: "A production-grade, serverless URL shortening platform built entirely on AWS. It delivers instant edge-cached redirects via CloudFront, secure authentication with Cognito, and sub-50ms DynamoDB lookups—all managed through a responsive React dashboard."
  },
  {
    id: 3,
    title: 'Personal Telegram AI Agent',
    category: 'AI / n8n',
    image: '/projects/telegram.png',
    accent: '#38BDF8',
    link: 'https://github.com/sarkhelranit-source/Telegram-Bot/tree/main',
    brief: "A sleek, integrated conversational AI agent for Telegram harnessing deep automation flows. Designed for robust user interactivity, context-aware command routing, and fluid data processing via third-party webhooks, empowering hyper-efficient personal server moderation."
  },
  {
    id: 4,
    title: 'Guess the Number Multiplayer',
    category: 'Game / Cloud',
    image: '/projects/guess.png',
    accent: '#FB923C',
    link: 'https://github.com/sarkhelranit-source/Guess-The-Number',
    brief: "An intuitive web-based pass-and-play game engineered with pure HTML/JS for snappy real-time responsiveness. It intelligently captures player inputs, manages individual attempt tracking arrays, and resolves robust multiplayer conflict logic to crown the most strategic player."
  }
];

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [expanded, setExpanded] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP entrance animations
  useGSAP(() => {
    gsap.from('.projects-title', {
      y: 50,
      opacity: 0,
      rotationX: -20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects-header',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.projects-subtitle', {
      y: 25,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.projects-header',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from('.folder-container', {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.folder-container',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    // On mobile, automatically expand the folder when it enters the viewport
    if (window.innerWidth < 768) {
      ScrollTrigger.create({
        trigger: '.folder-container',
        start: 'top 80%',
        onEnter: () => {
          setFolderOpen(true);
        },
        onLeaveBack: () => {
          setFolderOpen(false);
        }
      });
    }
  }, { scope: containerRef });

  const handleFolderOpen = useCallback(() => {
    setExpanded(true);

    // Animate cards in after state change
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.project-expand-card');
          gsap.fromTo(cards,
            {
              y: 80,
              opacity: 0,
              scale: 0.9,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.1,
              duration: 0.7,
              ease: 'power3.out',
            }
          );
        }
      });
    });
  }, []);

  const handleClose = useCallback(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.project-expand-card');
      gsap.to(cards, {
        y: 60,
        opacity: 0,
        scale: 0.9,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => setExpanded(false),
      });
    } else {
      setExpanded(false);
    }
  }, []);

  // Paper items for folder preview (first 3 projects as thumbnails)
  const paperItems = projects.slice(0, 3).map((project) => (
    <img
      key={project.id}
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover"
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  ));

  return (
    <section id="projects" className="pt-24 md:pt-32 pb-12 md:pb-16 font-sans relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="projects-header flex flex-col items-center text-center mb-16 md:mb-24 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            Portfolio
          </div>

          <h2
            className="projects-title text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6"
            style={{ perspective: '600px' }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500">
              Selected
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5227FF] to-[#9D7BFF]">
              Work
            </span>
          </h2>

          <p className="projects-subtitle text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            A curated collection of my recent engineering projects, focusing on deep automation, cloud security, and interactive digital experiences.
          </p>
        </div>

        {/* Back to Folder button — placed outside header to avoid overlap */}
        {expanded && (
          <div className="flex justify-center mb-8 md:-mt-16">
            <button
              onClick={handleClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 text-zinc-200 transition-all font-medium text-sm group/close backdrop-blur-md"
            >
              <X size={16} className="transition-transform group-hover/close:rotate-90 text-[#9D7BFF]" />
              Back to Folder
            </button>
          </div>
        )}

        {/* Folder View */}
        {!expanded && (
          <div className="folder-container flex flex-col md:flex-row items-center justify-center pt-20 pb-8 md:pt-48 md:pb-12 gap-4 md:gap-16 w-full">
            {/* Left Text */}
            <div className="hidden md:block">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="text-2xl md:text-3xl font-display font-bold tracking-wide"
              >
                Hover to peek
              </GradientText>
            </div>

            {/* Center Folder */}
            <div className="w-[200px] h-[160px] md:w-[300px] md:h-[240px] flex items-center justify-center shrink-0 relative">
              <Folder
                size={isMobile ? 1.8 : 3}
                color="#5227FF"
                items={paperItems}
                onOpen={handleFolderOpen}
                open={isMobile ? folderOpen : undefined}
              />
            </div>

            {/* Right Text */}
            <div className="hidden md:block">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="text-2xl md:text-3xl font-display font-bold tracking-wide"
              >
                Click to explore
              </GradientText>
            </div>

            {/* Mobile Text (visible only on small screens below folder) */}
            {isMobile && (
              <div className="w-full text-center mt-6">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="text-base font-display font-semibold tracking-wide"
                >
                  Tap to explore
                </GradientText>
              </div>
            )}
          </div>
        )}

        {/* Expanded Project Cards */}
        {expanded && (
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 pb-8"
            onMouseMove={(e) => {
              for (const card of document.getElementsByClassName('project-glow-wrapper')) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
                (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
              }
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-expand-card project-glow-wrapper group relative rounded-2xl transition-all duration-500 p-[1px]"
                style={{ backgroundColor: 'rgba(63,63,70,0.4)', opacity: 0 }}
              >
                {/* Border hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), ${project.accent}80, transparent 40%)`,
                  }}
                />

                {/* Inner content */}
                <div
                  className="relative h-full w-full rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: 'linear-gradient(135deg, rgba(24,24,27,0.95) 0%, rgba(9,9,11,0.98) 100%)',
                  }}
                >
                  {/* Inner hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), ${project.accent}0A, transparent 60%)`,
                    }}
                  />

                  {/* Project Thumbnail */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block overflow-hidden group/img"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {/* Gradient overlay on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(to bottom, ${project.accent}20, transparent)`,
                        }}
                      />
                    </div>
                  </a>

                  {/* Project Info */}
                  <div className="p-5 md:p-6 flex flex-col gap-3 grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <p
                          className="text-[11px] font-semibold uppercase tracking-wider mb-1.5"
                          style={{ color: project.accent }}
                        >
                          {project.category}
                        </p>
                        <h3 className="text-lg md:text-xl font-display font-bold text-zinc-100 tracking-tight leading-tight">
                          {project.title}
                        </h3>
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center border border-zinc-800 text-zinc-500 hover:text-zinc-100 hover:border-zinc-600 transition-all duration-300 mt-1"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    </div>

                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                      {project.brief}
                    </p>

                    {/* Bottom accent */}
                    <div className="mt-auto pt-3 border-t border-zinc-800/40 flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: project.accent, boxShadow: `0 0 6px ${project.accent}` }}
                      />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-600">
                        View Project
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
