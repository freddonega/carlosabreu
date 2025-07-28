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
      "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", 
      "#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"
    ];

    const createFirework = (): Firework => {
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        id: Date.now() + Math.random(),
        x,
        y,
        color,
        particles: Array.from({ length: 20 }, () => ({
          x: 0,
          y: 0,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 1,
        })),
      };
    };

    const interval = setInterval(() => {
      setFireworks(prev => [...prev, createFirework()]);
    }, 300);

    const animationInterval = setInterval(() => {
      setFireworks(prev => 
        prev
          .map(fw => ({
            ...fw,
            y: fw.y - 2,
            particles: fw.particles.map(p => ({
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              vy: p.vy + 0.1,
              life: p.life - 0.02,
            })),
          }))
          .filter(fw => fw.y > -100 && fw.particles.some(p => p.life > 0))
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
      {fireworks.map(fw => (
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