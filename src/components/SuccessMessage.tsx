"use client";

import { useEffect, useState } from "react";

interface SuccessMessageProps {
  isActive: boolean;
}

export const SuccessMessage = ({ isActive }: SuccessMessageProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Delay um pouco maior que a animação do Carlos
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-8"
        }`}
        style={{
          marginBottom: "20px",
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-rose-200 text-center max-w-sm">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-serif text-rose-800 mb-1">
            Recebemos aqui, valeu!
          </h3>
          <p className="text-sm text-rose-600 font-light">
            Suas fotos foram enviadas com sucesso! ✨
          </p>
        </div>
      </div>
    </div>
  );
};
