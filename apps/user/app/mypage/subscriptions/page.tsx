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
  days: number;
  months: number;
  displayText: string;
}

// 구독 기간을 계산하는 함수 (일/월 단위)
const calculateSubscriptionPeriod = (createdAt: string, memberShipStatus: string, updatedAt?: string) => {
  try {
    const startDate = new Date(createdAt);
    const endDate = memberShipStatus === 'CANCELED' && updatedAt ? new Date(updatedAt) : new Date();
    
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    
    // 최소 1일
    const days = Math.max(1, diffDays);
    const months = Math.max(0, diffMonths);
    
    // 표시 텍스트 결정
    let displayText: string;
    if (months >= 1) {
      displayText = `${months}개월째`;
    } else {
      displayText = `${days}일째`;
    }
    
    return { days, months, displayText };
  } catch (error) {
    console.error('구독 기간 계산 오류:', error);
    return { days: 1, months: 0, displayText: '1일째' };
  }
};

export default async function Page() {
  try {
    const session = await getServerSession(options);
    const userUuid = session?.user?.userUuid;

    if (!userUuid) return <div>로그인이 필요합니다.</div>;

    // 멤버십 데이터 가져오기
    let activeMemberships: MemberShipType[] = [];
    let expiredMemberships: MemberShipType[] = [];

    try {
      const activeResult = await fetchActiveMemberships(userUuid);
      activeMemberships = activeResult || [];
    } catch (error) {
      console.error('활성 멤버십 조회 실패:', error);
      activeMemberships = [];
    }

    try {
      const expiredResult = await fetchExpiredMemberships(userUuid);
      expiredMemberships = expiredResult || [];
    } catch (error) {
      console.error('만료된 멤버십 조회 실패:', error);
      expiredMemberships = [];
    }

    const extendMemberships = async (
      memberships: MemberShipType[]
    ): Promise<ExtendedMemberShipType[]> => {
      if (!memberships || memberships.length === 0) {
        return [];
      }

      return await Promise.all(
        memberships.map(async (m) => {
          try {
            const info = await getBuskerInfo(m.buskerUuid);
            const { days, months, displayText } = calculateSubscriptionPeriod(m.createdAt, m.memberShipStatus, m.updatedAt);
      
            return {
              ...m,
              buskerNickname: info.nickname || '알 수 없는 버스커',
              profileImageUrl: info.profileImageUrl || '/defaultProfile.png',
              days,
              months,
              displayText,
            };
          } catch (error) {
            console.error(`버스커 정보 조회 실패 (${m.buskerUuid}):`, error);
            const { days, months, displayText } = calculateSubscriptionPeriod(m.createdAt, m.memberShipStatus, m.updatedAt);
            
            return {
              ...m,
              buskerNickname: '알 수 없는 버스커',
              profileImageUrl: '/defaultProfile.png',
              days,
              months,
              displayText,
            };
          }
        })
      );
    };  

    const activeExtended = await extendMemberships(activeMemberships);
    const expiredExtended = await extendMemberships(expiredMemberships);

    // 활성 구독이 있을 때만 favorite 계산
    const favorite = activeExtended.length > 0 ? activeExtended.reduce((oldest, cur) => {
      if (!oldest) return cur;
      return new Date(cur.createdAt) < new Date(oldest.createdAt) ? cur : oldest;
    }, undefined as ExtendedMemberShipType | undefined) : undefined;

    const createdAt = favorite?.createdAt?.split('T')[0] ?? '';
    const displayText = favorite?.displayText ?? '1일째';

    return (
      <ImageBackgroundWrapper
        src={favorite?.profileImageUrl || '/defaultProfile.png'}
        className="text-white font-poppins"
      >
        {favorite && (
          <FavoriteBuskerCard
            name={favorite.buskerNickname}
            displayText={displayText}
            registrationDate={createdAt}
          />
        )}
        <SubscriptionSection subscriptions={activeExtended} />
        <ExpiredSubscriptionSection subscriptions={expiredExtended} />
      </ImageBackgroundWrapper>
    );
  } catch (error) {
    console.error('구독 관리 페이지 로딩 실패:', error);
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">구독 정보를 불러올 수 없습니다</h1>
          <p className="text-gray-400">잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }
}