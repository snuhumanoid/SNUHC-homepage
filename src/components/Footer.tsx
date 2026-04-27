'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{
      background: '#080810',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '3rem 1.5rem 2rem',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '2.5rem',
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 14, color: 'white',
              boxShadow: '0 0 16px rgba(99,102,241,0.3)',
            }}>SH</div>
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', color: '#f1f5f9' }}>
              SHAPE
            </span>
          </div>
          <p style={{ color: '#475569', fontSize: 13, maxWidth: 260, lineHeight: 1.6 }}>
            {t(
              'SNU Humanoid Club — 휴머노이드 로봇의 미래를 만들어 갑니다.',
              'SNU Humanoid Club — Shaping the future of humanoid robotics.'
            )}
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {t('탐색', 'Navigate')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '#about', ko: '소개', en: 'About' },
                { href: '#news', ko: '소식', en: 'News' },
                { href: '#history', ko: '히스토리', en: 'History' },
                { href: '#team', ko: '팀', en: 'Team' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ color: '#64748b', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#f1f5f9')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#64748b')}
                >
                  {t(link.ko, link.en)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {t('연구', 'Research')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Manipulation', 'Navigation', 'Reasoning', 'Perception'].map((r) => (
                <a
                  key={r}
                  href="#team"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ color: '#64748b', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#f1f5f9')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#64748b')}
                >
                  {r}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Social */}
        <div>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            {t('소셜', 'Social')}
          </h4>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { Icon: Github, label: 'GitHub' },
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Youtube, label: 'YouTube' },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                style={{
                  width: 40, height: 40,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#64748b', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.15)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.4)';
                  (e.currentTarget as HTMLElement).style.color = '#818cf8';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.color = '#64748b';
                }}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <p style={{ fontSize: 13, color: '#374151' }}>
          © 2024 SNU Humanoid Club SHAPE. {t('모든 권리 보유.', 'All rights reserved.')}
        </p>
        <a
          href="/admin"
          style={{ fontSize: 13, color: '#374151', textDecoration: 'none' }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#6366f1')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#374151')}
        >
          Admin
        </a>
      </div>
    </footer>
  );
}
