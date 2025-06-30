import { Suspense } from 'react';
import SuccessPage from './SuccessPage';

export default function SuccessPageWrapper() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SuccessPage />
    </Suspense>
  );
}
