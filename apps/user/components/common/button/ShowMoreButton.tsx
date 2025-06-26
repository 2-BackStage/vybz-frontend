'use client';

import { MoreVertical } from '@repo/ui/components/icons';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@repo/ui/components/ui';
import { RemoveFollow } from '@/services/following-services/following-services';

import { useQueryClient } from '@tanstack/react-query';

export default function ShowMoreButton({
  buskerId,
  isOpen,
  onToggle,
}: {
  buskerId: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="border-none bg-transparent [&_svg]:size-6 px-0 mx-0"
        aria-label="More options"
      >
        <MoreVertical />
      </Button>
      {isOpen && (
        <div
          className="absolute right-0 bottom-7 z-10 w-44 bg-white rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="py-1 space-y-2">
            <li className="px-4 ">
              <Button
                onClick={() => onToggle()}
                className="text-black bg-transparent border-none p-0 m-0 text-base"
              >
                알림 설정
              </Button>
            </li>
            <li className="px-4 text-black">
              <Link href={`/busker/${buskerId}`} onClick={() => onToggle()}>
                프로필 보기
              </Link>
            </li>
            <li className="px-4">
              <Button
                onClick={async () => {
                  await RemoveFollow(buskerId);
                  queryClient.invalidateQueries({
                    queryKey: ['followings'],
                  });
                  onToggle();
                }}
                className="text-red-500 bg-transparent border-none p-0 m-0 text-base"
              >
                팔로우 취소
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
