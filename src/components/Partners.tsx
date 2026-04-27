'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';

export default function Partners() {
  const { t } = useLanguage();

  return (
    <section
      id="partners"
      style={{
        padding: '5rem 1.5rem',
        background: 'rgba(99,102,241,0.03)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{
          textAlign: 'center',
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          color: '#6366f1', marginBottom: '3rem', textTransform: 'uppercase',
        }}>
          {t('지원 기관', 'Supporting Organizations')}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          {/* SNU ARI Lab */}
          {/* SNU 자율로봇지능 연구실 */}
          <a
            href="https://robot.snu.ac.kr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="glass glass-hover"
              style={{
                padding: '2rem 3rem',
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                cursor: 'pointer',
                maxWidth: 560,
              }}
            >
              <div style={{
                width: 80, height: 80,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #003876, #0066cc)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 24px rgba(0,60,150,0.3)',
              }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: 24, letterSpacing: '-0.02em' }}>
                  SNU
                </span>
              </div>

              <div>
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: '#6366f1', letterSpacing: '0.1em',
                  textTransform: 'uppercase', marginBottom: 6,
                }}>
                  Seoul National University
                </div>
                <h3 style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                  fontWeight: 700,
                  color: '#f1f5f9',
                  lineHeight: 1.3,
                  marginBottom: 8,
                }}>
                  {t('자율로봇지능 연구실', 'Autonomous Robot Intelligence Lab')}
                </h3>
                <p style={{ fontSize: 13, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                  robot.snu.ac.kr
                  <ExternalLink size={12} />
                </p>
              </div>
            </div>
          </a>

          {/* 서울대 RISE 사업단 */}
          <a
            href="https://rise.snu.ac.kr/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="glass glass-hover"
              style={{
                padding: '2rem 3rem',
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                cursor: 'pointer',
                maxWidth: 560,
              }}
            >
              <div style={{
                width: 80, height: 80,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #003876, #0066cc)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 24px rgba(0,60,150,0.3)',
              }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: 18, letterSpacing: '-0.02em' }}>
                  RISE
                </span>
              </div>

              <div>
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: '#6366f1', letterSpacing: '0.1em',
                  textTransform: 'uppercase', marginBottom: 6,
                }}>
                  Seoul National University
                </div>
                <h3 style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                  fontWeight: 700,
                  color: '#f1f5f9',
                  lineHeight: 1.3,
                  marginBottom: 8,
                }}>
                  {t('서울대 RISE 사업단', 'SNU RISE Project')}
                </h3>
                <p style={{ fontSize: 13, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                  rise.snu.ac.kr
                  <ExternalLink size={12} />
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
