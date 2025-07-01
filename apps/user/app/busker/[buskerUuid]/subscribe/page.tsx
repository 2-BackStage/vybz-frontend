import { getBuskerInfo } from '@/services/user-services/UserInfoServices';
import SubscribeClient from './SubscribeClient';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function Page({ params }: { params: Promise<{ buskerUuid: string }> }) {
  const { buskerUuid } = await params;

  const buskerInfo = await getBuskerInfo(buskerUuid);

  const nickname = buskerInfo.nickname || '버스커';
  const profileUrl = buskerInfo.profileImageUrl || '/defaultProfile.png';

  const session = await getServerSession(options);
  const userUuid = session?.user?.userUuid;

  return <SubscribeClient nickname={nickname} profileUrl={profileUrl} buskerUuid={buskerUuid} userUuid={userUuid} />;
}
  