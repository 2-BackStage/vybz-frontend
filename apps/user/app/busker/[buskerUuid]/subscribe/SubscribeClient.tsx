'use client';

import { Button } from "@repo/ui/components/ui/button";
import Image from 'next/image';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { v4 as uuidv4 } from 'uuid';


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
    const clientkey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || ''

    if (!clientkey) {
      alert('결제 설정이 올바르지 않습니다. 관리자에게 문의해주세요.');
      return;
    }

    try {
      console.log('userUuid', userUuid)
      console.log('buskerUuid', buskerUuid)
      console.log('price', price)
      console.log('nickname', nickname)
      console.log('profileUrl', profileUrl)
      console.log('clientKey', clientkey)
      const customerKey = generateRandomCustomerKey();
      console.log('customerKey', customerKey)
      const tossPayments = await loadTossPayments(clientkey);

      console.log('tossPayments', tossPayments);

      // 배포 환경에서 안전하게 origin 가져오기
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      console.log('origin', origin)

      if (!origin) {
        throw new Error('Origin을 가져올 수 없습니다.');
      }

      tossPayments
        .requestBillingAuth('카드', {
          customerKey,
          successUrl: `${origin}/subscription/success?customerKey=${customerKey}&userUuid=${userUuid}&buskerUuid=${buskerUuid}&price=${price}`,
          failUrl: `${origin}/subscription/fail?userUuid=${userUuid}&buskerUuid=${buskerUuid}&price=${price}`,
        })
        .catch((err) => {
          console.error('Toss SDK Error:', err);
          alert(`결제 초기화 실패: ${err.message}`);
        });
    } catch (error) {
      console.error('Payment Error:', error);
      alert('결제 초기화 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
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