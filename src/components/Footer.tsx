import { Github, Linkedin, Mail } from 'lucide-react';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Logo + copyright fade up
    gsap.from('.footer-brand', {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });

    // Social icons stagger in
    gsap.from('.footer-social-icon', {
      y: 15,
      opacity: 0,
      scale: 0.8,
      stagger: 0.1,
      duration: 0.5,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="border-t border-zinc-800/50 py-12 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="footer-brand flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2 text-center sm:text-left">
          <a href="#home" className="flex items-center">
            <img src="/logo-v2.png" alt="Ranit Sarkhel" className="h-10 w-auto object-contain mix-blend-screen" />
          </a>
          <span className="text-zinc-600 text-sm ml-0 sm:ml-4 sm:border-l sm:border-zinc-800/80 sm:pl-4">
            © {new Date().getFullYear()} Ranit Sarkhel
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/sarkhelranit-source" target="_blank" rel="noopener noreferrer" className="footer-social-icon text-zinc-500 hover:text-zinc-100 transition-colors">
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/ranit-sarkhel-80891123b/" target="_blank" rel="noopener noreferrer" className="footer-social-icon text-zinc-500 hover:text-zinc-100 transition-colors">
            <Linkedin size={20} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:sarkhelranit2001@gmail.com" className="footer-social-icon text-zinc-500 hover:text-zinc-100 transition-colors">
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
