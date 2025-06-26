'use client';

import { useState, useEffect, useContext } from 'react';
import { ChatContext } from '@/context/ChatContext';
import { Button } from '@repo/ui/components/ui';
import { Clock4, TagDelete } from '@repo/ui/components/icons';
import { EmojiDataType } from '@/types/CommonType';
import { cn } from '@repo/ui/lib/utils';

export default function EmojiBox({
  emojiData,
  theme = 'dark',
}: {
  emojiData: EmojiDataType;
  theme?: 'light' | 'dark';
}) {
  const { showEmojibox, setComment } = useContext(ChatContext);
  const [activeCategory, setActiveCategory] = useState<string>('recent');
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);

  useEffect(() => {
    const storedRecent = localStorage.getItem('vybzRecentEmojis');
    if (storedRecent) {
      try {
        const parsedRecent = JSON.parse(storedRecent);
        if (Array.isArray(parsedRecent)) {
          setRecentEmojis(parsedRecent);
        }
      } catch (error) {
        console.error('Failed to parse recent emojis from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    if (recentEmojis.length > 0) {
      localStorage.setItem('vybzRecentEmojis', JSON.stringify(recentEmojis));
    }
  }, [recentEmojis]);

  useEffect(() => {
    const categories = Object.keys(emojiData);
    if (
      categories.length > 0 &&
      activeCategory !== 'recent' &&
      !emojiData[activeCategory]
    ) {
      setActiveCategory('recent');
    }
  }, [emojiData, activeCategory]);

  const handleEmojiClick = (emoji: string) => {
    setComment((prev: string) => prev + emoji);
    setRecentEmojis((prevRecent: string[]) => {
      const newRecent = [emoji, ...prevRecent.filter((e) => e !== emoji)];
      return newRecent.slice(0, 24);
    });
  };

  const categoryKeys = Object.keys(emojiData);

  if (!showEmojibox) return null;

  const filteredEmojis =
    activeCategory === 'recent'
      ? recentEmojis
      : emojiData[activeCategory]?.emojis || [];

  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'z-50 w-full',
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between px-4 py-2 border-b',
          isDark ? 'border-gray-700' : 'border-gray-200'
        )}
      >
        <div className="flex gap-2 overflow-x-auto flex-1 pb-1 text-sm font-medium">
          <Button
            type="button"
            onClick={() => setActiveCategory('recent')}
            className={cn(
              'flex-shrink-0 px-2 py-2 rounded bg-transparent border-none [&_svg]:size-7',
              activeCategory === 'recent' &&
                (isDark ? 'bg-gray-700' : 'bg-gray-100'),
              isDark ? 'text-white' : 'text-gray-700'
            )}
          >
            <Clock4 />
          </Button>
          {categoryKeys.map((categoryKey) => (
            <Button
              key={categoryKey}
              type="button"
              onClick={() => setActiveCategory(categoryKey)}
              className={cn(
                'flex-shrink-0 px-2 py-2 rounded bg-transparent border-none text-2xl',
                activeCategory === categoryKey &&
                  (isDark ? 'bg-gray-700' : 'bg-gray-100'),
                isDark ? 'text-white' : 'text-gray-700'
              )}
            >
              {emojiData[categoryKey]?.representativeEmoticon}
            </Button>
          ))}
        </div>
        <div className="ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setComment((prev: string) => {
                const segmenter = new Intl.Segmenter(undefined, {
                  granularity: 'grapheme',
                });
                const segments = Array.from(
                  segmenter.segment(prev),
                  (s) => s.segment
                );
                segments.pop();
                return segments.join('');
              })
            }
            className="[&_svg]:size-8"
          >
            <TagDelete />
          </Button>
        </div>
      </div>

      <div className="px-6 pt-4">
        <h3 className="text-base font-medium">
          {activeCategory === 'recent'
            ? '최근 사용한 이모티콘'
            : emojiData[activeCategory]?.name || activeCategory}
        </h3>
      </div>

      <div className="p-4 overflow-y-auto max-h-50 h-50">
        <div className="grid grid-cols-8 gap-1">
          {filteredEmojis.map((emoji, index) => (
            <Button
              key={`${activeCategory}-${emoji}-${index}`}
              onClick={() => handleEmojiClick(emoji)}
              className="w-12 h-12 text-3xl rounded transition-colors flex items-center justify-center border-none bg-transparent"
            >
              {emoji}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
