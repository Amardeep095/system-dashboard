import React from 'react';

export const ParticleBackground: React.FC = () => {
  // Create array of particles with random properties
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.6 + 0.2
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full w-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="border-r border-primary/30" 
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={`h-${i}`} 
              className="flex-1 border-b border-primary/30" 
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>

      {/* Floating Energy Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-primary/60 to-accent/40 animate-pulse"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s, 
                       glow-pulse ${particle.duration * 0.5}s ease-in-out infinite ${particle.delay}s`,
            filter: 'blur(0.5px)'
          }}
        />
      ))}

      {/* Larger Orb Effects */}
      <div 
        className="absolute w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse"
        style={{
          top: '20%',
          left: '10%',
          animation: 'float 8s ease-in-out infinite, glow-pulse 4s ease-in-out infinite'
        }}
      />
      
      <div 
        className="absolute w-24 h-24 rounded-full bg-accent/10 blur-3xl animate-pulse"
        style={{
          top: '60%',
          right: '15%',
          animation: 'float 12s ease-in-out infinite 2s, glow-pulse 6s ease-in-out infinite 1s'
        }}
      />
      
      <div 
        className="absolute w-40 h-40 rounded-full bg-secondary/10 blur-3xl animate-pulse"
        style={{
          bottom: '20%',
          left: '30%',
          animation: 'float 10s ease-in-out infinite 4s, glow-pulse 5s ease-in-out infinite 2s'
        }}
      />

      {/* Scanning Lines Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          style={{
            top: '30%',
            animation: 'slide-scan 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          style={{
            top: '70%',
            animation: 'slide-scan 12s ease-in-out infinite 4s'
          }}
        />
      </div>

    </div>
  );
};