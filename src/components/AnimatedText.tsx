import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  let charIndexAccumulator = 0;

  // Pre-calculate total characters to pass to Character component
  const totalChars = text.length;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wordIdx) => {
        const chars = word.split('');
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
            {chars.map((char, charIdx) => {
              const currentIdx = charIndexAccumulator++;
              return (
                <Character
                  key={charIdx}
                  char={char}
                  index={currentIdx}
                  total={totalChars}
                  progress={scrollYProgress}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
}

interface CharacterProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function Character({ char, index, total, progress }: CharacterProps) {
  // Stagger start times. Each character takes 20% of the total scroll window.
  const start = (index / total) * 0.8;
  const end = Math.min(1, start + 0.2);

  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 select-none pointer-events-none">
        {char}
      </motion.span>
    </span>
  );
}
