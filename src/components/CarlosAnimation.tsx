"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface CarlosAnimationProps {
  isActive: boolean;
  onClose?: () => void;
}

export const CarlosAnimation = ({
  isActive,
  onClose,
}: CarlosAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Pequeno delay antes de começar a animação
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ease-out ${
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-full opacity-0 scale-75"
        }`}
        style={{
          transitionDuration: "2s",
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <Image
          src="/carlos.png"
          alt="Carlos"
          width={400}
          height={600}
          className="object-contain max-h-screen max-w-full"
          priority
        />
      </div>

      {/* Botão de fechar */}
      {isVisible && onClose && (
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
        >
          <svg
            className="w-6 h-6 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Overlay gradiente para suavizar a transição */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-amber-100/50 via-transparent to-transparent transition-opacity duration-2000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionDelay: "1s",
        }}
      />
    </div>
  );
};
