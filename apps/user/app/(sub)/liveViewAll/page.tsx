import CategoryBar from '@/components/common/navbar/CategoryBar';
import LiveViewAllSection from '@/components/liveViewAll/LiveViewAllSection';

import { CategoryData } from '@/data/categoryData';
import { dummyLiveData } from '@/data/swiperData';

export default function Page() {
  return (
    <main className="px-2">
      <CategoryBar categories={CategoryData} className="pt-20" />
      <LiveViewAllSection lives={dummyLiveData} />
    </main>
  );
}
