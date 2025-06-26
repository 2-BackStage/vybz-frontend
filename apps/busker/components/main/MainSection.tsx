import { Button } from '@repo/ui/components/ui';
import Image from 'next/image';
import LiveBadge from '@/components/common/badge/LiveBadge';
import Link from 'next/link';

export default function MainSection() {
  return (
    <section className="bg-blue-300 py-16 px-6 font-poppins">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            THE LARGEST BUSKER
            <br />
            <span className="text-gray-800">MANAGEMENT</span>
            <br />
            PLATFORM
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            관리하고, 공유하고, 성장하세요. 버스커를 위한 올인원 플랫폼입니다.
          </p>
          <div className="flex space-x-4">
            <Button className="bg-div-background hover:bg-black text-white px-8 py-3 text-lg">
              시작하기
            </Button>
            <Button
              variant="outline"
              className="bg-white border-div-background text-gray-900 hover:bg-div-background hover:text-white px-8 py-3 text-lg"
            >
              더 알아보기
            </Button>
          </div>
        </div>
        <div className="bg-div-background rounded-lg mx-16 p-8 shadow-2xl min-w-2xl">
          <Link
            href="/live"
            className="relative w-full h-64 bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg flex items-center justify-center"
          >
            <LiveBadge className="absolute top-4 left-4" />
            <Image
              src="/logo/logo.png"
              alt="vybzLogo"
              width={200}
              height={200}
            />
          </Link>
          <div className="mt-4 text-center">
            <h3 className="text-blue-300 text-xl font-bold">
              Live Street Performance
            </h3>
            <p className="text-gray-400">Click and Start Streaming</p>
          </div>
        </div>
      </div>
    </section>
  );
}
