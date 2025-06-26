// import { getUserInfo } from '@/services/user-services/user-info-read-services';
import UserpageButtonBox from '@/components/userpage/UserpageButtonBox';
import FanFeedSection from '@/components/mypage/Feed/FanFeedSection';
import { UseModal } from '@/context/ModalContext';
import CommentDrawer from '@/components/reels/Comment/CommentDrawer';
import { CommentsData } from '@/data/CommentData';
import { FanFeedData } from '@/data/FanFeedData';
import UserProfile from '@/components/userpage/UserProfile';
import { UserData } from '@/data/UserData';

export default async function page({
  params,
}: {
  params: Promise<{ userUuid: string }>;
}) {
  // const userUuid = await params;
  // const userInfo = await getUserInfo(userUuid.userUuid || '');

  console.log(await params);

  return (
    <main>
      <UserProfile data={UserData} />
      <UserpageButtonBox userInfo={UserData} />
      <UseModal>
        <FanFeedSection userName="김동현" initialFeeds={FanFeedData} />
        <CommentDrawer commentData={CommentsData} />
      </UseModal>
    </main>
  );
}
