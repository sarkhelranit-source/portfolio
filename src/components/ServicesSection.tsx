import React from 'react';
import { FadeIn } from './FadeIn';

const SERVICES = [
  {
    num: '01',
    name: 'Cloud Architecture',
    desc: 'Designing robust, scalable, and highly available cloud infrastructure solutions on AWS, aligned with the AWS Well-Architected Framework.',
  },
  {
    num: '02',
    name: 'DevOps & CI/CD',
    desc: 'Automating software delivery pipelines with GitHub Actions, n8n, and custom webhooks for continuous integration and rapid deployment.',
  },
  {
    num: '03',
    name: 'Security & Compliance',
    desc: 'Implementing secure identity and access management (IAM), Wazuh SIEM, and real-time incident response to protect critical resources.',
  },
  {
    num: '04',
    name: 'Containerization',
    desc: 'Architecting microservices environments using Docker, Docker Compose, and Kubernetes for consistent deployment across platforms.',
  },
  {
    num: '05',
    name: 'Automation & Scripting',
    desc: 'Building custom automation agents, discord/telegram bots, and workflows with Python, Node.js, and serverless technologies.',
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2
            className="font-black uppercase text-center tracking-tight leading-none mb-16 sm:mb-20 md:mb-28 text-[#0C0C0C]"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        <div className="flex flex-col border-t border-[#0C0C0C]/15">
          {SERVICES.map((service, idx) => (
            <FadeIn
              key={service.num}
              delay={idx * 0.1}
              y={30}
              className="flex items-center gap-6 sm:gap-10 border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12"
            >
              <div
                className="font-black leading-none select-none tracking-tighter shrink-0 w-[70px] sm:w-[120px] md:w-[180px]"
                style={{ fontSize: 'clamp(2rem, 7vw, 100px)' }}
              >
                {service.num}
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3
                  className="font-semibold uppercase text-[#0C0C0C] tracking-wide"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed text-[#0C0C0C]/70 max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {service.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
