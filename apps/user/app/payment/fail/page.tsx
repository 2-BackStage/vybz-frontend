// app/fail/page.tsx
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import FailPage from '@/components/payment/FailPage';

export default async function page() {

const session = await getServerSession(options);

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <FailPage userUuid={session?.user?.userUuid || ''} />
    </Suspense>
  );
}
