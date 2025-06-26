'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Bell, ChevronLeft, Search } from '@repo/ui/components/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ChatHeader() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const buskerInfo = {
    buskerId: '1',
    buskerName: '카리나',
    buskerProfileUrl: '/BuskerUrl.jpg',
  };
  return (
    <header className="fixed top-10 left-0 right-0 z-54 w-full text-white flex items-center justify-between">
      <div className="flex items-center space-x-2 py-4 pl-4 pr-10  bg-blue-400 rounded-t-4xl flex-2/5 border-b-4 border-blue-400">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="[&_svg]:size-7 p-0"
        >
          <ChevronLeft />
        </Button>
        <Link
          href={`/busker/${buskerInfo.buskerId}`}
          className="flex items-center space-x-2"
        >
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src={buskerInfo.buskerProfileUrl}
              alt="Busker"
              fill
              sizes="40px"
              className="rounded-full object-cover"
            />
          </div>
          <div className="ml-1">
            <h3 className="font-bold">{buskerInfo.buskerName}</h3>
            <p className="text-sm text-gray-400">Busker</p>
          </div>
        </Link>
      </div>
      <div className="flex-2/5 bg-blue-400 rounded-tl-4xl border-0">
        <div className="flex items-center justify-end space-x-4 pr-10 py-4.5 bg-background rounded-bl-4xl">
          <Button className="[&_svg]:size-7 p-1 border-2 border-white rounded-full shrink-0">
            <Bell />
          </Button>
          <Button className="[&_svg]:size-7 p-1 border-2 border-white rounded-full shrink-0">
            <Search />
          </Button>
        </div>
      </div>
    </header>
  );
}
