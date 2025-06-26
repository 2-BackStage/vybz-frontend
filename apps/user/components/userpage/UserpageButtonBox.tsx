import Image from 'next/image';
import { Guitar } from '@repo/ui/components/icons';
import { OtherUserDataType } from '@/types/ResponseDataTypes';

export default function UserpageButtonBox({
  userInfo,
}: {
  userInfo: OtherUserDataType;
}) {
  return (
    <section className="flex items-center justify-between px-6 space-x-2 mt-8 text-white font-poppins">
      <div className="relative flex-1 h-30 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl py-9 overflow-hidden">
        <Guitar className="absolute inset-y-1/3 left-3/4 -translate-x-1/2 opacity-20 w-16 h-16 pointer-events-none" />
        <p className="font-bold text-2xl ml-3">{userInfo.followingCount}</p>
        <p className="ml-3">팔로잉</p>
      </div>
      <div className="relative flex-1 h-30 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl py-9 overflow-hidden">
        <Image
          src="/mypage.png"
          alt="vTicket"
          width={300}
          height={300}
          className="absolute bottom-0 right-1/3 translate-x-1/2 w-28 h-28 opacity-20 object-cover pointer-events-none"
        />
        <p className="font-bold text-2xl ml-3">{userInfo.subscribeCount}</p>
        <p className="ml-3">구독</p>
      </div>

      <div className="relative flex-1 h-30  rounded-xl py-9 overflow-hidden">
        <Image
          src={`${userInfo.buskerProfileImage}`}
          alt="buskerProfileImage"
          fill
          className="object-cover -z-10 opacity-55"
        />
        <p className="font-bold text-xs ml-3 mt-6 z-10">Bias Busker</p>
        <p className="font-bold text-2xl ml-3 z-10">{userInfo.buskerName}</p>
      </div>
    </section>
  );
}
