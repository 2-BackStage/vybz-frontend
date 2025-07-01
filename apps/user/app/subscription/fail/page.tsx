import { Suspense } from 'react';
import FailPage from '../../../components/payment/subscripition/FailPage';

export default function SubscriptionFailPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <FailPage />
    </Suspense>
  );
} 