'use client';

import { Reel } from '../../lib/types/search';
import { Play, Heart, MessageCircle, Share } from 'lucide-react';

interface ReelCardProps {
  reel: Reel;
}

export function ReelCard({ reel }: ReelCardProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-[9/16] bg-gray-100">
        <img
          src={reel.thumbnailUrl}
          alt={reel.content}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <Play className="w-12 h-12 text-white" fill="white" />
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-700 line-clamp-2 mb-2">
          {reel.content}
        </p>
        
        {reel.hashTag.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {reel.hashTag.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
            {reel.hashTag.length > 3 && (
              <span className="text-xs text-gray-500">
                +{reel.hashTag.length - 3}
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{formatDate(reel.createdAt)}</span>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-red-500">
              <Heart className="w-4 h-4" />
              <span>0</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <MessageCircle className="w-4 h-4" />
              <span>0</span>
            </button>
            <button className="flex items-center gap-1 hover:text-green-500">
              <Share className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 