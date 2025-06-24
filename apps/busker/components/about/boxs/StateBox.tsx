import { BuskerInfoReadResponseType } from '@/types/ResponseDataTypes';

export function StateBox({
  initialData,
}: {
  initialData: BuskerInfoReadResponseType;
}) {
  console.log(initialData);
  return (
    <div className="flex justify-between mb-4">
      <div className="text-center">
        <div className="text-white font-bold text-lg">
          {initialData.followerCount}
        </div>
        <div className="text-blue-200 text-xs">팔로워</div>
      </div>
      <div className="text-center">
        <div className="text-white font-bold text-lg">
          {initialData.subscribedCount}
        </div>
        <div className="text-blue-200 text-xs">구독자</div>
      </div>
      <div className="text-center">
        <div className="text-white font-bold text-lg">89</div>
        <div className="text-blue-200 text-xs">공연</div>
      </div>
    </div>
  );
}
