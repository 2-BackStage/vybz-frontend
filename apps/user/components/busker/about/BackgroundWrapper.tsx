'use client';

import Image from 'next/image';

export function BackgroundWrapper({
  children,
  buskerProfileUrl,
}: {
  children: React.ReactNode;
  buskerProfileUrl: string;
}) {
  return (
    <div className="relative h-96 bg-gradient-to-b from-blue-400 to-purple-500">
      <Image
        src={buskerProfileUrl}
        alt="Profile Background"
        className="w-full h-full object-cover"
        width={100}
        height={100}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {children}
    </div>
  );
}
