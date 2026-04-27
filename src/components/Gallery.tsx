'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const PLACEHOLDER_COLORS = [
  ['#6366f1', '#8b5cf6'],
  ['#8b5cf6', '#06b6d4'],
  ['#06b6d4', '#10b981'],
  ['#f59e0b', '#ef4444'],
  ['#10b981', '#6366f1'],
  ['#ef4444', '#f59e0b'],
];

export default function Gallery() {
  const { t } = useLanguage();
  const { data } = useData();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const items = data.gallery;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

  const prev = () => setLightboxIdx((i) => (i !== null ? Math.max(0, i - 1) : 0));
  const next = () => setLightboxIdx((i) => (i !== null ? Math.min(items.length - 1, i + 1) : 0));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') setLightboxIdx(null);
  };

  return (
    <section id="gallery" style={{ padding: '7rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          color: '#6366f1', marginBottom: '1rem', textTransform: 'uppercase',
        }}>
          {t('활동 갤러리', 'Gallery')}
        </p>
        <h2 className="section-title" style={{ color: '#f1f5f9' }}>
          {t('우리의 ', 'Our ')}
          <span className="gradient-text">{t('순간들', 'Moments')}</span>
        </h2>
      </div>

      {items.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#64748b' }}>
          {t('갤러리 사진이 없습니다.', 'No gallery items available.')}
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {items.map((item, idx) => {
            const colors = PLACEHOLDER_COLORS[idx % PLACEHOLDER_COLORS.length];
            return (
              <div
                key={item.id}
                onClick={() => setLightboxIdx(idx)}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#12121a',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(99,102,241,0.2)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                {/* Image / Placeholder */}
                <div style={{
                  width: '100%',
                  paddingBottom: '66%',
                  position: 'relative',
                  background: item.imageUrl
                    ? `url(${item.imageUrl}) center/cover`
                    : `linear-gradient(135deg, ${colors[0]}30, ${colors[1]}30)`,
                  overflow: 'hidden',
                }}>
                  {!item.imageUrl && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 48,
                    }}>
                      🤖
                    </div>
                  )}
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={t(item.titleKo, item.titleEn)}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>
                    {t(item.titleKo, item.titleEn)}
                  </h3>
                  <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {t(item.descriptionKo, item.descriptionEn)}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#475569', fontSize: 12 }}>
                    <Calendar size={12} />
                    {formatDate(item.date)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && items[lightboxIdx] && (
        <div
          onClick={() => setLightboxIdx(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
            outline: 'none',
          }}
        >
          <button
            onClick={() => setLightboxIdx(null)}
            style={{
              position: 'fixed', top: 20, right: 20,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10, padding: 8,
              color: '#f1f5f9', cursor: 'pointer',
              display: 'flex',
            }}
          >
            <X size={20} />
          </button>

          {lightboxIdx > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{
                position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10, padding: 10,
                color: '#f1f5f9', cursor: 'pointer',
                display: 'flex',
              }}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {lightboxIdx < items.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10, padding: 10,
                color: '#f1f5f9', cursor: 'pointer',
                display: 'flex',
              }}
            >
              <ChevronRight size={20} />
            </button>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 700, width: '100%' }}
          >
            {/* Image */}
            <div style={{
              width: '100%', paddingBottom: '62%',
              position: 'relative',
              borderRadius: 16, overflow: 'hidden',
              background: `linear-gradient(135deg, ${PLACEHOLDER_COLORS[lightboxIdx % PLACEHOLDER_COLORS.length][0]}30, ${PLACEHOLDER_COLORS[lightboxIdx % PLACEHOLDER_COLORS.length][1]}30)`,
              marginBottom: '1.25rem',
            }}>
              {items[lightboxIdx].imageUrl ? (
                <img
                  src={items[lightboxIdx].imageUrl}
                  alt={items[lightboxIdx].titleKo}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72 }}>
                  🤖
                </div>
              )}
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 8 }}>
              {t(items[lightboxIdx].titleKo, items[lightboxIdx].titleEn)}
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 12 }}>
              {t(items[lightboxIdx].descriptionKo, items[lightboxIdx].descriptionEn)}
            </p>
            <p style={{ fontSize: 13, color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={13} />
              {formatDate(items[lightboxIdx].date)}
            </p>

            <div style={{ textAlign: 'center', marginTop: 16, color: '#475569', fontSize: 13 }}>
              {lightboxIdx + 1} / {items.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
