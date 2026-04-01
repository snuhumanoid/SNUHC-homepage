'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  const contacts = [
    {
      icon: MapPin,
      labelKo: '주소',
      labelEn: 'Address',
      valueKo: '서울특별시 관악구 관악로 1, 서울대학교 301동',
      valueEn: '1 Gwanak-ro, Gwanak-gu, Seoul, SNU Building 301',
      color: '#6366f1',
    },
    {
      icon: Phone,
      labelKo: '전화',
      labelEn: 'Phone',
      valueKo: '+82 10-9276-4775',
      valueEn: '+82 10-9276-4775',
      color: '#8b5cf6',
    },
    {
      icon: Mail,
      labelKo: '이메일',
      labelEn: 'Email',
      valueKo: 'snuhumanoid@gmail.com',
      valueEn: 'snuhumanoid@gmail.com',
      color: '#06b6d4',
    },
  ];

  return (
    <section id="contact" style={{ padding: '7rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
          color: '#6366f1', marginBottom: '1rem', textTransform: 'uppercase',
        }}>
          {t('연락처', 'Contact')}
        </p>
        <h2 className="section-title" style={{ color: '#f1f5f9' }}>
          {t('함께 ', 'Get in ')}
          <span className="gradient-text">{t('만들어갑시다', 'Touch')}</span>
        </h2>
        <p style={{ color: '#94a3b8', marginTop: '1rem', fontSize: '1.05rem' }}>
          {t(
            '동아리 가입, 협업, 질문 등 무엇이든 편하게 연락해 주세요.',
            'Feel free to reach out for club membership, collaboration, or any inquiries.'
          )}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        alignItems: 'start',
      }}>
        {/* Contact info */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {contacts.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="glass glass-hover"
                  style={{ padding: '1.5rem', borderRadius: 16, display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
                >
                  <div style={{
                    width: 44, height: 44, flexShrink: 0,
                    borderRadius: 12,
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={20} color={item.color} />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', marginBottom: 4, textTransform: 'uppercase' }}>
                      {t(item.labelKo, item.labelEn)}
                    </p>
                    <p style={{ color: '#f1f5f9', fontWeight: 500, fontSize: 15 }}>
                      {t(item.valueKo, item.valueEn)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map placeholder */}
          <div style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))',
            padding: '3rem',
            textAlign: 'center',
          }}>
            <MapPin size={40} color="#6366f1" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: '#94a3b8', fontSize: 14 }}>
              {t('서울대학교 관악캠퍼스', 'SNU Gwanak Campus')}
            </p>
            <p style={{ color: '#475569', fontSize: 12, marginTop: 4 }}>
              Seoul National University
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div
          className="glass"
          style={{ padding: '2.5rem', borderRadius: 20 }}
        >
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem' }}>
            {t('메시지 보내기', 'Send a Message')}
          </h3>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: '2rem' }}>
            {t('24시간 내에 답변 드립니다', 'We\'ll reply within 24 hours')}
          </p>

          {sent ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: '1rem', padding: '3rem 0',
              textAlign: 'center',
            }}>
              <CheckCircle size={56} color="#10b981" />
              <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 18 }}>
                {t('메시지가 전송되었습니다!', 'Message sent!')}
              </p>
              <p style={{ color: '#64748b', fontSize: 14 }}>
                {t('빠른 시일 내에 연락드리겠습니다.', 'We\'ll get back to you soon.')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                  {t('이름', 'Name')}
                </label>
                <input
                  className="form-input"
                  placeholder={t('홍길동', 'Your name')}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                  {t('이메일', 'Email')}
                </label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
                  {t('메시지', 'Message')}
                </label>
                <textarea
                  className="form-input"
                  rows={5}
                  placeholder={t('안녕하세요. 동아리에 관심이 있어서 연락드립니다...', 'Hello, I\'m interested in joining the club...')}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  style={{ resize: 'vertical', minHeight: 120 }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                <Send size={16} />
                {t('메시지 보내기', 'Send Message')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
