'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function SuccessPage(userUuid : {userUuid:string}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');
  
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (orderId && paymentKey && amount && userUuid) {
      fetch('https://back.vybz.kr/payment-service/api/v1/payment/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userUuid,
          orderId,
          paymentKey,
          amount: Number(amount),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('✅ 결제 승인 완료:', data);
          setConfirmed(true);
        })
        .catch((err) => {
          console.error('❌ 결제 승인 실패:', err);
        });
    }
  }, [orderId, paymentKey, amount, userUuid]);

  if (status === 'loading') {
    return <div className="text-center text-white">세션 불러오는 중...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-8 flex flex-col items-center">
        <button
          className="absolute right-4 top-4 text-gray-400 text-2xl hover:text-gray-600"
          onClick={() => router.replace('/mypage')}
          aria-label="닫기"
        >
          ×
        </button>
        <div className={`rounded-full p-4 mb-4 ${confirmed ? 'bg-green-400' : 'bg-gray-400'}`}>
          <svg width="48" height="48" fill="none">
            <circle cx="24" cy="24" r="24" fill={confirmed ? '#4ade80' : '#9ca3af'} />
            {confirmed && (
              <path d="M16 25l6 6 10-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          {confirmed ? '결제에 성공하였습니다.' : '결제 승인 중입니다...'}
        </h2>
        <div className="w-full bg-gray-50 border rounded-xl p-6 mb-6">
          <p className="text-gray-500 font-semibold mb-1">주문번호 :</p>
          <p className="text-lg font-bold text-gray-700">{orderId}</p>
        </div>
        <button
          onClick={() => router.replace('/mypage')}
          className="w-full border border-green-400 text-green-600 font-bold py-3 rounded-xl hover:bg-green-50 transition"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
