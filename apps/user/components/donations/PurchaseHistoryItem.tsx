import Image from 'next/image';
import { PurchaseHistoryDataType } from '@/types/ResponseDataTypes';
import { formatAmount } from '@/utils/format';

export default function PurchaseHistoryItem({
  date,
  groupedData,
}: {
  date: string;
  groupedData: Record<string, PurchaseHistoryDataType[]>;
}) {
  return (
    <>
      <div className="text-sm text-gray-400 my-3 font-medium">{date}</div>
      <div className="space-y-4">
        {groupedData[date]?.map((history, index) => (
          <div
            key={`${date}-${index}`}
            className="flex items-center justify-between"
          >
            <div className="size-12 rounded-full overflow-hidden bg-div-background shrink-0">
              <Image
                src="/logo/vticket.png"
                alt="vTicket"
                width={48}
                height={48}
              />
            </div>

            <div className="flex-1 mx-4">
              <p className=" font-semibold text-gray-600">
                {formatAmount(history.vticketCount, '장')}
              </p>
            </div>

            <p className="text-lg font-semibold text-right">
              {formatAmount(history.amount, '원')}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
