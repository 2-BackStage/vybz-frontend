import Image from 'next/image';
import { Button } from '@repo/ui/components/ui/button';

export default function Vticket({ vticketCount }: { vticketCount: number }) {
  return (
    <section className="mx-6 mt-12 bg-gradient-to-r from-purple-400 to-indigo-400 h-30 rounded-2xl overflow-visible flex items-center justify-between py-6 px-4 shadow-lg text-white">
      <div>
        <h2 className="text-xl font-bold ml-2">보유 V티켓</h2>
        <div className="flex items-center space-x-1">
          <Image src="/logo/vticket.png" alt="vTicket" width={48} height={48} />
          <p className="text-xl font-bold">{vticketCount}장</p>
        </div>
      </div>

      <Button className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-lg transition-all duration-200">
        충전하기
      </Button>
    </section>
  );
}
