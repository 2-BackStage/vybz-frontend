'use client';

import FuzzyText from '@/components/common/font/FuzzyText';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className=" h-screen text-center text-xl font-semibold">
      <div className="mx-auto pt-60 w-fit space-y-4">
        <FuzzyText
          baseIntensity={0.1}
          hoverIntensity={0.5}
          enableHover={true}
          fontFamily="roboto"
          fontSize={105}
        >
          404
        </FuzzyText>
      </div>
      <div className="mx-auto w-fit space-y-4">
        <FuzzyText
          baseIntensity={0.1}
          hoverIntensity={0.5}
          enableHover={true}
          fontFamily="roboto"
          fontSize={50}
        >
          Not Found
        </FuzzyText>
      </div>

      <p className="my-6 text-white">페이지를 찾을 수 없습니다</p>
      <Link href="/main" className=" text-blue-400">
        홈으로 돌아가기
      </Link>
    </main>
  );
}
