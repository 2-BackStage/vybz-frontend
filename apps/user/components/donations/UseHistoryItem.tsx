import Image from 'next/image';
import { UseHistoryDataType } from '@/types/ResponseDataTypes';
import { formatAmount } from '@/utils/format';

export default function UseHistoryItem({
  date,
  groupedData,
}: {
  date: string;
  groupedData: Record<string, UseHistoryDataType[]>;
}) {
  return (
    <>
      <div className="text-sm text-gray-400 my-3 font-medium">{date}</div>
      <div className="space-y-4">
        {groupedData[date]?.map((history, index) => (
          <div
            key={`${date}-${index}`}
            className="flex items-center justify-between py-1"
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={history.buskerProfileImage}
                  alt={history.buskerName}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-medium mb-1">{history.buskerName}</h3>
                <p className="text-xs text-gray-400 truncate">
                  {history.message}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 flex-shrink-0">
              <Image
                src="/logo/vticket.png"
                alt="vTicket"
                width={24}
                height={24}
              />
              <p className="text-sm">
                {formatAmount(history.vticketCount, '장')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
