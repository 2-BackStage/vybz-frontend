import Image from 'next/image';
import Link from 'next/link';
import { Guitar } from '@repo/ui/components/icons';
import { UserInfoDataType } from '@/types/ResponseDataTypes';

export default function MypageButtonBox({
  userInfo,
}: {
  userInfo: UserInfoDataType;
}) {
  return (
    <section className="flex items-center justify-between px-6 space-x-2 mt-8 text-white font-poppins">
      <Link
        href="/mypage/followings"
        className="relative flex-1 h-30 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl py-9 overflow-hidden"
      >
        <Guitar className="absolute inset-y-1/3 left-3/4 -translate-x-1/2 opacity-20 w-16 h-16 pointer-events-none" />
        <p className="font-bold text-2xl ml-3">{userInfo.followingCount}</p>
        <p className="ml-3">팔로잉</p>
      </Link>
      <Link
        href="/mypage/subscriptions"
        className="relative flex-1 h-30 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl py-9 overflow-hidden"
      >
        <Image
          src="/mypage.png"
          alt="vTicket"
          width={300}
          height={300}
          className="absolute bottom-0 right-1/3 translate-x-1/2 w-28 h-28 opacity-20 object-cover pointer-events-none"
        />
        <p className="font-bold text-2xl ml-3">{userInfo.subscriptionCount}</p>
        <p className="ml-3">구독</p>
      </Link>

      <Link
        href="/mypage/donations"
        className="relative flex-1 h-30 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl py-9 overflow-hidden"
      >
        <Image
          src="/logo/vticket.png"
          alt="vTicket"
          width={200}
          height={200}
          className="absolute -bottom-3 right-1/3 translate-x-1/2 w-28 h-28 opacity-20 object-cover pointer-events-none"
        />
        <p className="font-bold text-xl ml-3">V티켓</p>
        <p className="font-base text-lg ml-3">후원 내역</p>
      </Link>
    </section>
  );
}
