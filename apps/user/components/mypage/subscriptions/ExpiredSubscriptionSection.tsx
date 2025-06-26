import Image from 'next/image';
import Link from 'next/link';
import { SubscriptionType } from '@/types/ResponseDataTypes';
import { Button } from '@repo/ui/components/ui/button';

export default function ExpiredSubscriptionSection({
  subscriptions,
}: {
  subscriptions: SubscriptionType[];
}) {
  return (
    <section className="px-4 py-6 pb-18">
      <h2 className="text-2xl font-bold mb-4">만료된 정기 구독</h2>
      {subscriptions.map((sub) => (
        <div
          key={sub.id}
          className="bg-[#2D2D4D] rounded-xl p-4 my-6 shadow-lg opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition duration-300"
        >
          <div className="flex items-center space-x-4">
            <Image
              src={sub.avatarUrl}
              alt={`${sub.name}'s profile`}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-300">
                {sub.name}
              </h3>
              <p className="text-sm text-gray-400">
                {sub.months}개월 구독이 만료되었어요
              </p>
              <p className="text-sm text-gray-500">다시 응원해보는게 어때요?</p>
            </div>
          </div>
          <Link href={`/busker/${sub.id}`} passHref>
            <Button className="mt-4 w-full py-2 px-4 rounded-lg border-2 border-cyan-400 text-cyan-400 text-sm font-medium shadow-md">
              구독 갱신하기
            </Button>
          </Link>
        </div>
      ))}
    </section>
  );
}
