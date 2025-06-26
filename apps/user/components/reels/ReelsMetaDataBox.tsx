'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ReelsMetaDataBox({
  realsDescription,
  buskerId,
  buskerName,
  buskerProfileImage,
}: {
  realsDescription: string;
  buskerId: string;
  buskerName: string;
  buskerProfileImage: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = realsDescription.length > 10;

  const handleToggle = () => {
    if (isLong) {
      setExpanded((prev) => !prev);
    }
  };

  return (
    <section
      className="text-white cursor-pointer px-5 pb-4"
      onClick={handleToggle}
    >
      <div className="flex items-center justify-start space-x-2 mb-1">
        <div className="relative w-8 h-8 shrink-0">
          <Link
            href={`/busker/${buskerId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={buskerProfileImage}
              alt={buskerName}
              fill
              className="rounded-full object-cover"
            />
          </Link>
        </div>
        <Link
          href={`/busker/${buskerId}`}
          className="font-semibold block"
          onClick={(e) => e.stopPropagation()}
        >
          @{buskerName}
        </Link>
      </div>
      <p className="text-sm text-white/90 whitespace-pre-line leading-normal pl-2 pr-12 pt-1">
        {expanded || !isLong
          ? realsDescription
          : `${realsDescription.slice(0, 10)}...`}
      </p>
    </section>
  );
}
