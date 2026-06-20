import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
    { name: 'AWS Certified Solutions Architect', link: 'https://www.credly.com/badges/cae510ff-2827-4772-a1d8-070c5a65444a/public_url' },
    { name: 'AWS Cloud Quest: Security', link: 'https://www.credly.com/badges/7218029e-feb5-4094-8bec-4f5283610b94/linked_in_profile' },
    { name: 'AWS Knowledge: Architecting', link: 'https://www.credly.com/badges/ea1f0f2e-56f7-461d-bd26-52fc37296dfc/public_url' },
    { name: 'AWS Cloud Quest: Solutions Architect', link: 'https://www.credly.com/badges/c263ad6d-cbae-4885-a50a-2392b75b91a8/linked_in_profile' },
    { name: 'AWS Cloud Quest: Cloud Practitioner', link: 'https://www.credly.com/badges/4b43790e-6d6b-407f-bf37-c1327e5877e1/linked_in_profile' }
];

export function Credentials() {
    const [isAppMode, setIsAppMode] = useState(false);
    const [completedCount, setCompletedCount] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (isAppMode) {
            let count = 0;
            const interval = setInterval(() => {
                count++;
                setCompletedCount(count);
                if (count >= certifications.length) {
                    clearInterval(interval);
                }
            }, 100);
            return () => clearInterval(interval);
        } else {
            setCompletedCount(0);
        }
    }, [isAppMode]);

    // GSAP scroll-triggered entrance animations
    useGSAP(() => {
        // Headings fade/slide up
        gsap.from('.cred-heading', {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.cred-header',
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });

        // Toggle switch scales in
        gsap.from('.cred-toggle', {
            scale: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
                trigger: '.cred-header',
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });

        // Certification items stagger in
        gsap.from('.cred-item', {
            y: 30,
            opacity: 0,
            x: -20,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.cred-list',
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
        });
    }, { scope: sectionRef });

    return (
        <section id="credentials" ref={sectionRef} className="py-24 md:py-32 bg-zinc-950/50 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header and Toggle */}
                <div className="cred-header flex flex-col items-center justify-center mb-16 space-y-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 mt-2">
                        <h2 
                            className={`cred-heading text-3xl sm:text-4xl md:text-6xl font-display font-medium tracking-tight transition-colors duration-500 ${!isAppMode ? 'text-zinc-100' : 'text-zinc-700'}`}
                            onClick={() => setIsAppMode(false)}
                            style={{ cursor: 'pointer' }}
                        >
                            In Progress
                        </h2>
                        
                        <button 
                            onClick={() => setIsAppMode(!isAppMode)}
                            className="cred-toggle w-[64px] md:w-[72px] h-9 md:h-10 rounded-full p-1 relative flex items-center transition-colors duration-500 focus:outline-none"
                            style={{ backgroundColor: isAppMode ? '#F7FF9E' : '#3f3f46' }}
                        >
                            <motion.div 
                                className="w-7 h-7 md:w-8 md:h-8 bg-zinc-950 rounded-full shadow-sm"
                                animate={{ x: isAppMode ? (window.innerWidth < 768 ? 28 : 32) : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        
                        <h2 
                            className={`cred-heading text-3xl sm:text-4xl md:text-6xl font-display font-medium tracking-tight transition-colors duration-500 ${isAppMode ? 'text-zinc-100' : 'text-zinc-700'}`}
                            onClick={() => setIsAppMode(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            Certified
                        </h2>
                    </div>
                </div>

                {/* List */}
                <div className="cred-list space-y-3 max-w-2xl mx-auto">
                    {certifications.map((cert, index) => {
                        const isItemCertified = index < completedCount;
                        
                        return (
                            <a
                                key={index}
                                href={isAppMode ? cert.link : undefined}
                                target={isAppMode ? "_blank" : undefined}
                                rel={isAppMode ? "noopener noreferrer" : undefined}
                                className={`cred-item block ${!isAppMode ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                onClick={(e) => {
                                    if (!isAppMode) e.preventDefault();
                                }}
                            >
                                <motion.div 
                                    className="flex items-center justify-between p-4 md:p-5 rounded-xl transition-all duration-300 relative overflow-hidden group"
                                    style={{
                                        backgroundColor: 'rgba(24, 24, 27, 0.4)',
                                        border: '1px solid rgba(82, 82, 91, 0.3)',
                                    }}
                                    whileHover={{ backgroundColor: 'rgba(39, 39, 42, 0.6)' }}
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                backgroundColor: isItemCertified ? '#F7FF9E' : 'transparent',
                                                color: isItemCertified ? '#09090b' : '#71717a',
                                                scale: isItemCertified ? [1, 1.2, 1] : 1,
                                                borderColor: isItemCertified ? '#F7FF9E' : '#3f3f46'
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2"
                                        >
                                            <AnimatePresence mode="wait">
                                                {isItemCertified && (
                                                    <motion.div
                                                        key="check"
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0 }}
                                                    >
                                                        <Check size={14} strokeWidth={4} />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                        
                                        <span className={`transition-colors duration-300 text-sm md:text-base ${isItemCertified ? 'text-zinc-100 font-medium' : 'text-zinc-400 font-normal'}`}>
                                            {cert.name}
                                        </span>
                                    </div>
                                    
                                    <div className={`text-xs md:text-sm transition-colors duration-300 relative z-10 ${isItemCertified ? 'text-zinc-500' : 'text-zinc-700'}`}>
                                        {isItemCertified ? 'Complete' : 'Pending'}
                                    </div>
                                </motion.div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
