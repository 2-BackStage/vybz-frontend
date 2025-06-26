'use client';

import { createContext, useState, useCallback } from 'react';
import { ModalContextType } from '@/types/ContextTypes';

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType
);

export function UseModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedId, setFeedId] = useState('');
  const [ModalType, setModalType] = useState<'image' | 'video' | null>(null);

  const open = useCallback((feedId: string) => {
    setFeedId(feedId);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value: ModalContextType = {
    isOpen,
    feedId,
    open,
    close,
    ModalType,
    setModalType,
  };

  return <ModalContext value={value}>{children}</ModalContext>;
}
