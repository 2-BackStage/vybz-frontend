import Image from 'next/image';
import { SubscriptionType } from '@/types/ResponseDataTypes';
import { Button } from '@repo/ui/components/ui/button';

export default function SubscriptionSection({
  subscriptions,
}: {
  subscriptions: SubscriptionType[];
}) {
  return (
    <section className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">구독중인 Busker</h2>
      {subscriptions.map((sub) => (
        <div
          key={sub.id}
          className="flex items-center justify-between bg-div-background rounded-xl px-4 py-3 shadow-md my-4"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={sub.avatarUrl}
              alt={sub.name}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>

          <div className="ml-4 flex-1">
            <h3 className="font-semibold leading-tight">{sub.name}</h3>
            <p className="text-gray-300 text-sm">{sub.months}개월 구독중</p>
            <p className="text-gray-400 text-xs mt-1">
              가입일: {sub.subscribedSince}
            </p>
          </div>

          <Button className="text-blue-400 text-sm font-medium border border-blue-400 px-3 py-1 rounded-md">
            구독 관리하기
          </Button>
        </div>
      ))}
    </section>
  );
}
