import { useRef } from 'react';
import CardSwap, { Card } from './CardSwap';
import { Shield, Cloud, Container, Bot } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: 'Cloud Architecture',
    icon: <Cloud size={22} />,
    tagline: '$ aws cloudformation deploy',
    desc: 'Designing production-grade, scalable cloud infrastructure on AWS — from VPC networking and multi-AZ deployments to serverless event-driven architectures using Lambda, EventBridge, and SNS.',
    highlights: ['Well-Architected', 'Multi-AZ', 'IaC'],
    tools: ['EC2', 'S3', 'IAM', 'CloudFormation', 'Lambda'],
    accent: '#FF9900',
  },
  {
    name: 'Security & Compliance',
    icon: <Shield size={22} />,
    tagline: '$ wazuh-agent --status active',
    desc: 'Implementing defense-in-depth security strategies with IAM least-privilege policies, CloudTrail monitoring, real-time SIEM alerting via Wazuh, and automated incident response pipelines.',
    highlights: ['Zero Trust', 'SIEM', 'Incident Response'],
    tools: ['IAM', 'CloudTrail', 'Wazuh', 'GuardDuty', 'SNS'],
    accent: '#10B981',
  },
  {
    name: 'Containerization',
    icon: <Container size={22} />,
    tagline: '$ docker compose up -d --build',
    desc: 'Architecting microservices environments with Docker and Kubernetes for consistent, portable deployments. Building container networking, orchestrating multi-service stacks, and managing production clusters.',
    highlights: ['Microservices', 'Orchestration', 'Networking'],
    tools: ['Docker', 'K8s', 'Compose', 'Linux', 'Nginx'],
    accent: '#2496ED',
  },
  {
    name: 'AI & Automation',
    icon: <Bot size={22} />,
    tagline: '$ n8n start --tunnel',
    desc: 'Building intelligent automation agents and conversational AI bots for Discord and Telegram, powered by n8n workflows, LangChain, and Google Gemini — with Redis knowledge graphs and webhook integrations.',
    highlights: ['Agentic AI', 'Workflows', 'Bots'],
    tools: ['n8n', 'LangChain', 'Gemini', 'Python', 'Redis'],
    accent: '#A78BFA',
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Native SVG draw animation using getTotalLength()
    const paths = gsap.utils.toArray('.about-draw') as SVGPathElement[];
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: '.about-heading',
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        }
      });
    });

    // Heading — fade up (without SplitText to preserve the SVG circle structure)
    gsap.from('.about-heading h2', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-heading',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Description paragraph
    gsap.from('.about-description', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-description',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Tech tags — staggered entrance
    gsap.from('.about-tag', {
      y: 20,
      opacity: 0,
      scale: 0.8,
      stagger: 0.05,
      duration: 0.6,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.about-tags',
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });

    // Skill cards — no longer using GSAP stagger since CardSwap handles its own animation

  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Centered Heading with SVG draw animation */}
        <div className="about-heading relative z-[2] mb-8 md:mb-12">
          <h2 className="relative text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-center uppercase" style={{ perspective: '600px' }}>
            <span className="relative inline-block">
              AWS Engineer
              <svg
                className="absolute pointer-events-none"
                style={{ width: '112%', top: '50%', transform: 'translateY(-50%) rotate(2deg)', left: '-6%' }}
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 842.14 500"
              >
                <path
                  className="about-draw"
                  d="M336.2,130.05C261.69,118,16.52,122,20.65,244.29c4.17,123,484.3,299.8,734.57,108.37,244-186.65-337.91-311-546.54-268.47"
                  fill="none"
                  stroke="#8486aa"
                  strokeMiterlimit={10}
                  strokeWidth={8}
                />
              </svg>
            </span>
            <br />
            <span className="text-zinc-500">at Moresco Software Solutions.</span>
          </h2>
        </div>

        {/* Description + Tech Tags — centered */}
        <div className="max-w-2xl mx-auto text-center mt-12 mb-16">
          <p className="about-description text-zinc-400 text-lg leading-relaxed mb-8">
            Passionate about driving efficiency and innovation in cloud computing, security, and automation.
            Currently working as a Cloud Associate with deep expertise in AWS, Docker, and Linux.
          </p>

          <div className="about-tags flex flex-wrap gap-3 justify-center">
            {['AWS Services', 'Docker', 'Linux', 'n8n', 'Kubernetes', 'Git', 'UI/UX'].map((tech) => (
              <span
                key={tech}
                className="about-tag px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Skill Cards — CardSwap */}
        <div className="relative w-full h-[550px] sm:h-[600px] md:h-[650px] flex items-center justify-center">
          <CardSwap
            cardDistance={55}
            verticalDistance={65}
            delay={4000}
            pauseOnHover={true}
            easing="elastic"
            width={650}
            height={400}
          >
            {skills.map((skill) => (
              <Card
                key={skill.name}
                className="p-0 rounded-2xl bg-zinc-950 shadow-2xl flex flex-col overflow-hidden"
                style={{ border: `1px solid ${skill.accent}25` }}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${skill.accent}, transparent)` }} />

                <div className="flex flex-col justify-between h-full p-7 sm:p-8">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: `${skill.accent}18`, color: skill.accent, boxShadow: `0 0 20px ${skill.accent}15` }}
                      >
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-zinc-100 tracking-tight">{skill.name}</h3>
                        <code className="text-[11px] font-mono text-zinc-600 block mt-0.5">{skill.tagline}</code>
                      </div>
                    </div>
                    {/* Status dot */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: skill.accent, boxShadow: `0 0 8px ${skill.accent}` }} />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Active</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-5">{skill.desc}</p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {skill.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
                        style={{ background: `${skill.accent}12`, color: skill.accent, border: `1px solid ${skill.accent}30` }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Bottom toolbar */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {skill.tools.map((t) => (
                        <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-500 border border-zinc-800/50">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-600 font-mono">click to swap →</span>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>

      </div>
    </section>
  );
}
