import React, { useState, useEffect, useRef } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const mx = e.clientX;
      const my = e.clientY;

      // Calculate distance to closest point on the bounding rect
      const distanceX = Math.max(0, rect.left - mx, mx - rect.right);
      const distanceY = Math.max(0, rect.top - my, my - rect.bottom);
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < padding) {
        // Calculate center of element
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // Calculate offset from center divided by strength factor
        const x = (mx - cx) / strength;
        const y = (my - cy) / strength;

        setTransform({ x, y });
        setTransition(activeTransition);
      } else {
        // Reset to original position
        setTransform({ x: 0, y: 0 });
        setTransition(inactiveTransition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
