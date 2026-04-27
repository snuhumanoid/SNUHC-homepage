'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';
import { MemberRole } from '@/lib/types';
import { User } from 'lucide-react';

const ROLE_CONFIG: Record<MemberRole, { labelKo: string; labelEn: string; color: string; bg: string }> = {
  executive:   { labelKo: '임원진',          labelEn: 'Executive',          color: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
  management:  { labelKo: 'Management',      labelEn: 'Management',         color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  manipulation:{ labelKo: 'Manipulation',    labelEn: 'Manipulation',       color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  navigation:  { labelKo: 'Navigation',      labelEn: 'Navigation',         color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  reasoning:   { labelKo: 'Reasoning',       labelEn: 'Reasoning',          color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
  perception:  { labelKo: 'Perception',      labelEn: 'Perception',         color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
  director:    { labelKo: '지도교수',         labelEn: 'Advisory Professor', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  mentor:      { labelKo: '멘토',             labelEn: 'Mentor',             color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
  alumni:      { labelKo: '졸업생',           labelEn: 'Alumni',             color: '#64748b', bg: 'rgba(100,116,139,0.12)' },
};

// 전체 탭에서 보여줄 순서: 임원 → 팀원(4개) → 교수 → 멘토 → 졸업생
const ROLE_ORDER: Record<MemberRole, number> = {
  executive:    1,
  management:   2,
  manipulation: 3,
  navigation:   4,
  reasoning:    5,
  perception:   6,
  director:     7,
  mentor:       8,
  alumni:       9,
};

const TABS: { key: MemberRole | 'all'; labelKo: string; labelEn: string }[] = [
  { key: 'all',          labelKo: '전체',         labelEn: 'All' },
  { key: 'executive',    labelKo: '임원진',        labelEn: 'Executives' },
  { key: 'management',   labelKo: 'Management',   labelEn: 'Management' },
  { key: 'manipulation', labelKo: 'Manipulation', labelEn: 'Manipulation' },
  { key: 'navigation',   labelKo: 'Navigation',   labelEn: 'Navigation' },
  { key: 'reasoning',    labelKo: 'Reasoning',    labelEn: 'Reasoning' },
  { key: 'perception',   labelKo: 'Perception',   labelEn: 'Perception' },
  { key: 'director',     labelKo: '지도교수',      labelEn: 'Advisory Professor' },
  { key: 'mentor',       labelKo: '멘토',          labelEn: 'Mentors' },
  { key: 'alumni',       labelKo: '졸업생',        labelEn: 'Alumni' },
];

const AVATAR_COLORS = [
  ['#6366f1', '#8b5cf6'],
  ['#8b5cf6', '#06b6d4'],
  ['#06b6d4', '#10b981'],
  ['#f59e0b', '#ef4444'],
  ['#10b981', '#6366f1'],
];

export default function Team() {
  const { t } = useLanguage();
  const { data } = useData();
  const [activeTab, setActiveTab] = useState<MemberRole | 'all'>('management');

  const filtered = activeTab === 'all'
    ? [...data.members].sort(
        (a, b) =>
          (ROLE_ORDER[a.role] ?? 99) - (ROLE_ORDER[b.role] ?? 99) ||
          (a.order ?? 0) - (b.order ?? 0)
      )
    : data.members.filter((m) => m.role === activeTab);

  return (
    <section
      id="team"
      style={{
        padding: '7rem 1.5rem',
        background: 'rgba(99,102,241,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
            color: '#6366f1', marginBottom: '1rem', textTransform: 'uppercase',
          }}>
            {t('팀원', 'Team')}
          </p>
          <h2 className="section-title" style={{ color: '#f1f5f9' }}>
            {t('우리 ', 'Meet the ')}
            <span className="gradient-text">{t('팀', 'Team')}</span>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          marginBottom: '3rem',
        }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 999,
                  border: isActive
                    ? '1px solid rgba(99,102,241,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))'
                    : 'transparent',
                  color: isActive ? '#818cf8' : '#64748b',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {t(tab.labelKo, tab.labelEn)}
              </button>
            );
          })}
        </div>

        {/* Member grid */}
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>
            {t('멤버가 없습니다.', 'No members available.')}
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.25rem',
          }}>
            {filtered.map((member, idx) => {
              const conf = ROLE_CONFIG[member.role];
              const avatarColors = AVATAR_COLORS[idx % AVATAR_COLORS.length];
              const initials = member.nameKo.slice(0, 1) + (member.nameKo.length > 1 ? member.nameKo.slice(-1) : '');

              return (
                <div key={member.id} className="member-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  {/* Avatar */}
                  <div style={{
                    width: 80, height: 80,
                    borderRadius: '50%',
                    background: member.imageUrl
                      ? `url(${member.imageUrl}) center/cover`
                      : `linear-gradient(135deg, ${avatarColors[0]}, ${avatarColors[1]})`,
                    margin: '0 auto 1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, fontWeight: 900, color: 'white',
                    boxShadow: `0 0 20px ${avatarColors[0]}40`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.nameKo} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    ) : (
                      initials || <User size={32} />
                    )}
                  </div>

                  {/* Role badge */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '2px 10px', borderRadius: 999,
                    background: conf.bg,
                    border: `1px solid ${conf.color}30`,
                    fontSize: 11, fontWeight: 700,
                    color: conf.color, letterSpacing: '0.05em',
                    marginBottom: '0.75rem',
                  }}>
                    {t(conf.labelKo, conf.labelEn)}
                  </div>

                  {/* Name */}
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>
                    {t(member.nameKo, member.nameEn)}
                  </h3>

                  {/* Title */}
                  <p style={{ fontSize: 13, color: '#818cf8', fontWeight: 500, marginBottom: 4 }}>
                    {t(member.titleKo, member.titleEn)}
                  </p>

                  {/* Affiliation */}
                  <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                    {t(member.affiliationKo, member.affiliationEn)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
