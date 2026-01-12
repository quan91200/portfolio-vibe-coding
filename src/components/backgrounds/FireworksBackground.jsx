import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useBackground } from '../../context/BackgroundContext';

// --- Utility Helpers ---
const random = (min, max) => Math.random() * (max - min) + min;
const randomColor = () => {
  const colors = ['#ff4b5c', '#ffae00', '#9b59b6', '#3498db', '#1abc9c', '#f1c40f', '#e67e22', '#e74c3c'];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Particle class - handles individual points in an explosion or trail
 */
class Particle {
  constructor(x, y, vx, vy, size, color, life, isTrail = false, isSmoke = false, enableGlow = true) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.color = color;
    this.life = life; // seconds
    this.age = 0;
    this.isTrail = isTrail;
    this.isSmoke = isSmoke;
    this.gravity = isTrail || isSmoke ? 0.02 : 0.05;
    this.friction = isSmoke ? 0.95 : 0.98;
    this.enableGlow = enableGlow;
  }

  update(dt) {
    this.age += dt;
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx * dt * 60;
    this.y += this.vy * dt * 60;
  }

  draw(ctx) {
    const alpha = Math.max(1 - this.age / this.life, 0);
    ctx.globalAlpha = alpha;

    if (this.isSmoke) {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
      gradient.addColorStop(0, `rgba(200, 200, 200, ${alpha * 0.4})`);
      gradient.addColorStop(1, 'rgba(200, 200, 200, 0)');
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = this.color;
      if (!this.isTrail && this.enableGlow) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    if (this.enableGlow) ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  isAlive() {
    return this.age < this.life;
  }
}

/**
 * Firework class - handles launch, trail and explosion trigger
 */
class Firework {
  constructor(startX, startY, targetX, targetY, color, onExplode, trailFadeTime = 2.5) {
    this.x = startX;
    this.y = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.color = color;
    this.onExplode = onExplode;
    this.color = color;
    this.onExplode = onExplode;
    this.trailFadeTime = trailFadeTime;
    this.enableGlow = typeof window !== 'undefined' && window.innerWidth > 768;

    const angle = Math.atan2(targetY - startY, targetX - startX);
    const distance = Math.sqrt((targetX - startX) ** 2 + (targetY - startY) ** 2);
    this.speed = distance / (1.2 * 60); // Roughly 1.2s arrival
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;

    this.trail = [];
    this.exploded = false;
    this.smokeTimer = 0;
  }

  update(dt) {
    if (this.exploded) return;

    this.x += this.vx * dt * 60;
    this.y += this.vy * dt * 60;

    // Add trail/smoke using the configured fade time
    this.smokeTimer += dt;
    if (this.smokeTimer > 0.05) {
      // Smoke particles: use 20% of trail fade time
      this.trail.push(new Particle(this.x, this.y, random(-0.5, 0.5), random(0.5, 1.5), random(4, 8), '#ffffff', this.trailFadeTime * 0.2, false, true, false)); // No glow for smoke
      this.smokeTimer = 0;
    }
    // Trail particles: use 15% of trail fade time for quick trail
    this.trail.push(new Particle(this.x, this.y, 0, 0, 2, this.color, this.trailFadeTime * 0.15, true, false, this.enableGlow));

    // Check if reached target
    if (this.y <= this.targetY) {
      this.exploded = true;
      this.onExplode(this.x, this.y, this.color);
    }

    this.trail = this.trail.filter(p => p.isAlive());
    this.trail.forEach(p => p.update(dt));
  }

  draw(ctx) {
    this.trail.forEach(p => p.draw(ctx));
    if (!this.exploded) {
      ctx.fillStyle = '#fff';
      if (this.enableGlow) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fill();
      if (this.enableGlow) ctx.shadowBlur = 0;
    }
  }

  isAlive() {
    return !this.exploded || this.trail.length > 0;
  }
}

// --- Component ---
const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: ${props => props.$clickable ? 'auto' : 'none'};
`;

const FireworksBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const { fireworksSettings } = useBackground();
  const isDark = theme === 'dark';

  const fireworksRef = useRef([]);
  const particlesRef = useRef([]);

  // Debug: Log settings changes
  useEffect(() => {
    console.log('🎆 Fireworks Settings Updated:', fireworksSettings);
  }, [fireworksSettings]);

  // Helper to create text particles from canvas
  const createTextBurst = useCallback((ctx, char, x, y, color, fadeTime) => {
    const fontSize = 120;
    const offscreen = document.createElement('canvas');
    offscreen.width = fontSize * 1.5;
    offscreen.height = fontSize * 1.5;
    const oCtx = offscreen.getContext('2d');

    oCtx.font = `bold ${fontSize}px "Outfit", sans-serif`;
    oCtx.textAlign = 'center';
    oCtx.textBaseline = 'middle';
    oCtx.fillStyle = '#ffffff';
    oCtx.fillText(char, offscreen.width / 2, offscreen.height / 2);

    const imgData = oCtx.getImageData(0, 0, offscreen.width, offscreen.height);
    const newParticles = [];
    const isMobile = window.innerWidth < 768;
    // Reduce particle count on mobile by increasing step
    const step = isMobile ? 10 : 6;

    for (let i = 0; i < imgData.width; i += step) {
      for (let j = 0; j < imgData.height; j += step) {
        const index = (j * imgData.width + i) * 4 + 3;
        if (imgData.data[index] > 128) {
          const px = x + (i - offscreen.width / 2);
          const py = y + (j - offscreen.height / 2);
          const vx = (Math.random() - 0.5) * 2;
          const vy = (Math.random() - 0.5) * 2;
          // No glow for text particles on mobile
          newParticles.push(new Particle(px, py, vx, vy, 2.5, color, fadeTime, false, false, !isMobile));
        }
      }
    }
    return newParticles;
  }, []);

  const launchFirework = useCallback((tx, ty, color, isText = false, char = '') => {
    const sx = random(0.1, 0.9) * window.innerWidth;
    const sy = window.innerHeight;
    const fadeTime = fireworksSettings.trailFadeTime || 2.5;

    const fw = new Firework(sx, sy, tx, ty, color, (ex, ey, col) => {
      // Explosion logic
      const explosionParticles = [];

      if (isText && char) {
        const ctx = canvasRef.current.getContext('2d');
        explosionParticles.push(...createTextBurst(ctx, char, ex, ey, col, fadeTime));
      } else {
        // Normal burst
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 20 : 40;
        const enableGlow = !isMobile;
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          const speed = random(2, 6);
          explosionParticles.push(new Particle(ex, ey, Math.cos(angle) * speed, Math.sin(angle) * speed, 2.5, col, fadeTime, false, false, enableGlow));
        }
      }

      particlesRef.current.push(...explosionParticles);
    }, fadeTime); // Explosion callback - pass fadeTime to Firework constructor

    fireworksRef.current.push(fw);
  }, [fireworksSettings.trailFadeTime, createTextBurst]);

  // Click handler
  useEffect(() => {
    if (!fireworksSettings.enableClickFirework) return;

    const handleMouse = (e) => {
      launchFirework(e.clientX, e.clientY, randomColor());
    };

    window.addEventListener('mousedown', handleMouse);
    return () => window.removeEventListener('mousedown', handleMouse);
  }, [fireworksSettings.enableClickFirework, launchFirework]);

  // Auto firework with customizable frequency
  useEffect(() => {
    if (!fireworksSettings.enableAutoFirework) return;

    const perMinute = fireworksSettings.autoFirePerMinute || 15;
    const interval = setInterval(() => {
      const tx = random(0.1, 0.9) * window.innerWidth;
      const ty = random(0.2, 0.5) * window.innerHeight;
      launchFirework(tx, ty, randomColor());
    }, (60 / perMinute) * 1000);

    return () => clearInterval(interval);
  }, [fireworksSettings.enableAutoFirework, fireworksSettings.autoFirePerMinute, launchFirework]);

  // HAPPY NEW YEAR sequence - simultaneous launch for maximum effect
  useEffect(() => {
    if (!fireworksSettings.enableHappyNewYear) return;

    const runSequence = () => {
      const text = "HAPPY NEW YEAR";
      const chars = text.split("").filter(c => c !== " ");

      // Launch fireworks with minimal delays to prevent stuttering
      chars.forEach((c, i) => {
        setTimeout(() => {
          const tx = (0.15 + (i * 0.05)) * window.innerWidth;
          const ty = random(0.3, 0.45) * window.innerHeight;
          launchFirework(tx, ty, '#f1c40f', true, c);
        }, i * 20); // 20ms delay between each letter for smoother effect
      });
    };

    runSequence();
    const perHour = fireworksSettings.happyNewYearPerHour || 1;
    const interval = setInterval(runSequence, (60 / perHour) * 60 * 1000);
    return () => clearInterval(interval);
  }, [fireworksSettings.enableHappyNewYear, fireworksSettings.happyNewYearPerHour, launchFirework]);

  // Year text sequence - simultaneous launch
  useEffect(() => {
    if (!fireworksSettings.enableYearText) return;

    const runSequence = () => {
      const text = fireworksSettings.year || "2026";
      const chars = text.split("");

      // Launch year digits with minimal delays for smooth effect
      chars.forEach((c, i) => {
        setTimeout(() => {
          const tx = (0.35 + (i * 0.1)) * window.innerWidth;
          const ty = random(0.2, 0.35) * window.innerHeight;
          launchFirework(tx, ty, '#e74c3c', true, c);
        }, i * 20); // 20ms delay between each digit for smoother effect
      });
    };

    runSequence();
    const perHour = fireworksSettings.yearTextPerHour || 1;
    const interval = setInterval(runSequence, (60 / perHour) * 60 * 1000);
    return () => clearInterval(interval);
  }, [fireworksSettings.enableYearText, fireworksSettings.yearTextPerHour, fireworksSettings.year, launchFirework]);

  // Main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let lastTime = performance.now();
    let rafId;

    const loop = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & Draw
      fireworksRef.current = fireworksRef.current.filter(fw => fw.isAlive());
      fireworksRef.current.forEach(fw => {
        fw.update(dt);
        fw.draw(ctx);
      });

      particlesRef.current = particlesRef.current.filter(p => p.isAlive());
      particlesRef.current.forEach(p => {
        p.update(dt);
        p.draw(ctx);
      });

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Canvas
        ref={canvasRef}
        $clickable={fireworksSettings.enableClickFirework}
      />
      {/* Background layer */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: isDark
          ? 'linear-gradient(to bottom, #020617 0%, #0a0a1a 100%)'
          : 'linear-gradient(to bottom, #E0F6FF 0%, #87CEEB 50%, #4682B4 100%)',
        zIndex: -1
      }} />
    </>
  );
};

export default FireworksBackground;
