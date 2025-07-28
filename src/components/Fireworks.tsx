"use client";

import { useEffect, useState } from "react";

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
  }>;
}

export const Fireworks = ({ isActive }: { isActive: boolean }) => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
      "#54a0ff",
      "#5f27cd",
    ];

    const createFirework = (): Firework => {
      const x = Math.random() * window.innerWidth;
      const y =
        window.innerHeight * 0.3 + Math.random() * window.innerHeight * 0.7; // Mais distribuído verticalmente
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: Date.now() + Math.random(),
        x,
        y,
        color,
        particles: Array.from({ length: 25 }, () => ({
          x: 0,
          y: 0,
          vx: (Math.random() - 0.5) * 12, // Mais velocidade horizontal
          vy: (Math.random() - 0.5) * 12, // Mais velocidade vertical
          life: 1,
        })),
      };
    };

    const interval = setInterval(() => {
      setFireworks((prev) => {
        // Limita o número máximo de fogos simultâneos
        if (prev.length >= 15) {
          return prev;
        }
        return [...prev, createFirework()];
      });
    }, 200); // Mais frequente

    const animationInterval = setInterval(() => {
      setFireworks((prev) =>
        prev
          .map((fw) => ({
            ...fw,
            y: fw.y - 1, // Movimento mais lento
            particles: fw.particles
              .map((p) => ({
                ...p,
                x: p.x + p.vx,
                y: p.y + p.vy,
                vy: p.vy + 0.05, // Gravidade mais suave
                life: p.life - 0.015, // Vida mais longa
              }))
              .filter((p) => {
                // Remove partículas que saíram muito da tela
                const isInBounds =
                  p.x > -100 &&
                  p.x < window.innerWidth + 100 &&
                  p.y > -100 &&
                  p.y < window.innerHeight + 100;
                return p.life > 0 && isInBounds;
              }),
          }))
          .filter((fw) => {
            // Remove fogos que saíram da tela ou não têm partículas vivas
            const hasLiveParticles = fw.particles.some((p) => p.life > 0);
            const isInScreen = fw.y > -200 && fw.y < window.innerHeight + 200;
            return hasLiveParticles && isInScreen;
          })
      );
    }, 16);

    return () => {
      clearInterval(interval);
      clearInterval(animationInterval);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {fireworks.map((fw) => (
        <div key={fw.id} className="absolute">
          {/* Fogos subindo */}
          <div
            className="w-2 h-2 rounded-full"
            style={{
              left: fw.x,
              top: fw.y,
              backgroundColor: fw.color,
              boxShadow: `0 0 10px ${fw.color}`,
            }}
          />

          {/* Partículas explodindo */}
          {fw.particles.map((particle, index) => (
            <div
              key={index}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: fw.x + particle.x,
                top: fw.y + particle.y,
                backgroundColor: fw.color,
                opacity: particle.life,
                transform: `scale(${particle.life})`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
