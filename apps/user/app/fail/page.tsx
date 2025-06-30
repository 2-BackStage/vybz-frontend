// app/fail/page.tsx
import { Suspense } from 'react';
import FailPage from './FailPage'; // 클라이언트 컴포넌트

export default function FailPageWrapper() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <FailPage />
    </Suspense>
  );
}
