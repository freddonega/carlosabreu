"use client";

import { useState } from "react";
import { UploadForm } from "./UploadForm";
import { CarlosAnimation } from "./CarlosAnimation";
import { Fireworks } from "./Fireworks";
import { SuccessMessage } from "./SuccessMessage";

export const ImageUpload = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const handleUploadSuccess = () => {
    setShowAnimation(true);
  };

  const handleCloseAnimation = () => {
    setShowAnimation(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 py-8 px-4 relative overflow-hidden">
      {/* Cabeçalho com sarcasmo */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-rose-800 mb-4">
          Nossos Momentos (Duvidosos) Especiais
        </h1>
        <p className="text-lg text-rose-600 font-light">
          Mande aqui suas fotos — antes que a gente se arrependa de ter pedido
        </p>
      </div>

      {/* Formulário de Upload */}
      <div className="max-w-4xl mx-auto relative z-10">
        <UploadForm onUploadSuccess={handleUploadSuccess} />
      </div>

      {/* Rodapé Sarcástico */}
      <div className="text-center mt-8">
        <div className="flex justify-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
          <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
        </div>
        <p className="text-rose-600 font-light text-sm">
          ✨ Compartilhando momentos de amor, vergonha alheia e maquiagem
          derretida ✨
        </p>
        <p className="text-rose-600 font-light text-sm">
          Feito com ❤️ pelo{" "}
          <span className="line-through opacity-50">palhaço do</span>{" "}
          <a
            href="https://freddonega.dev"
            target="_blank"
            className="text-rose-600 font-bold"
          >
            Fred Donega
          </a>
        </p>
      </div>

      {/* Animações */}
      <CarlosAnimation
        isActive={showAnimation}
        onClose={handleCloseAnimation}
      />
      <Fireworks isActive={showAnimation} />
      <SuccessMessage isActive={showAnimation} />
    </div>
  );
};
