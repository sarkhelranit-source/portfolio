import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

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

    return (
        <section id="credentials" className="py-24 md:py-32 bg-zinc-950/50 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header and Toggle */}
                <div className="flex flex-col items-center justify-center mb-16 space-y-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-2">
                        <h2 
                            className={`text-4xl md:text-6xl font-display font-medium tracking-tight transition-colors duration-500 ${!isAppMode ? 'text-zinc-100' : 'text-zinc-700'}`}
                            onClick={() => setIsAppMode(false)}
                            style={{ cursor: 'pointer' }}
                        >
                            In Progress
                        </h2>
                        
                        <button 
                            onClick={() => setIsAppMode(!isAppMode)}
                            className="w-[72px] h-10 rounded-full p-1 relative flex items-center transition-colors duration-500 focus:outline-none"
                            style={{ backgroundColor: isAppMode ? '#F7FF9E' : '#3f3f46' }}
                        >
                            <motion.div 
                                className="w-8 h-8 bg-zinc-950 rounded-full shadow-sm"
                                animate={{ x: isAppMode ? 32 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                        
                        <h2 
                            className={`text-4xl md:text-6xl font-display font-medium tracking-tight transition-colors duration-500 ${isAppMode ? 'text-zinc-100' : 'text-zinc-700'}`}
                            onClick={() => setIsAppMode(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            Certified
                        </h2>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-3 max-w-2xl mx-auto">
                    {certifications.map((cert, index) => {
                        const isItemCertified = index < completedCount;
                        
                        return (
                            <a
                                key={index}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
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
                                                borderColor: isItemCertified ? '#F7FF9E' : '#3f3f46' // Muted border initially
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
