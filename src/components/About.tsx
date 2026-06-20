import { useRef } from 'react';
import { Shield, Cloud, Container, Bot } from 'lucide-react';
import { FaAws, FaDocker, FaLinux, FaGitAlt, FaPython, FaFigma } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiNginx, SiRedis, SiN8N } from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

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
  { name: 'AWS', icon: <FaAws size={40} /> },
  { name: 'Docker', icon: <FaDocker size={40} /> },
  { name: 'Linux', icon: <FaLinux size={40} /> },
  { name: 'n8n', icon: <SiN8N size={40} /> },
  { name: 'Kubernetes', icon: <SiKubernetes size={40} /> },
  { name: 'Git', icon: <FaGitAlt size={40} /> },
  { name: 'UI/UX', icon: <FaFigma size={40} /> },
  { name: 'Python', icon: <FaPython size={40} /> },
  { name: 'Terraform', icon: <SiTerraform size={40} /> },
  { name: 'Nginx', icon: <SiNginx size={40} /> },
  { name: 'Redis', icon: <SiRedis size={40} /> },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
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

    // Heading reveal
    gsap.from('.about-heading-text', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-intro',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Description paragraphs
    gsap.from('.about-desc-line', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-description',
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });

    // Skill cards stagger
    gsap.from('.skill-card', {
      y: 60,
      opacity: 0,
      scale: 0.95,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Marquee fade-in
    gsap.from('.marquee-container', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.marquee-container',
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  // Duplicate tech tags for seamless infinite scroll
  const marqueeLogos = [...techLogos, ...techLogos];

  return (
    <section id="about" ref={sectionRef} className="pt-24 md:pt-32 pb-12 md:pb-16 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Label */}
        <div className="about-label flex items-center gap-3 mb-10">
          <span className="w-8 h-px bg-emerald-500" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400">About Me</span>
        </div>

        {/* Intro: Heading + Description side by side on desktop */}
        <div className="about-intro grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 md:mb-28">

          {/* Left — Heading with SVG */}
          <div className="about-heading-text relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1]">
              <span className="relative inline-block">
                AWS Engineer
              </span>
              <br />
              <span className="text-zinc-500">at Moresco.</span>
            </h2>
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
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-16 md:mb-24">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-card group relative rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(24,24,27,0.9) 0%, rgba(9,9,11,0.95) 100%)',
                border: `1px solid rgba(63,63,70,0.4)`,
              }}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(600px circle at 50% 0%, ${skill.accent}08, transparent 60%)`,
                }}
              />

              {/* Top accent line */}
              <div
                className="h-px w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${skill.accent}60, transparent)`,
                }}
              />

              <div className="relative p-6 md:p-7 flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${skill.accent}15`,
                        color: skill.accent,
                        boxShadow: `0 0 20px ${skill.accent}10`,
                      }}
                    >
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-zinc-100 tracking-tight">{skill.name}</h3>
                      <code className="text-[10px] md:text-[11px] font-mono text-zinc-600 block mt-0.5">{skill.tagline}</code>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center gap-1.5 mt-1 shrink-0">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: skill.accent, boxShadow: `0 0 6px ${skill.accent}` }}
                    />
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-600">Active</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-500 leading-relaxed">{skill.desc}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md"
                      style={{
                        background: `${skill.accent}10`,
                        color: skill.accent,
                        border: `1px solid ${skill.accent}20`,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Bottom tools */}
                <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-zinc-800/40">
                  {skill.tools.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900/80 text-zinc-500 border border-zinc-800/40">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Tags — Auto-scrolling Marquee */}
        <div className="marquee-container relative overflow-hidden py-6">
          <div className="marquee-track flex gap-10 md:gap-16 items-center animate-marquee">
            {marqueeLogos.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="shrink-0 text-zinc-500 hover:text-zinc-200 transition-colors duration-300"
                title={tech.name}
              >
                {tech.icon}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
