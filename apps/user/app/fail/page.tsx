// app/fail/page.tsx
import { Suspense } from 'react';
import FailPage from './FailPage';

export default function FailPageWrapper() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <FailPage />
    </Suspense>
  );
}
