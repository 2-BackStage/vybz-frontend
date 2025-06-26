import VticketInstructions from '@/components/donations/VticketInstructions';
import TabButtonBox from '@/components/common/button/TabButtonBox';
import HistoryList from '@/components/donations/HistoryList';
import { historyData } from '@/data/MypageData';

export default function page() {
  return (
    <main className="text-white mt-16 mx-6 space-y-4 mb-4">
      <VticketInstructions />
      <TabButtonBox labels={['사용 내역', '구매 내역']} />
      <HistoryList historyData={historyData} />
    </main>
  );
}
