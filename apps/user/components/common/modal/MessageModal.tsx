'use client';

import { ModalContext } from '@/context/ModalContext';
import { use } from 'react';
import Image from 'next/image';

export default function MessageModal() {
  const { ModalType, feedId } = use(ModalContext);
  if (ModalType === 'image') {
    return (
      <Image
        src={feedId}
        alt="확대된 이미지"
        fill
        className="object-contain z-50"
      />
    );
  } else if (ModalType === 'video') {
    return (
      <video
        src={feedId}
        controls
        onClick={(e) => e.stopPropagation()}
        className="z-50"
      />
    );
  }
  return null;
}
