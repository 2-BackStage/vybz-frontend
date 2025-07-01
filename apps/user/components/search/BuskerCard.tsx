'use client';

import { Busker } from '../../lib/types/search';
import { User, Users, Music } from 'lucide-react';
import { Button } from '@repo/ui';

interface BuskerCardProps {
  busker: Busker;
}

export function BuskerCard({ busker }: BuskerCardProps) {
  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
      <div className="relative">
        <img
          src={busker.profileImageUrl}
          alt={busker.nickname}
          className="w-16 h-16 rounded-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/64x64?text=Profile';
          }}
        />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <Music className="w-3 h-3 text-white" />
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">
          {busker.nickname}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{formatFollowerCount(busker.followerCount)} 팔로워</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <Button size="sm" variant="outline">
          팔로우
        </Button>
        <Button size="sm" variant="ghost">
          프로필 보기
        </Button>
      </div>
    </div>
  );
} 