"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface CarlosAnimationProps {
  isActive: boolean;
}

export const CarlosAnimation = ({ isActive }: CarlosAnimationProps) => {
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
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div
        className={`absolute bottom-0 right-0 transition-all duration-2000 ease-out ${
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
          className="object-contain max-h-screen"
          priority
        />
      </div>
      
      {/* Overlay gradiente para suavizar a transição */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-rose-100/50 via-transparent to-transparent transition-opacity duration-2000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionDelay: "1s",
        }}
      />
    </div>
  );
}; 