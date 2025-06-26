import UserProfile from '@/components/mypage/UserProfile';
import Vticket from '@/components/mypage/Vticket';
import MypageButtonBox from '@/components/mypage/MypageButtonBox';
import FanFeedSection from '@/components/mypage/Feed/FanFeedSection';
import { UseModal } from '@/context/ModalContext';
import CommentDrawer from '@/components/reels/Comment/CommentDrawer';
import { CommentsData } from '@/data/CommentData';
import { getUserInfo } from '@/services/user-services/user-info-read-services';
import { FanFeedData } from '@/data/FanFeedData';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function page() {
  const session = await getServerSession(options);
  const userInfo = await getUserInfo(session?.user?.userUuid || '');
  return (
    <main>
      <UserProfile userInfo={userInfo} />
      <Vticket vticketCount={userInfo.vticketCount} />
      <MypageButtonBox userInfo={userInfo} />
      <UseModal>
        <FanFeedSection initialFeeds={FanFeedData} />
        <CommentDrawer commentData={CommentsData} />
      </UseModal>
    </main>
  );
}
