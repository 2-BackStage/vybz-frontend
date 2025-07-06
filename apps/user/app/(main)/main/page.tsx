import FullscreenSwiper from '@/components/common/swiper/FullscreenSwiper';
import CategoryBar from '@/components/common/navbar/CategoryBar';
import LiveFreeViewSection from '@/components/main/LiveFreeViewSection';

import { CategoryData } from '@/data/categoryData';
import { liveFreeViewData } from '@/data/swiperData';
import { getReelsVideos } from '@/services/reels-services/reels-services';

export default async function page() {
  const DummyCategoryData = CategoryData;
  const DummyLiveFreeViewData = liveFreeViewData;
  const ReelsData = await getReelsVideos(10);

  return (
    <main>
      <FullscreenSwiper data={ReelsData} />
      <CategoryBar
        categories={DummyCategoryData}
        className="absolute top-140 left-0 right-0 z-20 px-6"
      />
      <LiveFreeViewSection data={DummyLiveFreeViewData} />
    </main>
  );
}
