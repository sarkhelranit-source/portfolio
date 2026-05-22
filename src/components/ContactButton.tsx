import React from 'react';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
}

export function ContactButton({ onClick, className = '' }: ContactButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full text-white font-semibold uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3.5 md:px-10 md:py-4 text-[10px] sm:text-xs md:text-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:opacity-90 active:scale-95 whitespace-nowrap shrink-0 inline-flex items-center justify-center shadow-2xl ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        border: '2px solid rgba(255, 255, 255, 0.8)',
      }}
    >
      Contact Me
    </button>
  );
}

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  label?: string;
}

export function LiveProjectButton({ href, onClick, className = '', label = 'Live Project' }: LiveProjectButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors text-center cursor-pointer ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer ${className}`}
    >
      {label}
    </button>
  );
}
