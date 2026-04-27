'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';
import { Calendar, Tag, X, ArrowRight } from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  Recruitment: '#6366f1',
  Research: '#8b5cf6',
  Award: '#f59e0b',
  Event: '#10b981',
  Default: '#64748b',
};

export default function News() {
  const { t } = useLanguage();
  const { data } = useData();
  const [selected, setSelected] = useState<string | null>(null);

  const sorted = [...data.news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const selectedItem = sorted.find((n) => n.id === selected);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section id="news" style={{ padding: '7rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          color: '#6366f1', marginBottom: '1rem', textTransform: 'uppercase',
        }}>
          {t('최근 소식', 'News')}
        </p>
        <h2 className="section-title" style={{ color: '#f1f5f9' }}>
          {t('최신 ', 'Latest ')}
          <span className="gradient-text">{t('뉴스 & 소식', 'News & Updates')}</span>
        </h2>
      </div>

      {sorted.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#64748b' }}>
          {t('소식이 없습니다.', 'No news available.')}
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {sorted.map((item) => {
            const color = CATEGORY_COLORS[item.category] ?? CATEGORY_COLORS.Default;
            return (
              <div
                key={item.id}
                className="news-card"
                onClick={() => setSelected(item.id)}
                style={{ padding: '1.75rem' }}
              >
                {/* Category badge */}
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 10px',
                    borderRadius: 999,
                    background: `${color}18`,
                    border: `1px solid ${color}40`,
                    fontSize: 11, fontWeight: 700,
                    color, letterSpacing: '0.05em',
                  }}>
                    <Tag size={10} />
                    {item.category}
                  </span>
                </div>

                <h3 style={{
                  fontSize: 17, fontWeight: 700,
                  color: '#f1f5f9', lineHeight: 1.4,
                  marginBottom: '0.75rem',
                }}>
                  {t(item.titleKo, item.titleEn)}
                </h3>

                <p style={{
                  fontSize: 14, color: '#94a3b8', lineHeight: 1.6,
                  marginBottom: '1.25rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {t(item.contentKo, item.contentEn)}
                </p>

                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 13 }}>
                    <Calendar size={13} />
                    {formatDate(item.date)}
                  </div>
                  <div style={{ color: '#6366f1', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600 }}>
                    {t('더 보기', 'Read more')} <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#12121a',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 20,
              padding: '2.5rem',
              maxWidth: 640,
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute', top: 16, right: 16,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, padding: 6,
                color: '#94a3b8', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: '1rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '3px 10px', borderRadius: 999,
                background: `${CATEGORY_COLORS[selectedItem.category] ?? CATEGORY_COLORS.Default}18`,
                border: `1px solid ${CATEGORY_COLORS[selectedItem.category] ?? CATEGORY_COLORS.Default}40`,
                fontSize: 11, fontWeight: 700,
                color: CATEGORY_COLORS[selectedItem.category] ?? CATEGORY_COLORS.Default,
              }}>
                {selectedItem.category}
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.3, marginBottom: '0.75rem' }}>
              {t(selectedItem.titleKo, selectedItem.titleEn)}
            </h2>

            <p style={{ fontSize: 13, color: '#475569', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={13} />
              {formatDate(selectedItem.date)}
            </p>

            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15 }}>
              {t(selectedItem.contentKo, selectedItem.contentEn)}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
