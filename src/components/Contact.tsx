import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
              Let's build something <br />
              <span className="text-zinc-500">extraordinary.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-md">
              Have a project in mind or just want to chat? Feel free to reach out. I'm currently open to new opportunities.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-zinc-500 uppercase tracking-wider font-medium mb-2">Email</p>
                <a href="mailto:sarkhelranit2001@gmail.com" className="text-xl text-zinc-100 hover:text-emerald-400 transition-colors">
                  sarkhelranit2001@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm text-zinc-500 uppercase tracking-wider font-medium mb-2">Location</p>
                <p className="text-xl text-zinc-100">
                  Kolkata, West Bengal <span className="text-zinc-500 text-base">(Remote)</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900/50 border border-zinc-800/50 p-8 rounded-3xl backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-400">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-zinc-400">Subject</label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-400">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formState !== 'idle'}
                className="w-full bg-zinc-100 text-zinc-950 font-medium py-4 rounded-xl hover:bg-zinc-300 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === 'idle' && (
                  <>Send Message <Send size={18} /></>
                )}
                {formState === 'submitting' && (
                  <span className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
                )}
                {formState === 'success' && (
                  <>Sent Successfully <CheckCircle2 size={18} className="text-emerald-600" /></>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
