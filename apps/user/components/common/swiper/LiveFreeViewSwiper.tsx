'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { LiveFreeViewType } from '@/types/ResponseDataTypes';
import LiveCard from '@/components/common/card/LiveCard';

export default function LiveFreeViewSwiper({
  data,
}: {
  data: LiveFreeViewType[];
}) {
  return (
    <Swiper slidesPerView={'auto'} spaceBetween={16}>
      {data.map((item) => (
        <SwiperSlide key={item.id} style={{ width: '140px' }}>
          <LiveCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
