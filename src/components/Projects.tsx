import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'AWS Security Incident Response',
    category: 'AWS / Security',
    image: '/projects/aws.png',
    color: 'from-emerald-500/20 to-transparent',
    link: 'https://github.com/sarkhelranit-source/AWS-Incident-Response',
    brief: "A serverless security solution built via AWS CloudFormation. It utilizes CloudTrail to monitor console access without MFA, leveraging EventBridge rules to trigger a real-time Lambda function. This automatically dispatches alerts down to SNS for immediate security personnel response, ensuring secure, compliant operational environments."
  },
  {
    id: 2,
    title: 'Personal Discord AI Agent',
    category: 'AI / n8n',
    image: '/projects/discord.png',
    color: 'from-blue-500/20 to-transparent',
    link: 'https://github.com/sarkhelranit-source/DiscordAI/tree/main',
    brief: "An advanced Discord command center modeled after Marvel's J.A.R.V.I.S., engineered atop n8n, LangChain, and Google Gemini. It autonomously fields mission directives with dynamic sub-systems for Redis knowledge graphs, Gmail summarization, metrics diagnostics, and real-time webhook operations."
  },
  {
    id: 3,
    title: 'Personal Telegram AI Agent',
    category: 'AI / n8n',
    image: '/projects/telegram.png',
    color: 'from-purple-500/20 to-transparent',
    link: 'https://github.com/sarkhelranit-source/Telegram-Bot/tree/main',
    brief: "A sleek, integrated conversational AI agent for Telegram harnessing deep automation flows. Designed for robust user interactivity, context-aware command routing, and fluid data processing via third-party webhooks, empowering hyper-efficient personal server moderation."
  },
  {
    id: 4,
    title: 'Guess the Number Multiplayer',
    category: 'Game / Cloud',
    image: '/projects/guess.png',
    color: 'from-orange-500/20 to-transparent',
    link: 'https://github.com/sarkhelranit-source/Guess-The-Number',
    brief: "An intuitive web-based pass-and-play game engineered with pure HTML/JS for snappy real-time responsiveness. It intelligently captures player inputs, manages individual attempt tracking arrays, and resolves robust multiplayer conflict logic to crown the most strategic player."
  }
];

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
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
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section id="projects" className="py-24 md:py-32 bg-zinc-950 font-sans" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4 text-zinc-100">Selected Work</h2>
            <p className="text-zinc-400 text-lg max-w-md">A collection of my recent projects focusing on automation, security, and interactive experiences.</p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#"
            className="inline-flex items-center gap-2 text-zinc-100 hover:text-emerald-400 transition-colors font-medium"
          >
            View Archive <ArrowUpRight size={18} />
          </motion.a>
        </div>

        <div ref={ref} className="relative mx-auto pb-20 mt-6 md:mt-12">
          {projects.map((project, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={project.id}
                className={`flex flex-col md:flex-row justify-between items-start pt-10 md:pt-32 relative group w-full ${isLeft ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Desktop Node */}
                <div className="hidden md:flex absolute inset-y-0 left-1/2 -translate-x-[20px] w-10 z-40 pointer-events-none pt-32 pb-32 -ml-px">
                  <div className="sticky top-[40vh] h-10 w-10 rounded-full bg-zinc-950 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-zinc-800 border-2 border-zinc-700 transition-colors duration-300 group-hover:border-emerald-500 group-hover:bg-emerald-500/20" />
                  </div>
                </div>

                {/* Mobile Header with Node proxy */}
                <div className="md:hidden flex items-center mb-6 pl-0 z-40 relative">
                  <div className="h-10 w-10 shrink-0 bg-zinc-950 flex items-center justify-center rounded-full mr-4">
                    <div className="h-4 w-4 rounded-full bg-zinc-800 border-2 border-zinc-700 transition-colors duration-300 group-hover:border-emerald-500 group-hover:bg-emerald-500/20" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-zinc-100">{project.title}</h3>
                </div>

                {/* Project Image Card */}
                <div className={`relative w-full md:w-[calc(50%-3rem)] flex flex-col pl-14 md:pl-0 ${isLeft ? 'md:items-end' : 'md:items-start'}`}>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800/50 block w-full max-w-xl group/card"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <div className={`absolute inset-0 bg-gradient-to-b ${project.color} z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`}></div>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="hidden md:flex absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                      <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800/50 p-4 rounded-2xl flex items-center justify-between w-full">
                        <div className="w-full text-left">
                          <p className="text-xs text-zinc-400 mb-1">{project.category}</p>
                          <h3 className="text-lg font-display font-bold text-zinc-100 tracking-tight leading-tight w-full truncate">{project.title}</h3>
                        </div>
                        <div className="ml-4 w-10 h-10 shrink-0 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 delay-100">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                </div>

                {/* Project Description Text */}
                <div className={`relative w-full md:w-[calc(50%-3rem)] flex flex-col justify-center pl-14 md:pl-0 mt-6 md:mt-12 ${isLeft ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-md flex flex-col"
                  >
                    <p className="text-emerald-400 font-medium mb-3 hidden md:block tracking-wide text-sm">{project.category}</p>
                    <h3 className="text-2xl font-display font-bold text-zinc-100 mb-4 hidden md:block">{project.title}</h3>
                    <p className="text-zinc-400 text-sm md:text-[15px] leading-relaxed relative">
                      {project.brief}
                    </p>
                    <div className="mt-6 flex gap-4 md:hidden">
                       <a className="inline-flex items-center gap-2 group/link hover:text-emerald-400 transition-colors text-zinc-100 text-sm font-medium" href={project.link} target="_blank" rel="noopener noreferrer">View Details <ArrowUpRight size={16} className="transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform text-emerald-500" /></a>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}

          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-1/2 left-[20px] md:-translate-x-[1px] top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-zinc-800 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-emerald-500 via-emerald-400 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
