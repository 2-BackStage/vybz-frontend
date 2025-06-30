import { Suspense } from 'react';
import SuccessPage from './SuccessPage';
import { getServerSession } from 'next-auth/next';
import { options } from '../api/auth/[...nextauth]/options';

export default async function page() {

  const session = await getServerSession(options);

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SuccessPage userUuid={session?.user?.userUuid || ''} />
    </Suspense>
  );
}
