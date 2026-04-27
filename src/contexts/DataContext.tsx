'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteData, NewsItem, HistoryItem, GalleryItem, Member } from '@/lib/types';
import { defaultData } from '@/lib/defaultData';

interface DataContextType {
  data: SiteData;
  addNews: (item: Omit<NewsItem, 'id'>) => void;
  updateNews: (id: string, item: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  addHistory: (item: Omit<HistoryItem, 'id'>) => void;
  updateHistory: (id: string, item: Partial<HistoryItem>) => void;
  deleteHistory: (id: string) => void;
  addGallery: (item: Omit<GalleryItem, 'id'>) => void;
  updateGallery: (id: string, item: Partial<GalleryItem>) => void;
  deleteGallery: (id: string) => void;
  addMember: (item: Omit<Member, 'id'>) => void;
  updateMember: (id: string, item: Partial<Member>) => void;
  deleteMember: (id: string) => void;
}

const DataContext = createContext<DataContextType>({
  data: defaultData,
  addNews: () => {},
  updateNews: () => {},
  deleteNews: () => {},
  addHistory: () => {},
  updateHistory: () => {},
  deleteHistory: () => {},
  addGallery: () => {},
  updateGallery: () => {},
  deleteGallery: () => {},
  addMember: () => {},
  updateMember: () => {},
  deleteMember: () => {},
});

const STORAGE_KEY = 'shape-site-data';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultData);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
    } catch {}
  }, []);

  const persist = useCallback((newData: SiteData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }, []);

  const addNews = (item: Omit<NewsItem, 'id'>) =>
    persist({ ...data, news: [{ ...item, id: generateId() }, ...data.news] });

  const updateNews = (id: string, item: Partial<NewsItem>) =>
    persist({ ...data, news: data.news.map((n) => (n.id === id ? { ...n, ...item } : n)) });

  const deleteNews = (id: string) =>
    persist({ ...data, news: data.news.filter((n) => n.id !== id) });

  const addHistory = (item: Omit<HistoryItem, 'id'>) =>
    persist({
      ...data,
      history: [...data.history, { ...item, id: generateId() }].sort(
        (a, b) => a.year - b.year || (a.month ?? 0) - (b.month ?? 0)
      ),
    });

  const updateHistory = (id: string, item: Partial<HistoryItem>) =>
    persist({
      ...data,
      history: data.history
        .map((h) => (h.id === id ? { ...h, ...item } : h))
        .sort((a, b) => a.year - b.year || (a.month ?? 0) - (b.month ?? 0)),
    });

  const deleteHistory = (id: string) =>
    persist({ ...data, history: data.history.filter((h) => h.id !== id) });

  const addGallery = (item: Omit<GalleryItem, 'id'>) =>
    persist({ ...data, gallery: [{ ...item, id: generateId() }, ...data.gallery] });

  const updateGallery = (id: string, item: Partial<GalleryItem>) =>
    persist({ ...data, gallery: data.gallery.map((g) => (g.id === id ? { ...g, ...item } : g)) });

  const deleteGallery = (id: string) =>
    persist({ ...data, gallery: data.gallery.filter((g) => g.id !== id) });

  const addMember = (item: Omit<Member, 'id'>) =>
    persist({ ...data, members: [...data.members, { ...item, id: generateId() }] });

  const updateMember = (id: string, item: Partial<Member>) =>
    persist({ ...data, members: data.members.map((m) => (m.id === id ? { ...m, ...item } : m)) });

  const deleteMember = (id: string) =>
    persist({ ...data, members: data.members.filter((m) => m.id !== id) });

  return (
    <DataContext.Provider
      value={{
        data,
        addNews,
        updateNews,
        deleteNews,
        addHistory,
        updateHistory,
        deleteHistory,
        addGallery,
        updateGallery,
        deleteGallery,
        addMember,
        updateMember,
        deleteMember,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
