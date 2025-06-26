import Link from 'next/link';
import LiveFreeViewSwiper from '@/components/common/swiper/LiveFreeViewSwiper';
import { LiveFreeViewType } from '@/types/ResponseDataTypes';

export default function LiveFreeViewSection({
  data,
}: {
  data: LiveFreeViewType[];
}) {
  return (
    <section className="absolute top-164 left-0 right-0 px-6 mt-10 pb-20">
      <div className="flex justify-between items-center pb-6">
        <h2 className="text-white text-xl font-semibold">Now Live</h2>
        <Link href="/liveViewAll" className="text-sm text-gray-400">
          View All
        </Link>
      </div>

      <LiveFreeViewSwiper data={data} />
    </section>
  );
}
