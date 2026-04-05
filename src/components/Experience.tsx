import { Timeline } from './Timeline';

const experiences = [
    {
        title: 'Moresco Software Services',
        logo: '/companies/moresco.png',
        content: (
            <div>
                <h3 className="text-xl font-bold text-zinc-100">AWS Cloud Support Executive</h3>
                <span className="inline-block text-sm font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 mb-4 mt-2">
                    2025 JUN - CONTINUE
                </span>
                <ul className="space-y-2 mt-2">
                    {[
                        'Daily Monitoring System Metrics on Client Production Servers',
                        'Working on various cloud architecture and solutions',
                        'Working with security monitoring tools like Wazuh',
                        'Reporting and Automation Workflow Creation.'
                    ].map((item, j) => (
                        <li key={j} className="text-zinc-400 flex gap-2">
                            <span className="text-emerald-500 mt-1.5 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] bg-emerald-500 shrink-0"></span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        )
    },
    {
        title: 'Amazon Web Services',
        logo: '/companies/aws.png',
        content: (
            <div>
                <h3 className="text-xl font-bold text-zinc-100">Infra Delivery and Network Scaling Tech</h3>
                <span className="inline-block text-sm font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 mb-4 mt-2">
                    2024 NOV - APR 2025
                </span>
                <ul className="space-y-2 mt-2">
                    {[
                        'Supporting In Network Brick Deployment and Device Build',
                        'Cabling Infra Management',
                        'Fiber Optics Testing and Troubleshooting',
                        'Performing monthly Audits for Quality Assurance.'
                    ].map((item, j) => (
                        <li key={j} className="text-zinc-400 flex gap-2">
                            <span className="text-emerald-500 mt-1.5 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] bg-emerald-500 shrink-0"></span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
];

export function Experience() {
    return (
        <section id="experience" className="py-24 md:py-32 relative z-20 bg-zinc-950">
            <Timeline data={experiences} />
        </section>
    );
}
