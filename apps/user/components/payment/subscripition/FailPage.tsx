'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentFailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [failInfo, setFailInfo] = useState({
    code: '',
    message: '',
    orderId: '',
    userUuid: '',
    buskerUuid: '',
    price: '',
  });

  useEffect(() => {
    const code = params.get('code') || 'UNKNOWN_ERROR';
    const message = params.get('message') || '결제가 실패했습니다.';
    const orderId = params.get('orderId') || '';
    const userUuid = params.get('userUuid') || '';
    const buskerUuid = params.get('buskerUuid') || '';
    const price = params.get('price') || '';

    setFailInfo({ code, message, orderId, userUuid, buskerUuid, price });
  }, [params]);

  const handleRetry = () => {
    if (failInfo.userUuid && failInfo.buskerUuid) {
      router.push(`/busker/${failInfo.buskerUuid}/subscribe`);
    } else {
      router.push('/');
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">결제가 실패했어요</h1>
          <p className="text-lg text-gray-800 mb-2">
            사유: {decodeURIComponent(failInfo.message)}
          </p>

          {failInfo.orderId && (
            <p className="text-sm text-gray-500 mt-1">주문 ID: {failInfo.orderId}</p>
          )}

          <p className="text-sm text-gray-400 mt-2">에러 코드: {failInfo.code}</p>
        </div>

        <div className="space-y-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            onClick={handleRetry}
          >
            다시 시도하기
          </button>
          <button
            className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            onClick={handleGoHome}
          >
            홈으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}
