'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@repo/ui/components/ui';
import ShowMoreButton from '@/components/common/button/ShowMoreButton';

export default function FollowingBuskerBox({
  buskerName,
  buskerId,
  buskerProfileImage,
  isMenuOpen,
  onMenuToggle,
}: {
  buskerName: string;
  buskerId: string;
  buskerProfileImage: string;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}) {
  return (
    <div className="flex space-x-4 items-center text-center text-white">
      <div className="relative w-12 h-12 shrink-0">
        <Image
          src={buskerProfileImage}
          alt="Busker"
          fill
          sizes="48px"
          className="rounded-full object-cover"
        />
      </div>
      <h3 className="flex-1 truncate overflow-hidden whitespace-nowrap text-lg font-semibold">
        {buskerName}
      </h3>
      <Link href={`/chat/${buskerId}`} className="flex-1">
        <Button className="w-full bg-div-background font-semibold">
          메세지 보내기
        </Button>
      </Link>
      <ShowMoreButton
        buskerId={buskerId}
        isOpen={isMenuOpen}
        onToggle={onMenuToggle}
      />
    </div>
  );
}
