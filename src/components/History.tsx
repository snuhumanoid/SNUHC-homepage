'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';

const MONTHS_KO = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function History() {
  const { t, language } = useLanguage();
  const { data } = useData();

  return (
    <section
      id="history"
      style={{
        padding: '7rem 1.5rem',
        background: 'rgba(99,102,241,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
            color: '#6366f1', marginBottom: '1rem', textTransform: 'uppercase',
          }}>
            {t('연혁', 'History')}
          </p>
          <h2 className="section-title" style={{ color: '#f1f5f9' }}>
            {t('우리의 ', 'Our ')}
            <span className="gradient-text">{t('발자취', 'Journey')}</span>
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '3rem' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '6px',
            top: 0, bottom: 0,
            width: 2,
            background: 'linear-gradient(to bottom, #6366f1, rgba(99,102,241,0.1))',
          }} />

          {data.history.length === 0 ? (
            <p style={{ color: '#64748b' }}>{t('히스토리가 없습니다.', 'No history available.')}</p>
          ) : (
            data.history.map((item, i) => (
              <div
                key={item.id}
                style={{
                  position: 'relative',
                  marginBottom: i < data.history.length - 1 ? '3rem' : 0,
                  opacity: 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {/* Dot */}
                <div className="timeline-dot" />

                {/* Content */}
                <div
                  className="glass glass-hover"
                  style={{ padding: '1.5rem 2rem', borderRadius: 16 }}
                >
                  {/* Date */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    marginBottom: '0.75rem',
                  }}>
                    <span style={{
                      fontSize: 13, fontWeight: 700,
                      color: '#6366f1',
                      background: 'rgba(99,102,241,0.12)',
                      border: '1px solid rgba(99,102,241,0.25)',
                      padding: '2px 10px', borderRadius: 999,
                    }}>
                      {item.year}
                      {item.month ? `. ${language === 'ko' ? MONTHS_KO[item.month - 1] : MONTHS_EN[item.month - 1]}` : ''}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: 18, fontWeight: 700,
                    color: '#f1f5f9', marginBottom: '0.5rem',
                  }}>
                    {t(item.titleKo, item.titleEn)}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
                    {t(item.descriptionKo, item.descriptionEn)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
