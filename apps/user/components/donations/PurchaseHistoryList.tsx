import { useEffect, useState } from 'react';
import { fetchPaymentHistory } from '@/services/payment-services/payment-services';
import PurchaseHistoryItem from '@/components/donations/PurchaseHistoryItem';

// PaymentHistoryItem 타입은 실제 API 응답에 맞게 import 하세요
// import { PaymentHistoryItem } from '@/types/ResponseDataTypes';

type GroupedPurchaseData = Record<string, { vticketCount: number; amount: number }[]>;

function groupByDate(dtoList: { ticketCount: number; amount: number; approvedAt: string }[]): GroupedPurchaseData {
  return dtoList.reduce((acc, item) => {
    const date = item.approvedAt;
    if (!acc[date]) acc[date] = [];
    acc[date].push({
      vticketCount: item.ticketCount,
      amount: item.amount,
    });
    return acc;
  }, {} as GroupedPurchaseData);
}

export default function PurchaseHistoryList({ userUuid }: { userUuid: string }) {
  const [groupedData, setGroupedData] = useState<GroupedPurchaseData>({});
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPaymentHistory(userUuid, 1, 10)
      .then((res) => {
        const grouped = groupByDate(res.dtoList);
        setGroupedData(grouped);
        setDates(Object.keys(grouped).sort((a, b) => b.localeCompare(a)));
      })
      .finally(() => setLoading(false));
  }, [userUuid]);

  if (loading) return <div>로딩중...</div>;

  return (
    <div>
      {dates.map((date) => (
        <PurchaseHistoryItem key={date} date={date} groupedData={groupedData} />
      ))}
    </div>
  );
} 