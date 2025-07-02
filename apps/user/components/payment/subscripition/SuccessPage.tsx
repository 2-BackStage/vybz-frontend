'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { v4 as uuidv4 } from 'uuid';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  const [message, setMessage] = useState('카드 등록 성공! 결제 진행 중...');
  const [userUuid, setUserUuid] = useState('');
  const [buskerUuid, setBuskerUuid] = useState('');
  const [price, setPrice] = useState(0);
  const [canCancel, setCanCancel] = useState(false);

  const startBillingProcess = useCallback(() => {
    const authKey = params.get('authKey');
    const customerKey = params.get('customerKey');
    const user = params.get('userUuid')!;
    const busker = params.get('buskerUuid')!;
    const rawPrice = Number(params.get('price'));

    if (!authKey || !customerKey || !user || !busker || !rawPrice) {
      setMessage('❌ 필수 파라미터 누락');
      return;
    }

    setUserUuid(user);
    setBuskerUuid(busker);
    setPrice(rawPrice);
    setMessage('카드 등록 중...');

    // 1단계: billing key 발급
    fetch('https://back.vybz.kr/support-service/api/v1/subscription/save-billing-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        authKey, 
        customerKey, 
        userUuid: user, 
        buskerUuid: busker, 
        price: rawPrice 
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('billingKey 발급 실패');
        return res.json();
      })
      .then((data) => {
        const billingKey = data.result.billingKey;
        const orderName = `${busker} 정기 구독`;
        
        // 2단계: 정기결제 실행
        return fetch('https://back.vybz.kr/payment-service/api/v1/membership/billing/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            billingKey,
            customerKey,
            userUuid: user,
            buskerUuid: busker,
            orderName,
            price: rawPrice,
          }),
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error('결제 실패');
        return res.json();
      })
      .then(() => {
        setMessage('🎉 결제 성공!');
        setCanCancel(true);
        
        // 구독 성공 시 localStorage 업데이트
        if (typeof window !== 'undefined') {
          localStorage.setItem(`subscription_${busker}`, JSON.stringify({
            isSubscribed: true,
            timestamp: Date.now()
          }));
        }
      })
      .catch((err) => {
        console.error('❌ 오류:', err);
        setMessage(`❌ 오류 발생: ${err.message}`);
      });
  }, [params]);

  const handleCancel = async () => {
    try {
      setMessage('구독 해지 중...');
      const res = await fetch('https://back.vybz.kr/support-service/api/v1/subscription', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userUuid, buskerUuid }),
      });

      if (res.ok) {
        setMessage('🛑 정기 구독이 정상적으로 해지되었습니다.');
        setCanCancel(false);
        
        // 구독 해지 시 localStorage 업데이트
        if (typeof window !== 'undefined') {
          localStorage.setItem(`subscription_${buskerUuid}`, JSON.stringify({
            isSubscribed: false,
            timestamp: Date.now()
          }));
        }
        
        // 구독 해지 성공 후 페이지 새로고침
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const error = await res.json();
        setMessage(`❌ 해지 실패: ${error.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('구독 해지 중 오류:', error);
      setMessage('❌ 구독 해지 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleRenew = async () => {
    const tossPayments = await loadTossPayments(clientKey);
    const newCustomerKey = `cus_${uuidv4().replace(/-/g, '')}`;

    tossPayments
      .requestBillingAuth('카드', {
        customerKey: newCustomerKey,
        successUrl: `${window.location.origin}/subscription/success?customerKey=${newCustomerKey}&userUuid=${userUuid}&buskerUuid=${buskerUuid}&price=${price}`,
        failUrl: `${window.location.origin}/subscription/fail?userUuid=${userUuid}&buskerUuid=${buskerUuid}&price=${price}`,
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    startBillingProcess();
  }, [params, startBillingProcess]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">결제 성공</h1>
          <p className="text-gray-600">{message}</p>
        </div>

        {canCancel && (
          <div className="space-y-4">
            <button
              onClick={handleCancel}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              정기 구독 해지하기
            </button>
            <button
              onClick={() => {
                router.push('/mypage/subscriptions');
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              }}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              구독 관리로 이동
            </button>
          </div>
        )}

        {!canCancel && (
          <div className="space-y-4">
            <button
              onClick={handleRenew}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🔄 재구독하기
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              홈으로 이동
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
