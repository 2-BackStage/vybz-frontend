import Image from 'next/image';
import Link from 'next/link';
import { ExtendedMemberShipType } from '@/types/ResponseDataTypes';
import { Button } from '@repo/ui/components/ui/button';

// 날짜 포맷팅 함수
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '날짜 정보 없음';
    }
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('날짜 포맷팅 오류:', error);
    return '날짜 정보 없음';
  }
};

export default function SubscriptionSection({
  subscriptions,
}: {
  subscriptions: ExtendedMemberShipType[];
}) {
  return (
    <section className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">구독중인 Busker</h2>
      {!subscriptions || subscriptions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg mb-4">아직 구독중인 버스커가 없어요</p>
          <p className="text-gray-500 text-sm">마음에 드는 버스커를 찾아서 구독해보세요!</p>
        </div>
      ) : (
        subscriptions.map((sub) => (
          <div
            key={sub.buskerUuid}
            className="flex items-center justify-between bg-div-background rounded-xl px-4 py-3 shadow-md my-4"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={sub.profileImageUrl}
                alt={sub.buskerNickname}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>

            <div className="ml-4 flex-1">
              <h3 className="font-semibold leading-tight">{sub.buskerNickname}</h3>
              <p className="text-gray-300 text-sm">{sub.displayText} 구독중</p>
              <p className="text-gray-400 text-xs mt-1">
                가입일: {formatDate(sub.createdAt)}
              </p>
            </div>

            <Link href={`/busker/${sub.buskerUuid}`}>
              <Button className="text-blue-400 text-sm font-medium border border-blue-400 px-3 py-1 rounded-md hover:bg-blue-400 hover:text-white transition-colors">
                구독 관리하기
              </Button>
            </Link>
          </div>
        ))
      )}
    </section>
  );
}
