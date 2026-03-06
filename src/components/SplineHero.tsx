import Spline from '@splinetool/react-spline';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useEffect } from 'react';

export function SplineHero() {
    useEffect(() => {
        const interval = setInterval(() => {
            const splineViewer = document.querySelector('spline-viewer');
            if (splineViewer && splineViewer.shadowRoot) {
                const logo = splineViewer.shadowRoot.querySelector('#logo');
                if (logo) {
                    (logo as HTMLElement).style.display = 'none';
                    clearInterval(interval);
                }
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-zinc-950">
            <div className="absolute inset-0 z-0">
                <Spline scene="https://prod.spline.design/xQY7D1A0xM2lyXzP/scene.splinecode" />
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <span className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Scroll to explore</span>
                    <ChevronDown className="text-zinc-500" size={20} />
                </motion.div>
            </div>
        </section>
    );
}
