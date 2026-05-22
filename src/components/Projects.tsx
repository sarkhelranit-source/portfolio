import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { LiveProjectButton } from './ContactButton';
import { FadeIn } from './FadeIn';

const PROJECTS = [
  {
    id: 1,
    num: '01',
    title: 'AWS Security Incident Response',
    category: 'AWS / Security',
    link: 'https://github.com/sarkhelranit-source/AWS-Incident-Response',
    brief: 'A serverless security solution built via AWS CloudFormation. It utilizes CloudTrail to monitor console access without MFA, leveraging EventBridge rules to trigger a real-time Lambda function. This automatically dispatches alerts down to SNS for immediate security personnel response, ensuring secure, compliant operational environments.',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85'
    }
  },
  {
    id: 2,
    num: '02',
    title: 'Personal Discord AI Agent',
    category: 'AI / n8n',
    link: 'https://github.com/sarkhelranit-source/DiscordAI/tree/main',
    brief: "An advanced Discord command center modeled after Marvel's J.A.R.V.I.S., engineered atop n8n, LangChain, and Google Gemini. It autonomously fields mission directives with dynamic sub-systems for Redis knowledge graphs, Gmail summarization, metrics diagnostics, and real-time webhook operations.",
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85'
    }
  },
  {
    id: 3,
    num: '03',
    title: 'Personal Telegram AI Agent',
    category: 'AI / n8n',
    link: 'https://github.com/sarkhelranit-source/Telegram-Bot/tree/main',
    brief: 'A sleek, integrated conversational AI agent for Telegram harnessing deep automation flows. Designed for robust user interactivity, context-aware command routing, and fluid data processing via third-party webhooks, empowering hyper-efficient personal server moderation.',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85'
    }
  },
  {
    id: 4,
    num: '04',
    title: 'Guess the Number Multiplayer',
    category: 'Game / Cloud',
    link: 'https://github.com/sarkhelranit-source/Guess-The-Number',
    brief: 'An intuitive web-based pass-and-play game engineered with pure HTML/JS for snappy real-time responsiveness. It intelligently captures player inputs, manages individual attempt tracking arrays, and resolves robust multiplayer conflict logic to crown the most strategic player.',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85'
    }
  }
];

export function Projects() {
  const totalCards = PROJECTS.length;

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-24 relative z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10">
        <FadeIn delay={0} y={40} className="mb-16 md:mb-24">
          <h2
            className="hero-heading font-black uppercase text-center tracking-tight leading-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>

        {/* Stacking Cards Container */}
        <div className="relative flex flex-col gap-16 md:gap-24">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={totalCards}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  index: number;
  totalCards: number;
}

function ProjectCard({ project, index, totalCards }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Stacking calculation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[75vh] md:min-h-[85vh] w-full flex items-start justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `${96 + index * 28}px`,
          willChange: 'transform',
        }}
        className="sticky w-full rounded-[30px] sm:rounded-[45px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-8 md:p-10 flex flex-col justify-between gap-6 sm:gap-8 md:gap-10 shadow-2xl"
      >
        {/* Top row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-4 sm:pb-6 border-b border-[#D7E2EA]/10">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black leading-none select-none tracking-tighter text-[#D7E2EA]/20"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 80px)' }}
            >
              {project.num}
            </span>
            <div>
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/50 block mb-1">
                {project.category}
              </span>
              <h3
                className="font-bold text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.25rem)' }}
              >
                {project.title}
              </h3>
            </div>
          </div>
          <p
            className="text-[#D7E2EA]/70 font-light leading-relaxed max-w-xl lg:max-w-2xl"
            style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}
          >
            {project.brief}
          </p>
          <div className="shrink-0 self-end lg:self-center">
            <LiveProjectButton href={project.link} />
          </div>
        </div>

        {/* Bottom row (two-column image grid) */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 items-stretch">
          {/* Left Column (40% width on md+) */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4 sm:gap-6">
            <div className="rounded-[20px] sm:rounded-[35px] md:rounded-[45px] overflow-hidden border border-[#D7E2EA]/10 shadow-md">
              <img
                src={project.images.col1_1}
                alt={`${project.title} preview 1`}
                className="w-full object-cover"
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="rounded-[20px] sm:rounded-[35px] md:rounded-[45px] overflow-hidden border border-[#D7E2EA]/10 shadow-md">
              <img
                src={project.images.col1_2}
                alt={`${project.title} preview 2`}
                className="w-full object-cover"
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column (60% width on md+) */}
          <div className="col-span-1 md:col-span-6 rounded-[20px] sm:rounded-[35px] md:rounded-[45px] overflow-hidden border border-[#D7E2EA]/10 shadow-md">
            <img
              src={project.images.col2}
              alt={`${project.title} showcase`}
              className="w-full h-full object-cover min-h-[250px] md:min-h-full"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
