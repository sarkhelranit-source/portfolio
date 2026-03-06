import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const experiences = [
    {
        company: 'Moresco Software Services',
        role: 'AWS Cloud Support Executive',
        period: '2025 JUN - CONTINUE',
        description: [
            'Daily Monitoring System Metrics on Client Production Servers',
            'Working on various cloud architecture and solutions',
            'Working with security monitoring tools like Wazuh',
            'Reporting and Automation Workflow Creation.'
        ]
    },
    {
        company: 'Amazon Web Services',
        role: 'Infra Delivery and Network Scaling Tech',
        period: '2024 NOV - APR 2025',
        description: [
            'Supporting In Network Brick Deployment and Device Build',
            'Cabling Infra Management',
            'Fiber Optics Testing and Troubleshooting',
            'Performing monthly Audits for Quality Assurance.'
        ]
    }
];

const education = [
    {
        school: 'Jetking Infotrain Limited',
        degree: 'Masters in Cloud Computing',
        period: '2023 - 2024'
    },
    {
        school: 'West Bengal State University',
        degree: 'Bachelors in Computer Science',
        period: '2021 - 2024'
    },
    {
        school: 'Jodhpur Park Boys School',
        degree: 'Higher Secondary',
        period: '2018 - 2020'
    }
];

const certifications = [
    { name: 'AWS Certified Solutions Architect', link: 'https://www.credly.com/badges/cae510ff-2827-4772-a1d8-070c5a65444a/public_url' },
    { name: 'AWS Cloud Quest: Security', link: 'https://www.credly.com/badges/7218029e-feb5-4094-8bec-4f5283610b94/linked_in_profile' },
    { name: 'AWS Knowledge: Architecting', link: 'https://www.credly.com/badges/ea1f0f2e-56f7-461d-bd26-52fc37296dfc/public_url' },
    { name: 'AWS Cloud Quest: Solutions Architect', link: 'https://www.credly.com/badges/c263ad6d-cbae-4885-a50a-2392b75b91a8/linked_in_profile' },
    { name: 'AWS Cloud Quest: Cloud Practitioner', link: 'https://www.credly.com/badges/4b43790e-6d6b-407f-bf37-c1327e5877e1/linked_in_profile' }
];

export function Experience() {
    return (
        <section id="experience" className="py-24 md:py-32 bg-zinc-950/50">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    <div className="lg:col-span-2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                                <Briefcase className="text-emerald-500" /> Professional Experience
                            </h2>
                            <div className="space-y-8">
                                {experiences.map((exp, i) => (
                                    <div key={i} className="relative pl-8 border-l border-zinc-800 pb-8 last:pb-0">
                                        <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-950 border-2 border-emerald-500"></div>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-zinc-100">{exp.role}</h3>
                                                <p className="text-emerald-500 font-medium">{exp.company}</p>
                                            </div>
                                            <span className="text-sm font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <ul className="space-y-2">
                                            {exp.description.map((item, j) => (
                                                <li key={j} className="text-zinc-400 flex gap-2">
                                                    <span className="text-emerald-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                                <GraduationCap className="text-emerald-500" /> Education
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {education.map((edu, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                                        <span className="text-xs font-mono text-emerald-500 mb-2 block">{edu.period}</span>
                                        <h3 className="font-bold text-zinc-100 mb-1">{edu.degree}</h3>
                                        <p className="text-sm text-zinc-400">{edu.school}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl font-display font-bold flex items-center gap-3">
                            <Award className="text-emerald-500" /> Certifications
                        </h2>
                        <div className="space-y-4">
                            {certifications.map((cert, i) => (
                                <a
                                    key={i}
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/50 transition-all"
                                >
                                    <span className="text-zinc-300 group-hover:text-emerald-400 transition-colors">{cert.name}</span>
                                    <Award size={18} className="text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
