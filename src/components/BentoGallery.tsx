import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './BentoGallery.css';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { src: '/icons8-linux-50.png', alt: 'Linux', fly: 'left', brand: '252, 198, 36' },
  { src: '/icons8-terraform-50.png', alt: 'Terraform', fly: 'left', brand: '132, 79, 186' },
  { src: '/icons8-amazon-aws-50.png', alt: 'AWS', fly: 'top', brand: '255, 153, 0' },
  { src: '/headshot.jpg', alt: 'Headshot', fly: 'center', brand: '' },
  { src: '/icons8-git-50.png', alt: 'Git', fly: 'bottom', brand: '240, 80, 50' },
  { src: '/icons8-kubernetes-50.png', alt: 'Kubernetes', fly: 'right', brand: '50, 108, 229' },
  { src: '/icons8-docker-50.png', alt: 'Docker', fly: 'right', brand: '36, 150, 237' },
];

export function BentoGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=250%',
        scrub: 1,
        pin: true,
      }
    });

    // Phase 1: Icons fly outward and fade
    tl.to('.gfly-left', { xPercent: -200, opacity: 0, duration: 0.35, stagger: 0.05, ease: 'power2.in' }, 0);
    tl.to('.gfly-right', { xPercent: 200, opacity: 0, duration: 0.35, stagger: 0.05, ease: 'power2.in' }, 0);
    tl.to('.gfly-top', { yPercent: -200, opacity: 0, duration: 0.35, ease: 'power2.in' }, 0);
    tl.to('.gfly-bottom', { yPercent: 200, opacity: 0, duration: 0.35, ease: 'power2.in' }, 0);

    // Phase 2: Headshot zooms to fill viewport
    tl.to('.gfly-center', {
      scale: 4.5,
      borderRadius: '0px',
      duration: 0.5,
      ease: 'power2.inOut',
    }, 0.15);

    // Phase 3: Headshot goes grayscale + dim (matches Hero background)
    tl.to('.gfly-center img', {
      filter: 'grayscale(1) brightness(0.35) contrast(1.1)',
      duration: 0.35,
    }, 0.45);

    // Vignette fades in to match Hero's radial mask
    tl.to('.bento-vignette', {
      opacity: 1,
      duration: 0.35,
    }, 0.45);

  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="bento-section">
      <div className="bento-vignette" />
      <div className="gallery gallery--bento" id="gallery-bento">
        {galleryItems.map((item) => {
          const isHeadshot = item.fly === 'center';
          return (
            <div
              key={item.alt}
              className={`gallery__item gfly-${item.fly} ${isHeadshot ? 'gallery__item--headshot' : 'gallery__item--icon'
                }`}
              style={
                !isHeadshot
                  ? { background: `radial-gradient(ellipse at center, rgba(${item.brand}, 0.2) 0%, rgba(24, 24, 27, 0.95) 70%)` }
                  : undefined
              }
            >
              <img src={item.src} alt={item.alt} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
