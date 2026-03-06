import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-12 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-2">
          <span className="text-xl font-display font-bold tracking-tighter text-zinc-100">
            RANIT<span className="text-emerald-500">.</span>
          </span>
          <span className="text-zinc-600 text-sm ml-4">
            © {new Date().getFullYear()} Ranit Sarkhel
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/sarkhelranit-source" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-100 transition-colors">
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/ranit-sarkhel-80891123b/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-100 transition-colors">
            <Linkedin size={20} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:sarkhelranit2001@gmail.com" className="text-zinc-500 hover:text-zinc-100 transition-colors">
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
