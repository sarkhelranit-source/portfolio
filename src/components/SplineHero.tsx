import Spline from '@splinetool/react-spline';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export function SplineHero() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const [isInView, setIsInView] = useState(true);

    // Check device type and minor delay before rendering Spline to prioritize initial page paint
    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        const handleScroll = () => {
            // Unmount the heavy 3D canvas if user scrolls deep into the page
            setIsInView(window.scrollY < window.innerHeight * 1.1);
        };

        // Initial check
        checkScreenSize();

        // Listen for window resize and scroll
        window.addEventListener('resize', checkScreenSize);
        window.addEventListener('scroll', handleScroll, { passive: true });

        const timer = setTimeout(() => setIsLoaded(true), 100);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkScreenSize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!isDesktop) {
        return null;
    }

    const handleSplineLoad = (splineApp: any) => {
        // Attempt to hide the Spline logo if possible through the API/DOM
        const canvas = document.querySelector('.spline-canvas-container canvas');
        if (canvas) {
           const container = canvas.parentElement;
           if(container && container.nextElementSibling) {
               (container.nextElementSibling as HTMLElement).style.display = 'none';
           }
        }
    };

    return (
        <section className="relative h-screen w-full overflow-hidden bg-zinc-950">
            {/* 
              Performance: 
              - Only render Spline after initial paint
              - Disable pointer events on small screens to prevent scroll hijacking and save CPU/GPU 
            */}
            <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
                {isLoaded && isInView && (
                    <div className="spline-canvas-container w-full h-full">
                       <Spline 
                          scene="https://prod.spline.design/xQY7D1A0xM2lyXzP/scene.splinecode" 
                          onLoad={handleSplineLoad}
                       />
                    </div>
                )}
            </div>

            {/* Fallback pattern while loading or on very low-end devices */}
            {!isLoaded && (
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            )}

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
