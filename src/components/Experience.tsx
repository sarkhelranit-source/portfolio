import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaFolder } from 'react-icons/fa';

const experiences = [
    {
        id: "moresco",
        logo: "/companies/moresco.png",
        company: "Moresco Software Services",
        role: "AWS Cloud Engineer",
        duration: "2025 Jun - Present",
        responsibilities: [
            "Design and deploy cloud infrastructure on AWS, owning architecture decisions across the full lifecycle of production systems",
            "Maintain and secure cloud resources across live environments, ensuring reliability and compliance for sensitive workloads",
            "Monitor system health, respond to incidents, and continuously improve infrastructure for performance and cost efficiency"
        ]
    },
    {
        id: "aws",
        logo: "/companies/aws.png",
        company: "Amazon Web Services",
        role: "Infra Delivery and Network Scaling Tech",
        duration: "2024 Nov - Apr 2025",
        responsibilities: [
            "Supporting In Network Brick Deployment and Device Build",
            "Cabling Infra Management",
            "Fiber Optics Testing and Troubleshooting",
            "Performing monthly Audits for Quality Assurance"
        ]
    }
];

export function Experience() {
    const [activeTab, setActiveTab] = useState(experiences[0].id);
    
    const activeExperience = experiences.find(exp => exp.id === activeTab) || experiences[0];

    return (
        <section id="experience" className="pt-24 md:pt-32 pb-12 md:pb-16 relative z-20 max-w-6xl mx-auto px-4 md:px-8">
            <div className="mb-8 md:mb-12 relative z-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-zinc-100 mb-4">
                    Experience
                </h2>
                <p className="text-zinc-400 text-sm md:text-base max-w-sm">
                    My professional journey, documented as code.
                </p>
            </div>

            {/* Glowing Background Blobs */}
            <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px] -z-10 transform -translate-y-1/2 mix-blend-screen pointer-events-none"></div>
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] -z-10 transform -translate-y-1/2 mix-blend-screen pointer-events-none"></div>

            {/* IDE Container - Glassmorphism */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row min-h-[500px] relative">
                
                {/* Sidebar */}
                <div className="w-full md:w-20 bg-white/[0.02] border-b md:border-b-0 md:border-r border-white/10 flex flex-col shrink-0 relative z-10 items-center">
                    {/* Mac window controls */}
                    <div className="h-12 flex items-center justify-center gap-1.5 border-b border-white/10 shrink-0 w-full">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                    </div>
                    
                    {/* File list */}
                    <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto p-3 gap-3 w-full">
                        {experiences.map((exp) => (
                            <button
                                key={exp.id}
                                onClick={() => setActiveTab(exp.id)}
                                title={exp.company}
                                className={`flex items-center justify-center p-3 rounded-xl transition-all duration-300 shrink-0 ${
                                    activeTab === exp.id 
                                        ? 'bg-white/10 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] scale-105' 
                                        : 'hover:bg-white/5 border border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                                }`}
                            >
                                <img src={exp.logo} alt={exp.company} className="w-8 h-8 object-contain drop-shadow-md" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 bg-transparent relative z-0">
                    
                    {/* Decorative Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                    {/* Top Tabs */}
                    <div className="flex bg-black/20 border-b border-white/10 overflow-x-auto shrink-0 relative z-10">
                        {experiences.map((exp) => (
                            <div 
                                key={exp.id}
                                onClick={() => setActiveTab(exp.id)}
                                className={`flex items-center gap-2 px-5 py-3 text-sm border-r border-white/10 min-w-max cursor-pointer transition-all duration-300 ${
                                    activeTab === exp.id
                                        ? 'bg-white/5 text-zinc-100 border-t-2 border-t-blue-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                                        : 'bg-transparent text-zinc-500 hover:bg-white/5 border-t-2 border-t-transparent'
                                }`}
                            >
                                <div className="w-4 h-4 flex items-center justify-center shrink-0 bg-white/10 rounded-sm overflow-hidden p-0.5">
                                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                                </div>
                                {exp.company}
                            </div>
                        ))}
                    </div>

                    {/* Code Content */}
                    <div className="flex-1 p-4 md:p-6 overflow-y-auto font-mono text-sm md:text-base text-zinc-300 relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeExperience.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col drop-shadow-sm"
                            >
                                {/* Line 1 */}
                                <div className="flex gap-4 group">
                                    <span className="w-4 md:w-8 text-right text-zinc-600 select-none shrink-0 group-hover:text-zinc-400 transition-colors">1</span>
                                    <div className="flex-1 break-words">
                                        <span className="text-purple-400">const</span> <span className="text-blue-400">experience</span> <span className="text-purple-400">=</span> <span className="text-zinc-200">{'{'}</span>
                                    </div>
                                </div>
                                {/* Line 2 */}
                                <div className="flex gap-4 group">
                                    <span className="w-4 md:w-8 text-right text-zinc-600 select-none shrink-0 group-hover:text-zinc-400 transition-colors">2</span>
                                    <div className="flex-1 break-words pl-4 md:pl-8">
                                        <span className="text-emerald-300">company:</span> <span className="text-amber-300">"{activeExperience.company}"</span><span className="text-zinc-200">,</span>
                                    </div>
                                </div>
                                {/* Line 3 */}
                                <div className="flex gap-4 group">
                                    <span className="w-4 md:w-8 text-right text-zinc-600 select-none shrink-0 group-hover:text-zinc-400 transition-colors">3</span>
                                    <div className="flex-1 break-words pl-4 md:pl-8">
                                        <span className="text-emerald-300">role:</span> <span className="text-amber-300">"{activeExperience.role}"</span><span className="text-zinc-200">,</span>
                                    </div>
                                </div>
                                {/* Line 4 */}
                                <div className="flex gap-4 group">
                                    <span className="w-4 md:w-8 text-right text-zinc-600 select-none shrink-0 group-hover:text-zinc-400 transition-colors">4</span>
                                    <div className="flex-1 break-words pl-4 md:pl-8">
                                        <span className="text-emerald-300">duration:</span> <span className="text-amber-300">"{activeExperience.duration}"</span><span className="text-zinc-200">,</span>
                                    </div>
                                </div>
                                {/* Line 5 */}
                                <div className="flex gap-4 group">
                                    <span className="w-4 md:w-8 text-right text-zinc-600 select-none shrink-0 group-hover:text-zinc-400 transition-colors">5</span>
                                    <div className="flex-1 break-words pl-4 md:pl-8">
                                        <span className="text-emerald-300">responsibilities:</span> <span className="text-zinc-200">{'['}</span>
                                    </div>
                                </div>
                                
                                {/* Lines 6+ */}
                                {activeExperience.responsibilities.map((resp, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <span className="w-4 md:w-8 text-right text-zinc-600 select-none shrink-0 group-hover:text-zinc-400 transition-colors">{6 + idx}</span>
                                        <div className="flex-1 break-words pl-8 md:pl-16 text-zinc-300">
                                            <span className="text-amber-300">"{resp}"</span>{idx < activeExperience.responsibilities.length - 1 ? <span className="text-zinc-200">,</span> : ''}
                                        </div>
                                    </div>
                                ))}

                                {/* Closing bracket for array */}
                                <div className="flex gap-4 group">
                                    <span className="w-4 md:w-8 text-right text-zinc-600 select-none shrink-0 group-hover:text-zinc-400 transition-colors">{6 + activeExperience.responsibilities.length}</span>
                                    <div className="flex-1 break-words pl-4 md:pl-8">
                                        <span className="text-zinc-200">{']'}</span>
                                    </div>
                                </div>
                                
                                {/* Closing brace for object */}
                                <div className="flex gap-4 group">
                                    <span className="w-4 md:w-8 text-right text-zinc-600 select-none shrink-0 group-hover:text-zinc-400 transition-colors">{7 + activeExperience.responsibilities.length}</span>
                                    <div className="flex-1 break-words">
                                        <span className="text-zinc-200">{'}'}</span><span className="text-zinc-400">;</span>
                                    </div>
                                </div>

                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}


