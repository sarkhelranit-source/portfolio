import { motion } from 'motion/react';
import { Code2, Palette, Zap, Globe } from 'lucide-react';

const skills = [
  { name: 'AWS Cloud Services', icon: <Globe size={20} />, desc: 'EC2, IAM, S3, architecture and implementation' },
  { name: 'Infrastructure & Security', icon: <Zap size={20} />, desc: 'AWS Security, Least Privileged Access, Wazuh' },
  { name: 'Containerization', icon: <Code2 size={20} />, desc: 'Docker, Docker Compose, Microservices and Networking' },
  { name: 'AI & Automation', icon: <Palette size={20} />, desc: 'Agentic Automation, n8n workflow creation' },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">
              Cloud Engineer <br />
              <span className="text-zinc-500">at Moresco Software Solutions.</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Passionate about driving efficiency and innovation in cloud computing, security, and automation.
              Currently working as a Cloud Associate with deep expertise in AWS, Docker, and Linux.
            </p>

            <div className="flex flex-wrap gap-3">
              {['AWS Services', 'Docker', 'Linux', 'n8n', 'Kubernetes', 'Git', 'UI/UX'].map((tech, i) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
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
          </motion.div>

        </div>
      </div>
    </section>
  );
}
