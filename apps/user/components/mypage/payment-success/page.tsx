'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (orderId && paymentKey && amount) {
      fetch('https://back.vybz.kr/payment-service/api/v1/payment/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userUuid: '20be5d7c-29a1-4aed-8366-7e6cf8e323d4', 
          orderId,
          paymentKey,
          amount: Number(amount),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('✅ 승인 완료:', data);
          setConfirmed(true);
        })
        .catch((err) => {
          console.error('❌ 승인 실패:', err);
        });
    }
  }, [orderId, paymentKey, amount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {confirmed ? (
        <>
          <h1 className="text-2xl font-bold text-green-600">✅ 결제가 완료되었습니다!</h1>
          <p className="mt-2 text-sm text-gray-600">티켓이 정상적으로 충전되었습니다.</p>
        </>
      ) : (
        <p className="text-gray-500">결제 승인 중입니다...</p>
      )}
    </div>
  );
}