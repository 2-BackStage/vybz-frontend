import MainFooter from '@/components/common/layout/footer/MainFooter';
import MainHeader from '@/components/common/layout/header/MainHeader';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { BuskerInfoReadService } from '@/services/info-services/BuskerInfoReadService';
import { getServerSession } from 'next-auth';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  const buskerInfoReadService = await BuskerInfoReadService(
    session?.user.buskerUuid || ''
  );

  return (
    <>
      <MainHeader userUrl={buskerInfoReadService.profileImageUrl || ''} />
      {children}
      <MainFooter />
    </>
  );
}
