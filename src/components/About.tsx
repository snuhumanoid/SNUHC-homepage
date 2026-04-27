'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Bot, Brain, Cpu, Zap } from 'lucide-react';

const PILLARS = [
  {
    icon: Bot,
    titleKo: 'Manipulation',
    titleEn: 'Manipulation',
    descKo: '정밀한 로봇 팔 제어와 물체 조작 기술 연구',
    descEn: 'Precision robotic arm control and object manipulation',
    color: '#6366f1',
  },
  {
    icon: Zap,
    titleKo: 'Navigation',
    titleEn: 'Navigation',
    descKo: '동적 환경에서의 자율 이동 및 경로 계획',
    descEn: 'Autonomous locomotion and path planning in dynamic environments',
    color: '#8b5cf6',
  },
  {
    icon: Brain,
    titleKo: 'Reasoning',
    titleEn: 'Reasoning',
    descKo: '고수준 작업 계획 및 논리적 추론 알고리즘',
    descEn: 'High-level task planning and logical reasoning algorithms',
    color: '#06b6d4',
  },
  {
    icon: Cpu,
    titleKo: 'Perception',
    titleEn: 'Perception',
    descKo: '컴퓨터 비전 및 환경 인지 시스템 개발',
    descEn: 'Computer vision and environment perception systems',
    color: '#10b981',
  },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" style={{ padding: '7rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          color: '#6366f1', marginBottom: '1rem', textTransform: 'uppercase',
        }}>
          {t('동아리 소개', 'About Us')}
        </p>
        <h2 className="section-title" style={{ marginBottom: '1.5rem', color: '#f1f5f9' }}>
          {t('휴머노이드 로봇의 ', 'Shaping the Future of ')}
          <span className="gradient-text">
            {t('미래를 만들다', 'Humanoid Robotics')}
          </span>
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: '#94a3b8',
          lineHeight: 1.8,
          maxWidth: 680,
          margin: '0 auto',
        }}>
          {t(
            'SNU Humanoid Club SHAPE는 서울대학교 자율로봇지능 연구실과 협력하여 휴머노이드 로봇 기술을 연구하는 동아리입니다. 조작, 내비게이션, 추론, 인지의 네 가지 분야에서 인간형 로봇의 자율성과 지능을 높이는 연구를 수행합니다.',
            'SNU Humanoid Club SHAPE is a research club working in collaboration with the SNU Autonomous Robot Intelligence Lab. We conduct research to enhance the autonomy and intelligence of humanoid robots across four key domains: manipulation, navigation, reasoning, and perception.'
          )}
        </p>
      </div>

      {/* Research pillars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
      }}>
        {PILLARS.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <div
              key={i}
              className="glass glass-hover"
              style={{ padding: '2rem', borderRadius: 16 }}
            >
              <div style={{
                width: 52, height: 52,
                borderRadius: 14,
                background: `${pillar.color}18`,
                border: `1px solid ${pillar.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <Icon size={24} color={pillar.color} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: '0.5rem', color: '#f1f5f9' }}>
                {t(pillar.titleKo, pillar.titleEn)}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
                {t(pillar.descKo, pillar.descEn)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem',
        marginTop: '3rem',
        padding: '2.5rem',
        background: 'rgba(99,102,241,0.05)',
        borderRadius: 20,
        border: '1px solid rgba(99,102,241,0.15)',
      }}>
        {[
          { num: '2025', label: { ko: '창설 연도', en: 'Founded' } },
          { num: '40+', label: { ko: '현 부원', en: 'Members' } },
          // { num: '1+', label: { ko: '연구 논문', en: 'Papers' } },
          // { num: '1+', label: { ko: '수상 실적', en: 'Awards' } },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 900,
              backgroundImage: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              {stat.num}
            </div>
            <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>
              {t(stat.label.ko, stat.label.en)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
