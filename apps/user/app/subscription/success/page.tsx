import { Suspense } from 'react';
import SuccessPage from '../../../components/payment/subscripition/SuccessPage';

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SuccessPage />
    </Suspense>
  );
} 