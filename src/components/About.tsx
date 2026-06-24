import { useRef, useCallback, useState, useEffect } from 'react';
import { Shield, Cloud, Container, Bot } from 'lucide-react';
import { FaAws, FaDocker, FaLinux, FaGitAlt, FaPython, FaFigma } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiNginx, SiRedis, SiN8N } from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import ProfileCard from './ProfileCard';
import LogoLoop from './LogoLoop';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: 'Cloud Architecture',
    icon: <Cloud size={20} />,
    tagline: '$ cdk deploy --all',
    desc: 'Designing serverless-first, highly scalable systems by treating infrastructure as software. Fluent in both declarative and imperative IaC to build resilient API backends, real-time WebSockets, and edge-optimized architectures.',
    highlights: ['Serverless', 'IaC', 'Event-Driven'],
    tools: ['AWS CDK', 'CloudFormation', 'Lambda', 'API Gateway', 'DynamoDB'],
    accent: '#FF9900',
  },
  {
    name: 'Security & Compliance',
    icon: <Shield size={20} />,
    tagline: '$ aws wafv2 update-web-acl',
    desc: 'Engineering defense-in-depth from the edge to the data layer. Implementing strict least-privilege IAM, zero-trust Origin Access Control (OAC), WAF rate-limiting, and default encryption to proactively minimize blast radius.',
    highlights: ['Defense in Depth', 'Least Privilege', 'Zero Trust'],
    tools: ['WAF', 'IAM', 'OAC', 'KMS', 'CloudFront'],
    accent: '#10B981',
  },
  {
    name: 'Containerization',
    icon: <Container size={20} />,
    tagline: '$ docker compose up -d --build',
    desc: 'Architecting microservices environments with Docker and Kubernetes for consistent, portable deployments. Building container networking, orchestrating multi-service stacks, and managing production clusters.',
    highlights: ['Microservices', 'Orchestration', 'Networking'],
    tools: ['Docker', 'K8s', 'Compose', 'Linux', 'Nginx'],
    accent: '#2496ED',
  },
  {
    name: 'AI & Automation',
    icon: <Bot size={20} />,
    tagline: '$ n8n start --tunnel',
    desc: 'Building intelligent automation agents and conversational AI bots for Discord and Telegram, powered by n8n workflows, LangChain, and Google Gemini — with Redis knowledge graphs and webhook integrations.',
    highlights: ['Agentic AI', 'Workflows', 'Bots'],
    tools: ['n8n', 'LangChain', 'Gemini', 'Python', 'Redis'],
    accent: '#A78BFA',
  },
];

