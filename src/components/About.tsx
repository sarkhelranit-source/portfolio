import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Code2, Palette, Zap, Globe } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const skills = [
  { name: 'AWS Cloud Services', icon: <Globe size={20} />, desc: 'EC2, IAM, S3, architecture and implementation' },
  { name: 'Infrastructure & Security', icon: <Zap size={20} />, desc: 'AWS Security, Least Privileged Access, Wazuh' },
  { name: 'Containerization', icon: <Code2 size={20} />, desc: 'Docker, Docker Compose, Microservices and Networking' },
  { name: 'AI & Automation', icon: <Palette size={20} />, desc: 'Agentic Automation, n8n workflow creation' },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.about-draw', {
      drawSVG: "0%",
      ease: "none",
      scrollTrigger: {
        trigger: '.about-heading',
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      }
    });
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative z-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Centered Heading with SVG draw animation */}
        <div className="about-heading relative z-[2] mb-12">
          <h2 className="relative text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-center uppercase">
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
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            Passionate about driving efficiency and innovation in cloud computing, security, and automation.
            Currently working as a Cloud Associate with deep expertise in AWS, Docker, and Linux.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {['AWS Services', 'Docker', 'Linux', 'n8n', 'Kubernetes', 'Git', 'UI/UX'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Horizontal Skill Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-100 mb-4">
                {skill.icon}
              </div>
              <h3 className="text-lg font-medium text-zinc-100 mb-2">{skill.name}</h3>
              <p className="text-sm text-zinc-400">{skill.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

