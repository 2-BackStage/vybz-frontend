'use client';

import { createContext, useState, useCallback } from 'react';
import { ChatContextType } from '@/types/ContextTypes';

export const ChatContext = createContext<ChatContextType>(
  {} as ChatContextType
);

export function UseChat({ children }: { children: React.ReactNode }) {
  const [showEmojibox, setShowEmojibox] = useState(false);
  const [comment, setComment] = useState('');

  const toggleShowEmojibox = useCallback(
    () => setShowEmojibox((prev) => !prev),
    []
  );

  const value = {
    showEmojibox,
    toggleShowEmojibox,
    comment,
    setComment,
  };

  return <ChatContext value={value}>{children}</ChatContext>;
}
