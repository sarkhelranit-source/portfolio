import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import './ContactButton.css';

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Read access key from the project's root .env file
    const accessKey = import.meta.env.VITE_ACCESS_KEY;
    if (accessKey) {
      formData.append("access_key", accessKey);
    } else {
      console.error("VITE_ACCESS_KEY is missing from environment variables!");
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormState('success');
        form.reset();
        setTimeout(() => setFormState('idle'), 3000);
      } else {
        console.error("Form submission error:", data);
        setFormState('idle');
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setFormState('idle');
    }
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
                    name="name"
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
                    name="email"
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
                  name="subject"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-400">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formState !== 'idle'}
                className={`contact-btn w-full ${formState !== 'idle' ? 'is-active' : ''}`}
              >
                <div className="outline"></div>
                <div className="state state--default">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      height="1.2em"
                      width="1.2em"
                    >
                      <g style={{ filter: "url(#shadow)" }}>
                        <path
                          fill="currentColor"
                          d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
                        ></path>
                      </g>
                      <defs>
                        <filter id="shadow">
                          <feDropShadow
                            floodOpacity="0.6"
                            stdDeviation="0.8"
                            dy="1"
                            dx="0"
                          ></feDropShadow>
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <p>
                    <span style={{ "--i": 0 } as React.CSSProperties}>S</span>
                    <span style={{ "--i": 1 } as React.CSSProperties}>e</span>
                    <span style={{ "--i": 2 } as React.CSSProperties}>n</span>
                    <span style={{ "--i": 3 } as React.CSSProperties}>d</span>
                    <span style={{ "--i": 4 } as React.CSSProperties}> </span>
                    <span style={{ "--i": 5 } as React.CSSProperties}>M</span>
                    <span style={{ "--i": 6 } as React.CSSProperties}>e</span>
                    <span style={{ "--i": 7 } as React.CSSProperties}>s</span>
                    <span style={{ "--i": 8 } as React.CSSProperties}>s</span>
                    <span style={{ "--i": 9 } as React.CSSProperties}>a</span>
                    <span style={{ "--i": 10 } as React.CSSProperties}>g</span>
                    <span style={{ "--i": 11 } as React.CSSProperties}>e</span>
                  </p>
                </div>
                <div className="state state--sent">
                  <div className="icon">
                    <svg
                      stroke="black"
                      strokeWidth="0.5px"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g style={{ filter: "url(#shadow)" }}>
                        <path
                          d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <p>
                    <span style={{ "--i": 5 } as React.CSSProperties}>S</span>
                    <span style={{ "--i": 6 } as React.CSSProperties}>e</span>
                    <span style={{ "--i": 7 } as React.CSSProperties}>n</span>
                    <span style={{ "--i": 8 } as React.CSSProperties}>t</span>
                    <span style={{ "--i": 9 } as React.CSSProperties}>!</span>
                  </p>
                </div>
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
