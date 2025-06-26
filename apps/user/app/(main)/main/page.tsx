import FullscreenSwiper from '@/components/common/swiper/FullscreenSwiper';
import CategoryBar from '@/components/common/navbar/CategoryBar';
import LiveFreeViewSection from '@/components/main/LiveFreeViewSection';

import { videoSlideData } from '@/data/swiperData';
import { CategoryData } from '@/data/categoryData';
import { liveFreeViewData } from '@/data/swiperData';

export default function page() {
  const DummyData = videoSlideData;
  const DummyCategoryData = CategoryData;
  const DummyLiveFreeViewData = liveFreeViewData;
  return (
    <main>
      <FullscreenSwiper data={DummyData} />
      <CategoryBar
        categories={DummyCategoryData}
        className="absolute top-140 left-0 right-0 z-20 px-6"
      />
      <LiveFreeViewSection data={DummyLiveFreeViewData} />
    </main>
  );
}
