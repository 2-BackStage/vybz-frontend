'use client';

import { Bell, ChevronLeft } from '@repo/ui/components/icons';
import { Button } from '@repo/ui/components/ui';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function BackHeader({
  title,
  className,
  showIcons = true,
}: {
  title: string;
  className?: string;
  showIcons?: boolean;
}) {
  const router = useRouter();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3.5 text-white bg-transparent flex items-center justify-between ${className}`}
    >
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => router.back()}
          className="flex-shrink-0 px-0 border-none bg-transparent [&_svg]:size-7 hover:bg-transparent"
          aria-label="뒤로 가기"
        >
          <ChevronLeft width={28} height={28} />
        </Button>
        <h1 className="text-lg font-semibold ml-4">{title}</h1>
      </div>
      {showIcons && (
        <div className="space-x-2 flex items-center">
          <Link
            href="/notifications"
            onMouseOver={() => {
              router.prefetch('/notifications');
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="bg-transparent text-white"
            >
              <Bell className="!w-7 !h-7" />
            </Button>
          </Link>
          <div className="relative w-8 h-8 shrink-0">
            <Link href="/mypage">
              <Image
                src="/BuskerUrl.jpg"
                alt="Busker"
                fill
                className="rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
