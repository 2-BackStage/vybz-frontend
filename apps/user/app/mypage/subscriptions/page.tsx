import ImageBackgroundWrapper from '@/components/common/layouts/wrapper/backgrounds/ImageBackgroundWrapper';
import FavoriteBuskerCard from '@/components/mypage/subscriptions/FavoriteBuskerCard';
import SubscriptionSection from '@/components/mypage/subscriptions/SubscriptionSection';
import ExpiredSubscriptionSection from '@/components/mypage/subscriptions/ExpiredSubscriptionSection';

import { MemberShipType } from '@/types/ResponseDataTypes';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { fetchActiveMemberships, fetchExpiredMemberships } from '@/services/payment-services';
import { getBuskerInfo } from '@/services/user-services/UserInfoServices';

interface ExtendedMemberShipType extends MemberShipType {
  buskerNickname: string;
  profileImageUrl: string;
  months: number;
}

export default async function Page() {
  const session = await getServerSession(options);
  const userUuid = session?.user?.userUuid;

  if (!userUuid) return <div>로그인이 필요합니다.</div>;

  const activeMemberships = await fetchActiveMemberships(userUuid);
  const expiredMemberships = await fetchExpiredMemberships(userUuid);

  const extendMemberships = async (
    memberships: MemberShipType[]
  ): Promise<ExtendedMemberShipType[]> => {
    return await Promise.all(
      memberships.map(async (m) => {
        const info = await getBuskerInfo(m.buskerUuid);
  
        const baseDate = m.memberShipStatus === 'CANCELED' ? m.updatedAt : m.createdAt;
        const months = Math.floor(
          (new Date(baseDate).getTime() - new Date(m.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30)
        );
  
        return {
          ...m,
          buskerNickname: info.nickname,
          profileImageUrl: info.profileImageUrl,
          months,
        };
      })
    );
  };  

  const activeExtended = await extendMemberships(activeMemberships);
  const expiredExtended = await extendMemberships(expiredMemberships);

  const favorite = activeExtended.reduce((oldest, cur) => {
    if (!oldest) return cur;
    return new Date(cur.createdAt) < new Date(oldest.createdAt) ? cur : oldest;
  }, undefined as ExtendedMemberShipType | undefined);

  const createdAt = favorite?.createdAt?.split('T')[0] ?? '';
  const months = favorite?.months ?? 0;

  return (
    <ImageBackgroundWrapper
      src={favorite?.profileImageUrl || '/defaultProfile.png'}
      className="text-white font-poppins"
    >
      {favorite && (
        <FavoriteBuskerCard
          name={favorite.buskerNickname}
          months={months}
          registrationDate={createdAt}
        />
      )}
      <SubscriptionSection subscriptions={activeExtended} />
      <ExpiredSubscriptionSection subscriptions={expiredExtended} />
    </ImageBackgroundWrapper>
  );
}