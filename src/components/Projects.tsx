import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'AWS Security Incident Response',
    category: 'AWS / Security',
    image: 'https://picsum.photos/seed/aws/800/600?blur=1',
    color: 'from-emerald-500/20 to-transparent',
    link: 'https://github.com/sarkhelranit-source/AWS-Incident-Response'
  },
  {
    id: 2,
    title: 'Personal Discord AI Agent',
    category: 'AI / n8n',
    image: 'https://picsum.photos/seed/discord/800/600?blur=1',
    color: 'from-blue-500/20 to-transparent',
    link: 'https://github.com/sarkhelranit-source/DiscordAI/tree/main'
  },
  {
    id: 3,
    title: 'Personal Telegram AI Agent',
    category: 'AI / n8n',
    image: 'https://picsum.photos/seed/telegram/800/600?blur=1',
    color: 'from-purple-500/20 to-transparent',
    link: 'https://github.com/sarkhelranit-source/Telegram-Bot/tree/main'
  },
  {
    id: 4,
    title: 'Guess the Number Multiplayer',
    category: 'Game / Cloud',
    image: 'https://picsum.photos/seed/game/800/600?blur=1',
    color: 'from-orange-500/20 to-transparent',
    link: 'https://github.com/sarkhelranit-source/Guess-The-Number'
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">Selected Work</h2>
            <p className="text-zinc-400 text-lg max-w-md">A collection of recent projects focusing on interactive experiences.</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800/50 block"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-b ${project.color} z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800/50 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">{project.category}</p>
                    <h3 className="text-xl font-display font-bold text-zinc-100">{project.title}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
