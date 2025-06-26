'use client';

import { Button } from '@repo/ui/components/ui/button';
import { MessageCircle, Send } from '@repo/ui/components/icons';
import { formatNumberToKm } from '@/utils/format';
import Link from 'next/link';
import { HeartButton } from '@/components/common/button/HeartButton';

import { use } from 'react';
import { ModalContext } from '@/context/ModalContext';

export default function ReelsBoxs({
  likeCount,
  reelsCommentCount,
  feedId,
}: {
  likeCount: number;
  reelsCommentCount: number;
  feedId: string;
}) {
  const { open } = use(ModalContext);

  return (
    <div className="absolute bottom-44 right-5 z-20 text-center text-white">
      <HeartButton />
      <p>{formatNumberToKm(likeCount)}</p>

      <Button
        className="w-12 h-12 border-none bg-transparent [&_svg]:size-10 p-0 mt-2"
        onClick={() => open(feedId)}
      >
        <MessageCircle className="fill-none stroke-white stroke-2" />
      </Button>
      <p>{formatNumberToKm(reelsCommentCount)}</p>

      <Link
        href="/chat/list"
        className="w-12 h-12 border-none bg-transparent [&_svg]:size-10 mt-3 inline-block"
      >
        <Send className="fill-none stroke-white stroke-2" />
      </Link>
    </div>
  );
}
