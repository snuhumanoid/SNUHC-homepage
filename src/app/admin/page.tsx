'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Newspaper, Clock, ImageIcon, Users, ArrowLeft,
  Plus, Pencil, Trash2, Save, X, ChevronDown, ChevronUp,
} from 'lucide-react';
import { NewsItem, HistoryItem, GalleryItem, Member, MemberRole } from '@/lib/types';

type AdminTab = 'news' | 'history' | 'gallery' | 'members';

const TABS: { key: AdminTab; labelKo: string; labelEn: string; icon: React.ElementType }[] = [
  { key: 'news', labelKo: '뉴스', labelEn: 'News', icon: Newspaper },
  { key: 'history', labelKo: '히스토리', labelEn: 'History', icon: Clock },
  { key: 'gallery', labelKo: '갤러리', labelEn: 'Gallery', icon: ImageIcon },
  { key: 'members', labelKo: '멤버', labelEn: 'Members', icon: Users },
];

const MEMBER_ROLES: MemberRole[] = [
  'director', 'mentor', 'executive', 'management', 'manipulation', 'navigation', 'reasoning', 'perception', 'alumni',
];

const ROLE_LABELS: Record<MemberRole, string> = {
  director: 'Advisory Professor (지도교수)',
  mentor: 'Mentor (멘토)',
  executive: 'Executive (임원진)',
  management: 'Management',
  manipulation: 'Manipulation',
  navigation: 'Navigation',
  reasoning: 'Reasoning',
  perception: 'Perception',
  alumni: 'Alumni (졸업생)',
};

