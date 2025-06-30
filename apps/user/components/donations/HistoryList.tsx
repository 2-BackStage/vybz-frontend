import {
  HistoryDataType,
  PaymentHistoryItem,
  UseHistoryDataType,
} from '@/types/ResponseDataTypes';
import PurchaseHistoryItem from '@/components/donations/PurchaseHistoryItem';
import UseHistoryItem from '@/components/donations/UseHistoryItem';
import PaginationController from '@/components/common/PaginationController';
import dayjs from 'dayjs';

export default function HistoryList({
  historyData,
}: {
  historyData: HistoryDataType;
}) {
  const groupedData = historyData.data.reduce(
    (acc, history) => {
      const date =
      historyData.type === 'purchase'
        ? dayjs((history as PaymentHistoryItem).approvedAt).format('YYYY-MM-DD')
        : (history as UseHistoryDataType).date;
        
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(history);
      return acc;
    },
    {} as Record<string, (PaymentHistoryItem | UseHistoryDataType)[]>
  );

  const sortedDates = Object.keys(groupedData).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <>
      <section className="bg-gray-800 text-white rounded-lg px-4 pt-2 pb-4">
        {sortedDates.map((date) => (
          <div key={date}>
            {historyData.type === 'purchase' ? (
              <PurchaseHistoryItem
                date={date}
                groupedData={
                  groupedData as Record<string, PaymentHistoryItem[]>
                }
              />
            ) : (
              <UseHistoryItem
                date={date}
                groupedData={
                  groupedData as Record<string, UseHistoryDataType[]>
                }
              />
            )}
          </div>
        ))}
      </section>
      <PaginationController
        page={historyData.page}
        totalPages={historyData.totalPages}
      />
    </>
  );
}
