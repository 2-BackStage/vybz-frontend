'use client';

import { Hashtag } from '../../lib/types/search';
import { Hash } from 'lucide-react';

interface HashtagCardProps {
  hashtag: Hashtag;
  onClick?: (tagName: string) => void;
}

export function HashtagCard({ hashtag, onClick }: HashtagCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(hashtag.tagName);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md p-4 flex items-center gap-3 hover:shadow-lg transition-shadow"
    >
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <Hash className="w-5 h-5 text-blue-600" />
      </div>
      
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-gray-900">
          #{hashtag.tagName}
        </h3>
        <p className="text-sm text-gray-600">
          관련 콘텐츠 보기
        </p>
      </div>
      
      <div className="text-blue-600">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
} 