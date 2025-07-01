'use client';

import { Button } from "@repo/ui/components/ui/button";
import Image from 'next/image';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { v4 as uuidv4 } from 'uuid';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

function generateRandomCustomerKey(): string {
  return `cus_${uuidv4().replace(/-/g, '')}`;
}

export default function SubscribeClient({
  nickname,
  profileUrl,
  buskerUuid,
  userUuid,
  price = 6900,
}: {
  nickname: string;
  profileUrl: string;
  buskerUuid: string;
  userUuid?: string;
  price?: number;
}) {
  const handlePayment = async () => {
    if (!userUuid) {
      alert('로그인이 필요합니다.');
      return;
    }
    const customerKey = generateRandomCustomerKey();
    const tossPayments = await loadTossPayments(clientKey);

    tossPayments
      .requestBillingAuth('카드', {
        customerKey,
        successUrl: `${window.location.origin}/subscription/success?customerKey=${customerKey}&userUuid=${userUuid}&buskerUuid=${buskerUuid}&price=${price}`,
        failUrl: `${window.location.origin}/subscription/fail?userUuid=${userUuid}&buskerUuid=${buskerUuid}&price=${price}`,
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="flex flex-col items-center w-full max-w-xs mx-auto">
        <Image
          src={profileUrl}
          alt="profile"
          width={96}
          height={96}
          className="rounded-full mb-6 mt-16"
        />
        <div className="text-lg font-semibold text-white mb-1">{nickname}님 구독하기</div>
        <div className="text-white mb-8">월 <b>{price.toLocaleString('ko-KR')}원</b></div>
        <div className="text-left w-full text-white text-sm mb-8">
          이 버스커가 제공하는 혜택 :<br />
          <ul className="list-disc ml-5 mt-2">
            <li>멤버십 게시글</li>
            <li>멤버십 릴스</li>
            <li>멤버십 라이브 시청</li>
          </ul>
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full mb-4"
          onClick={handlePayment}
        >
          구독
        </Button>
        <div className="text-sm text-gray-400 text-center w-full mb-8">
          구독을 누르면 <span className="text-blue-400">구독 약관</span>에 동의하게 됩니다.
        </div>
      </div>
    </div>
  );
}