const ADMIN_PASSWORD = '08226';

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setInput('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0f',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#12121a', border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: 16, padding: '2.5rem', width: 320,
        display: 'flex', flexDirection: 'column', gap: '1.25rem',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 16, color: 'white',
          }}>SH</div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>SHAPE Admin</h1>
          <p style={{ fontSize: 13, color: '#64748b' }}>비밀번호를 입력하세요</p>
        </div>
        <input
          type="password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          placeholder="Password"
          autoFocus
          style={{
            background: '#1a1a26', border: `1px solid ${error ? '#ef4444' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 8, padding: '0.75rem 1rem', color: '#f1f5f9',
            fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box',
          }}
        />
        {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: -8 }}>비밀번호가 틀렸습니다</p>}
        <button type="submit" style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          border: 'none', borderRadius: 8, padding: '0.75rem',
          color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer',
        }}>
          입장
        </button>
      </form>
    </div>
  );
}

export default function AdminPage() {
  const { data, addNews, updateNews, deleteNews, addHistory, updateHistory, deleteHistory,
    addGallery, updateGallery, deleteGallery, addMember, updateMember, deleteMember } = useData();
  const { t } = useLanguage();
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState<AdminTab>('news');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // News form
  const emptyNews: Omit<NewsItem, 'id'> = {
    titleKo: '', titleEn: '', contentKo: '', contentEn: '',
    date: new Date().toISOString().slice(0, 10),
    category: 'Research', imageUrl: '',
  };
  const [newsForm, setNewsForm] = useState(emptyNews);

  // History form
  const emptyHistory: Omit<HistoryItem, 'id'> = {
    year: new Date().getFullYear(), month: undefined,
    titleKo: '', titleEn: '', descriptionKo: '', descriptionEn: '',
  };
  const [historyForm, setHistoryForm] = useState(emptyHistory);

  // Gallery form
  const emptyGallery: Omit<GalleryItem, 'id'> = {
    titleKo: '', titleEn: '', descriptionKo: '', descriptionEn: '',
    imageUrl: '', date: new Date().toISOString().slice(0, 10),
  };
  const [galleryForm, setGalleryForm] = useState(emptyGallery);

  // Member form
  const emptyMember: Omit<Member, 'id'> = {
    nameKo: '', nameEn: '', role: 'manipulation',
    titleKo: '', titleEn: '', affiliationKo: '', affiliationEn: '',
    imageUrl: '', order: 1,
  };
  const [memberForm, setMemberForm] = useState(emptyMember);

  const openCreate = () => {
    setEditingId(null);
    if (tab === 'news') setNewsForm(emptyNews);
    if (tab === 'history') setHistoryForm(emptyHistory);
    if (tab === 'gallery') setGalleryForm(emptyGallery);
    if (tab === 'members') setMemberForm(emptyMember);
    setShowForm(true);
  };

  const openEdit = (id: string) => {
    setEditingId(id);
    if (tab === 'news') {
      const item = data.news.find((n) => n.id === id);
      if (item) setNewsForm({ titleKo: item.titleKo, titleEn: item.titleEn, contentKo: item.contentKo, contentEn: item.contentEn, date: item.date, category: item.category, imageUrl: item.imageUrl ?? '' });
    }
    if (tab === 'history') {
      const item = data.history.find((h) => h.id === id);
      if (item) setHistoryForm({ year: item.year, month: item.month, titleKo: item.titleKo, titleEn: item.titleEn, descriptionKo: item.descriptionKo, descriptionEn: item.descriptionEn });
    }
    if (tab === 'gallery') {
      const item = data.gallery.find((g) => g.id === id);
      if (item) setGalleryForm({ titleKo: item.titleKo, titleEn: item.titleEn, descriptionKo: item.descriptionKo, descriptionEn: item.descriptionEn, imageUrl: item.imageUrl, date: item.date });
    }
    if (tab === 'members') {
      const item = data.members.find((m) => m.id === id);
      if (item) setMemberForm({ nameKo: item.nameKo, nameEn: item.nameEn, role: item.role, titleKo: item.titleKo, titleEn: item.titleEn, affiliationKo: item.affiliationKo, affiliationEn: item.affiliationEn, imageUrl: item.imageUrl ?? '', order: item.order ?? 1 });
    }
    setShowForm(true);
  };

  const handleSave = () => {
    if (tab === 'news') {
      if (editingId) updateNews(editingId, newsForm); else addNews(newsForm);
    }
    if (tab === 'history') {
      if (editingId) updateHistory(editingId, historyForm); else addHistory(historyForm);
    }
    if (tab === 'gallery') {
      if (editingId) updateGallery(editingId, galleryForm); else addGallery(galleryForm);
    }
    if (tab === 'members') {
      if (editingId) updateMember(editingId, memberForm); else addMember(memberForm);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm(t('삭제하시겠습니까?', 'Are you sure you want to delete this item?'))) return;
    if (tab === 'news') deleteNews(id);
    if (tab === 'history') deleteHistory(id);
    if (tab === 'gallery') deleteGallery(id);
    if (tab === 'members') deleteMember(id);
  };

  const inputStyle: React.CSSProperties = {
    background: '#1a1a26', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 8, padding: '0.65rem 1rem', color: '#f1f5f9',
    width: '100%', outline: 'none', fontSize: 14,
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 700,
    color: '#64748b', marginBottom: 6, letterSpacing: '0.05em',
    textTransform: 'uppercase',
  };

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#f1f5f9' }}>
      {/* Header */}
      <div style={{
        background: '#080810',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '1rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="/"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              color: '#64748b', textDecoration: 'none', fontSize: 14,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#f1f5f9')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#64748b')}
          >
            <ArrowLeft size={16} />
            {t('홈으로', 'Back to Home')}
          </a>
          <span style={{ color: '#1e293b' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 11, color: 'white',
            }}>SH</div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>SHAPE Admin</span>
          </div>
        </div>
        <span style={{
          background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700,
          color: '#818cf8', letterSpacing: '0.05em',
        }}>
          CMS
        </span>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '0.5rem',
          marginBottom: '2rem',
          background: '#080810',
          padding: '0.5rem',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.05)',
          width: 'fit-content',
        }}>
          {TABS.map(({ key, labelKo, labelEn, icon: Icon }) => {
            const isActive = tab === key;
            return (
              <button
                key={key}
                onClick={() => { setTab(key); setShowForm(false); setEditingId(null); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 16px', borderRadius: 8,
                  background: isActive ? 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.25))' : 'transparent',
                  border: isActive ? '1px solid rgba(99,102,241,0.4)' : '1px solid transparent',
                  color: isActive ? '#818cf8' : '#475569',
                  fontWeight: 600, fontSize: 14,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <Icon size={16} />
                {t(labelKo, labelEn)}
              </button>
            );
          })}
        </div>

        {/* Action bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>
            {tab === 'news' && t('뉴스 관리', 'Manage News')}
            {tab === 'history' && t('히스토리 관리', 'Manage History')}
            {tab === 'gallery' && t('갤러리 관리', 'Manage Gallery')}
            {tab === 'members' && t('멤버 관리', 'Manage Members')}
          </h2>
          <button
            onClick={openCreate}
            className="btn-primary"
            style={{ fontSize: 14 }}
          >
            <Plus size={16} />
            {t('추가', 'Add')}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div style={{
            background: '#12121a',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 16, padding: '2rem',
            marginBottom: '2rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>
                {editingId ? t('수정', 'Edit') : t('새로 추가', 'Add New')}
              </h3>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); }}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* NEWS FORM */}
            {tab === 'news' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div><label style={labelStyle}>{t('제목 (한국어)', 'Title (Korean)')}</label>
                  <input style={inputStyle} value={newsForm.titleKo} onChange={(e) => setNewsForm({ ...newsForm, titleKo: e.target.value })} /></div>
                <div><label style={labelStyle}>{t('제목 (영어)', 'Title (English)')}</label>
                  <input style={inputStyle} value={newsForm.titleEn} onChange={(e) => setNewsForm({ ...newsForm, titleEn: e.target.value })} /></div>
                <div style={{ gridColumn: '1/-1' }}><label style={labelStyle}>{t('내용 (한국어)', 'Content (Korean)')}</label>
                  <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={newsForm.contentKo} onChange={(e) => setNewsForm({ ...newsForm, contentKo: e.target.value })} /></div>
                <div style={{ gridColumn: '1/-1' }}><label style={labelStyle}>{t('내용 (영어)', 'Content (English)')}</label>
                  <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={newsForm.contentEn} onChange={(e) => setNewsForm({ ...newsForm, contentEn: e.target.value })} /></div>
                <div><label style={labelStyle}>{t('날짜', 'Date')}</label>
                  <input type="date" style={inputStyle} value={newsForm.date} onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })} /></div>
                <div><label style={labelStyle}>{t('카테고리', 'Category')}</label>
                  <select style={inputStyle} value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}>
                    {['Research', 'Award', 'Event', 'Recruitment', 'Other'].map((c) => <option key={c}>{c}</option>)}
                  </select></div>
              </div>
            )}

            {/* HISTORY FORM */}
            {tab === 'history' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div><label style={labelStyle}>{t('연도', 'Year')}</label>
                  <input type="number" style={inputStyle} value={historyForm.year} onChange={(e) => setHistoryForm({ ...historyForm, year: Number(e.target.value) })} /></div>
                <div><label style={labelStyle}>{t('월 (선택)', 'Month (optional)')}</label>
                  <select style={inputStyle} value={historyForm.month ?? ''} onChange={(e) => setHistoryForm({ ...historyForm, month: e.target.value ? Number(e.target.value) : undefined })}>
                    <option value="">—</option>
                    {Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}월</option>)}
                  </select></div>
                <div><label style={labelStyle}>{t('제목 (한국어)', 'Title (Korean)')}</label>
                  <input style={inputStyle} value={historyForm.titleKo} onChange={(e) => setHistoryForm({ ...historyForm, titleKo: e.target.value })} /></div>
                <div><label style={labelStyle}>{t('제목 (영어)', 'Title (English)')}</label>
                  <input style={inputStyle} value={historyForm.titleEn} onChange={(e) => setHistoryForm({ ...historyForm, titleEn: e.target.value })} /></div>
                <div style={{ gridColumn: '1/-1' }}><label style={labelStyle}>{t('설명 (한국어)', 'Description (Korean)')}</label>
                  <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={historyForm.descriptionKo} onChange={(e) => setHistoryForm({ ...historyForm, descriptionKo: e.target.value })} /></div>
                <div style={{ gridColumn: '1/-1' }}><label style={labelStyle}>{t('설명 (영어)', 'Description (English)')}</label>
                  <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={historyForm.descriptionEn} onChange={(e) => setHistoryForm({ ...historyForm, descriptionEn: e.target.value })} /></div>
              </div>
            )}

            {/* GALLERY FORM */}
            {tab === 'gallery' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div><label style={labelStyle}>{t('제목 (한국어)', 'Title (Korean)')}</label>
                  <input style={inputStyle} value={galleryForm.titleKo} onChange={(e) => setGalleryForm({ ...galleryForm, titleKo: e.target.value })} /></div>
                <div><label style={labelStyle}>{t('제목 (영어)', 'Title (English)')}</label>
                  <input style={inputStyle} value={galleryForm.titleEn} onChange={(e) => setGalleryForm({ ...galleryForm, titleEn: e.target.value })} /></div>
                <div style={{ gridColumn: '1/-1' }}><label style={labelStyle}>{t('설명 (한국어)', 'Description (Korean)')}</label>
                  <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} value={galleryForm.descriptionKo} onChange={(e) => setGalleryForm({ ...galleryForm, descriptionKo: e.target.value })} /></div>
                <div style={{ gridColumn: '1/-1' }}><label style={labelStyle}>{t('설명 (영어)', 'Description (English)')}</label>
                  <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} value={galleryForm.descriptionEn} onChange={(e) => setGalleryForm({ ...galleryForm, descriptionEn: e.target.value })} /></div>
                <div style={{ gridColumn: '1/-1' }}><label style={labelStyle}>{t('이미지 URL', 'Image URL')}</label>
                  <input style={inputStyle} placeholder="https://..." value={galleryForm.imageUrl} onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })} /></div>
                <div><label style={labelStyle}>{t('날짜', 'Date')}</label>
                  <input type="date" style={inputStyle} value={galleryForm.date} onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })} /></div>
              </div>
            )}

            {/* MEMBER FORM */}
            {tab === 'members' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div><label style={labelStyle}>{t('이름 (한국어)', 'Name (Korean)')}</label>
                  <input style={inputStyle} value={memberForm.nameKo} onChange={(e) => setMemberForm({ ...memberForm, nameKo: e.target.value })} /></div>
                <div><label style={labelStyle}>{t('이름 (영어)', 'Name (English)')}</label>
                  <input style={inputStyle} value={memberForm.nameEn} onChange={(e) => setMemberForm({ ...memberForm, nameEn: e.target.value })} /></div>
                <div><label style={labelStyle}>{t('역할', 'Role')}</label>
                  <select style={inputStyle} value={memberForm.role} onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value as MemberRole })}>
                    {MEMBER_ROLES.map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
                  </select></div>
                <div><label style={labelStyle}>{t('직책 (한국어)', 'Title (Korean)')}</label>
                  <input style={inputStyle} value={memberForm.titleKo} onChange={(e) => setMemberForm({ ...memberForm, titleKo: e.target.value })} /></div>
                <div><label style={labelStyle}>{t('직책 (영어)', 'Title (English)')}</label>
                  <input style={inputStyle} value={memberForm.titleEn} onChange={(e) => setMemberForm({ ...memberForm, titleEn: e.target.value })} /></div>
                <div><label style={labelStyle}>{t('소속 (한국어)', 'Affiliation (Korean)')}</label>
                  <input style={inputStyle} value={memberForm.affiliationKo} onChange={(e) => setMemberForm({ ...memberForm, affiliationKo: e.target.value })} /></div>
                <div><label style={labelStyle}>{t('소속 (영어)', 'Affiliation (English)')}</label>
                  <input style={inputStyle} value={memberForm.affiliationEn} onChange={(e) => setMemberForm({ ...memberForm, affiliationEn: e.target.value })} /></div>
                <div style={{ gridColumn: '1/-1' }}><label style={labelStyle}>{t('프로필 이미지 URL', 'Profile Image URL')}</label>
                  <input style={inputStyle} placeholder="https://..." value={memberForm.imageUrl ?? ''} onChange={(e) => setMemberForm({ ...memberForm, imageUrl: e.target.value })} /></div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="btn-secondary"
                style={{ fontSize: 14 }}
              >
                {t('취소', 'Cancel')}
              </button>
              <button onClick={handleSave} className="btn-primary" style={{ fontSize: 14 }}>
                <Save size={16} />
                {t('저장', 'Save')}
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* NEWS LIST */}
          {tab === 'news' && data.news.map((item) => (
            <div key={item.id} style={{
              background: '#12121a', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12, overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.25rem',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 4 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '2px 8px',
                      borderRadius: 999, background: 'rgba(99,102,241,0.15)',
                      border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8',
                    }}>{item.category}</span>
                    <span style={{ fontSize: 12, color: '#475569' }}>{item.date}</span>
                  </div>
                  <p style={{ fontWeight: 600, fontSize: 15, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.titleKo}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem', flexShrink: 0 }}>
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 6 }}
                  >
                    {expandedId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <button onClick={() => openEdit(item.id)} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: 6 }}>
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 6 }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {expandedId === item.id && (
                <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, marginTop: '0.75rem' }}>{item.contentKo}</p>
                </div>
              )}
            </div>
          ))}

          {/* HISTORY LIST */}
          {tab === 'history' && data.history.map((item) => (
            <div key={item.id} style={{
              background: '#12121a', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12, padding: '1rem 1.25rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 700, marginRight: 8 }}>
                  {item.year}{item.month ? `.${item.month}` : ''}
                </span>
                <span style={{ fontWeight: 600, fontSize: 15, color: '#e2e8f0' }}>{item.titleKo}</span>
                <p style={{ fontSize: 13, color: '#64748b', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.descriptionKo}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem', flexShrink: 0 }}>
                <button onClick={() => openEdit(item.id)} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: 6 }}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 6 }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* GALLERY LIST */}
          {tab === 'gallery' && data.gallery.map((item) => (
            <div key={item.id} style={{
              background: '#12121a', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12, padding: '1rem 1.25rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              <div style={{
                width: 60, height: 60, flexShrink: 0,
                borderRadius: 10, overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
              }}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.titleKo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : '🤖'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: 15, color: '#e2e8f0' }}>{item.titleKo}</p>
                <p style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{item.date}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button onClick={() => openEdit(item.id)} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: 6 }}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 6 }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* MEMBER LIST */}
          {tab === 'members' && data.members.map((item) => (
            <div key={item.id} style={{
              background: '#12121a', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12, padding: '1rem 1.25rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              <div style={{
                width: 44, height: 44, flexShrink: 0,
                borderRadius: '50%', overflow: 'hidden',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, color: 'white', fontSize: 16,
              }}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.nameKo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : item.nameKo.slice(0, 1)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: '#e2e8f0' }}>{item.nameKo}</span>
                  <span style={{
                    fontSize: 11, padding: '1px 8px', borderRadius: 999,
                    background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                    color: '#818cf8', fontWeight: 600,
                  }}>{item.role}</span>
                </div>
                <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{item.titleKo} · {item.affiliationKo}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button onClick={() => openEdit(item.id)} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: 6 }}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 6 }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Empty states */}
          {tab === 'news' && data.news.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#475569' }}>
              <Newspaper size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p>{t('뉴스가 없습니다. 추가 버튼을 눌러 시작하세요.', 'No news yet. Click Add to get started.')}</p>
            </div>
          )}
          {tab === 'history' && data.history.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#475569' }}>
              <Clock size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p>{t('히스토리가 없습니다.', 'No history yet.')}</p>
            </div>
          )}
          {tab === 'gallery' && data.gallery.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#475569' }}>
              <ImageIcon size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p>{t('갤러리 항목이 없습니다.', 'No gallery items yet.')}</p>
            </div>
          )}
          {tab === 'members' && data.members.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#475569' }}>
              <Users size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p>{t('멤버가 없습니다.', 'No members yet.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
