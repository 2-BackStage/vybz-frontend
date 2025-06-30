"use client";

import Image from 'next/image';
import { Button } from '@repo/ui/components/ui/button';
import { useState } from 'react';
import VticketChargeModal from './VticketChargeModal';

export default function Vticket({ vticketCount, userUuid }: { vticketCount: number, userUuid: string }) {

   console.log("🔥 Vticket에 전달된 userUuid:", userUuid);
  
  const [open, setOpen] = useState(false);

  return (
    <>
    <section className="mx-6 mt-12 bg-gradient-to-r from-purple-400 to-indigo-400 h-30 rounded-2xl overflow-visible flex items-center justify-between py-6 px-4 shadow-lg text-white">
      <div>
        <h2 className="text-xl font-bold ml-2">보유 V티켓</h2>
        <div className="flex items-center space-x-1">
          <Image src="/logo/vticket.png" alt="vTicket" width={48} height={48} />
          <p className="text-xl font-bold">{vticketCount}장</p>
        </div>
      </div>

      <Button className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-lg transition-all duration-200" onClick={() => setOpen(true)}>
        충전하기
      </Button>
    </section>
    {open && (
        <VticketChargeModal userUuid={userUuid} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
