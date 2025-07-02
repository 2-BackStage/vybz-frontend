import UserProfile from '@/components/mypage/UserProfile';
import Vticket from '@/components/mypage/Vticket';
import MypageButtonBox from '@/components/mypage/MypageButtonBox';
import FanFeedSection from '@/components/mypage/Feed/FanFeedSection';
import { UseModal } from '@/context/ModalContext';
import CommentDrawer from '@/components/reels/Comment/CommentDrawer';
import { CommentsData } from '@/data/CommentData';
import { getUserInfo } from '@/services/user-services/user-info-read-services';
import { fetchActiveMemberships } from '@/services/payment-services';
import { FanFeedData } from '@/data/FanFeedData';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function page() {
  try {
    const session = await getServerSession(options);
    const userUuid = session?.user?.userUuid || '';
    
    // 기본 사용자 정보 가져오기
    let userInfo = await getUserInfo(userUuid);
    
    // 실제 구독 카운트 계산
    try {
      const activeMemberships = await fetchActiveMemberships(userUuid);
      userInfo = {
        ...userInfo,
        subscriptionCount: activeMemberships?.length || 0
      };
    } catch (error) {
      console.error('구독 카운트 계산 실패:', error);
      // 에러가 발생해도 기본값 사용
      userInfo = {
        ...userInfo,
        subscriptionCount: 0
      };
    }
    
    return (
      <main>
        <UserProfile userInfo={userInfo} />
        <Vticket vticketCount={userInfo.vticketCount} userUuid={userUuid} />
        <MypageButtonBox userInfo={userInfo} />
        <UseModal>
          <FanFeedSection initialFeeds={FanFeedData} />
          <CommentDrawer commentData={CommentsData} />
        </UseModal>
      </main>
    );
  } catch (error) {
    console.error('마이페이지 로딩 실패:', error);
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">페이지를 불러올 수 없습니다</h1>
          <p className="text-gray-400">잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }
}
