// app/fail/page.tsx
import { Suspense } from 'react';
import FailPage from '../../components/payment/FailPage';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

export default async function page() {

const session = await getServerSession(options);

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <FailPage userUuid={session?.user?.userUuid || ''} />
    </Suspense>
  );
}
