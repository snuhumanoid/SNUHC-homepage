'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

const SHAPE_LETTERS = [
  { letter: 'S', meaning: { ko: 'Science', en: 'Science' } },
  { letter: 'H', meaning: { ko: 'Humanoid', en: 'Humanoid' } },
  { letter: 'A', meaning: { ko: 'Autonomous', en: 'Autonomous' } },
  { letter: 'P', meaning: { ko: 'Platform', en: 'Platform' } },
  { letter: 'E', meaning: { ko: 'Engineering', en: 'Engineering' } },
];

export default function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const animRef = useRef<number>(0);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();
      });

      // Lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)',
      }}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Grid overlay */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '2rem 1.5rem',
          maxWidth: 800,
        }}
      >
        {/* Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: 999,
          background: 'rgba(99,102,241,0.12)',
          border: '1px solid rgba(99,102,241,0.3)',
          marginBottom: '2rem',
          fontSize: 13,
          fontWeight: 600,
          color: '#818cf8',
          letterSpacing: '0.05em',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#6366f1',
            boxShadow: '0 0 8px #6366f1',
            animation: 'pulse 2s infinite',
          }} />
          SNU Humanoid Club
        </div>

        {/* SHAPE Letters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(0.5rem, 2vw, 1.5rem)',
          marginBottom: '1.5rem',
        }}>
          {SHAPE_LETTERS.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'default',
                transition: 'transform 0.3s ease',
                transform: hovered === i ? 'translateY(-8px) scale(1.1)' : 'none',
              }}
            >
              <span style={{
                fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                backgroundImage: hovered === i
                  ? 'linear-gradient(135deg, #818cf8, #c084fc)'
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                transition: 'all 0.3s ease',
                filter: hovered === i ? 'drop-shadow(0 0 20px rgba(99,102,241,0.6))' : 'none',
              }}>
                {item.letter}
              </span>
              <span style={{
                fontSize: 11,
                fontWeight: 500,
                color: hovered === i ? '#818cf8' : 'transparent',
                transition: 'color 0.3s ease',
                letterSpacing: '0.05em',
                marginTop: 4,
              }}>
                {item.meaning.en}
              </span>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: '#94a3b8',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
          fontWeight: 400,
        }}>
          {t(
            '서울대학교 휴머노이드 로봇 동아리 — 인간을 닮은 로봇의 미래를 만들어갑니다',
            'Seoul National University Humanoid Robotics Club — Shaping the future of humanoid robots'
          )}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={scrollToAbout}>
            {t('동아리 소개 보기', 'Learn More')}
            <ChevronDown size={16} />
          </button>
          <button
            className="btn-secondary"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('연락하기', 'Contact Us')}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: '#475569',
          cursor: 'pointer',
        }}
        onClick={scrollToAbout}
      >
        <span style={{ fontSize: 12, letterSpacing: '0.1em', fontWeight: 500 }}>SCROLL</span>
        <div style={{
          width: 24, height: 36,
          border: '1.5px solid rgba(255,255,255,0.15)',
          borderRadius: 12,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            width: 4, height: 8,
            background: '#6366f1',
            borderRadius: 2,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 4,
            animation: 'scrollIndicator 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollIndicator {
          0% { top: 4px; opacity: 1; }
          100% { top: 20px; opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
