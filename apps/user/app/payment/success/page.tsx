import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import SuccessPage from '@/components/payment/SuccessPage';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function page() {

  const session = await getServerSession(options);

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SuccessPage userUuid={session?.user?.userUuid || ''} />
    </Suspense>
  );
}
