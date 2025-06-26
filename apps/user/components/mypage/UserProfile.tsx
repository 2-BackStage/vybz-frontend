import Image from 'next/image';
import Link from 'next/link';
import { CrossedTools } from '@repo/ui/components/icons';
import { UserInfoDataType } from '@/types/ResponseDataTypes';

const getFormattedDate = () => {
  const today = new Date();
  return today.toLocaleDateString('en-KR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export default function UserProfile({
  userInfo,
}: {
  userInfo: UserInfoDataType;
}) {
  return (
    <section className="flex justify-between items-center px-6 pt-10 text-white font-poppins">
      <div className="relative w-10 h-10 shrink-0">
        <Image
          src={userInfo.profileImageUrl || '/defaultProfile.png'}
          alt="user avatar"
          fill
          sizes="40px"
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-center">
        <p className="font-bold text-base">Hello,{userInfo.nickname}</p>
        <p className="font-light text-xs">Today {getFormattedDate()}</p>
      </div>
      <div>
        <Link href="/mypage/info/edit">
          <div className="w-10 h-10 border-2 border-gray-600 rounded-full flex items-center justify-center cursor-pointer p-2">
            <CrossedTools className="text-gray-600" />
          </div>
        </Link>
      </div>
    </section>
  );
}