const techLogos = [
  { title: 'AWS', node: <FaAws size={40} /> },
  { title: 'Docker', node: <FaDocker size={40} /> },
  { title: 'Linux', node: <FaLinux size={40} /> },
  { title: 'n8n', node: <SiN8N size={40} /> },
  { title: 'Kubernetes', node: <SiKubernetes size={40} /> },
  { title: 'Git', node: <FaGitAlt size={40} /> },
  { title: 'UI/UX', node: <FaFigma size={40} /> },
  { title: 'Python', node: <FaPython size={40} /> },
  { title: 'Terraform', node: <SiTerraform size={40} /> },
  { title: 'Nginx', node: <SiNginx size={40} /> },
  { title: 'Redis', node: <SiRedis size={40} /> },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToContact = useCallback(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo('#contact', true, 'top top');
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useGSAP(() => {
    const isMobileViewport = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    if (isMobileViewport) {
      // Return early on mobile to ensure all elements render natively and are 100% visible
      return;
    }

    // Section label
    gsap.from('.about-label', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-label',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    // Profile card reveal
    gsap.from('.about-heading-text', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-intro',
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });

    // Description paragraphs
    gsap.from('.about-desc-line', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-description',
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });

    // Skill cards stagger
    gsap.from('.skill-card', {
      y: 30,
      opacity: 0,
      scale: 0.98,
      stagger: 0.05,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    // Marquee fade-in
    gsap.from('.marquee-container', {
      opacity: 0,
      y: 10,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.marquee-container',
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="pt-12 md:pt-16 pb-12 md:pb-16 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Label */}
        <div className="about-label flex items-center gap-4 mb-10 md:mb-16">
          <span className="w-12 h-px bg-emerald-500" />
          <span className="text-sm md:text-base font-mono font-semibold uppercase tracking-[0.25em] text-emerald-400">About Me</span>
        </div>

        {/* Intro: Heading + Description side by side on desktop */}
        <div className="about-intro grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 xl:gap-24 mb-20 md:mb-28">

          {/* Left — Profile Card */}
          <div 
            className="about-heading-text relative flex items-center justify-center lg:justify-start mx-auto lg:mx-0"
            style={{ opacity: 1, visibility: 'visible', display: 'flex' }}
          >
            <ProfileCard
              avatarUrl="/headshot.png"
              name="Ranit Sarkhel"
              title="AWS Cloud Engineer"
              handle="sarkhelranit"
              status="Available for work"
              contactText="Contact"
              onContactClick={scrollToContact}
              enableTilt={!isMobile}
              behindGlowColor="rgba(82, 39, 255, 0.4)"
              innerGradient="linear-gradient(145deg, #1a1a2e8c 0%, #16213e44 100%)"
              className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px]"
            />
          </div>

          {/* Right — Description */}
          <div className="about-description flex flex-col justify-center gap-5">
            <p className="about-desc-line text-zinc-400 text-base md:text-lg leading-relaxed">
              I'm an AWS engineer who builds and owns systems end to end from the first line of infrastructure to the moment something ships to users.
            </p>
            <p className="about-desc-line text-zinc-400 text-base md:text-lg leading-relaxed">
              I think in terms of systems, not just services. Getting the architecture right matters to me, but so does making sure it stays maintainable, secure, and honest about its costs. Cloud infrastructure is easy to bloat; I find more satisfaction in building things that are lean and deliberate.
            </p>
          </div>
        </div>

        {/* Skills Grid — 2×2 */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-24">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card h-full">
              <div
                className="group relative rounded-2xl p-[1px] cursor-crosshair h-full"
                style={{
                  background: `linear-gradient(135deg, rgba(63,63,70,0.5), rgba(24,24,27,0.8))`,
                  transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale3d(1, 1, 1)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);

                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  
                  const rotateX = ((y - centerY) / centerY) * -6;
                  const rotateY = ((x - centerX) / centerX) * 6;
                  
                  e.currentTarget.style.setProperty('--rotate-x', `${rotateX}deg`);
                  e.currentTarget.style.setProperty('--rotate-y', `${rotateY}deg`);
                  e.currentTarget.style.transition = 'none';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--rotate-x', `0deg`);
                  e.currentTarget.style.setProperty('--rotate-y', `0deg`);
                  e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transition = 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)';
                }}
              >
              {/* Colored glowing border tracking mouse */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), ${skill.accent}80, transparent 40%)`,
                }}
              />

              {/* Inner 3D container */}
              <div 
                className="relative h-full w-full rounded-2xl overflow-hidden flex flex-col backdrop-blur-md border border-white/5 shadow-2xl"
                style={{
                  backgroundColor: 'rgba(8, 8, 12, 0.8)',
                  backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                  backgroundPosition: 'center center',
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(10px)',
                }}
              >
                {/* Holographic Glare */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(
                      circle at var(--mouse-x, 0) var(--mouse-y, 0), 
                      rgba(255,255,255,0.12) 0%, 
                      transparent 60%
                    )`,
                    mixBlendMode: 'overlay',
                    transform: 'translateZ(30px)',
                  }}
                />

                {/* Inner hover glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), ${skill.accent}15, transparent 60%)`,
                    transform: 'translateZ(1px)',
                  }}
                />

                {/* Top accent neon line */}
                <div
                  className="absolute top-0 left-0 w-full h-[2px] opacity-60 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${skill.accent}, transparent)`,
                    transform: 'translateZ(15px)',
                  }}
                />

                <div 
                  className="relative p-6 md:p-8 flex flex-col gap-5 grow z-10"
                  style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${skill.accent}20, rgba(0,0,0,0.5))`,
                          color: skill.accent,
                          border: `1px solid ${skill.accent}40`,
                          boxShadow: `0 0 20px ${skill.accent}20, inset 0 0 10px ${skill.accent}10`,
                          transform: 'translateZ(40px)',
                        }}
                      >
                        {skill.icon}
                      </div>
                      <div style={{ transform: 'translateZ(30px)' }}>
                        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight drop-shadow-md">{skill.name}</h3>
                        <code className="text-xs font-mono text-zinc-400 block mt-1 drop-shadow-sm">{skill.tagline}</code>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p 
                    className="text-sm md:text-base text-zinc-400 leading-relaxed font-light mt-2"
                    style={{ transform: 'translateZ(15px)' }}
                  >
                    {skill.desc}
                  </p>

                  {/* Bottom tags */}
                  <div 
                    className="flex flex-col gap-4 mt-auto pt-4 border-t border-zinc-800/40"
                    style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
                  >
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {skill.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[10px] md:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm"
                          style={{
                            background: `linear-gradient(135deg, ${skill.accent}20, transparent)`,
                            color: skill.accent,
                            border: `1px solid ${skill.accent}30`,
                            textShadow: `0 0 10px ${skill.accent}40`,
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Tools */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {skill.tools.map((t) => (
                        <span key={t} className="text-[10px] md:text-xs font-mono px-2.5 py-1 rounded bg-black/50 text-zinc-300 border border-zinc-800/60 backdrop-blur-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>

        {/* Tech Tags — Auto-scrolling Marquee */}
        <div className="marquee-container relative overflow-hidden py-6">
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            logoHeight={40}
            gap={64}
            hoverSpeed={20}
            scaleOnHover
            fadeOut
          />
        </div>

      </div>
    </section>
  );
}
