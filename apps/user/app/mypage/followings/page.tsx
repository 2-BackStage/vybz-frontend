import SearchBar from '@/components/common/form/SearchBar';
import FollowingList from '@/components/mypage/Followings/FollowingList';
import { getFollowingsUsers } from '@/services/following-services/following-services';

export default async function FollowingsPage() {
  const initialFollowings = await getFollowingsUsers();

  console.log(initialFollowings);

  return (
    <main className="pt-20 px-6 space-y-10">
      {initialFollowings.content?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
          <p>팔로잉한 버스커가 없습니다.</p>
        </div>
      ) : (
        <>
          <SearchBar placeholder="검색" />
          <FollowingList initialFollowings={initialFollowings} />
        </>
      )}
    </main>
  );
}
