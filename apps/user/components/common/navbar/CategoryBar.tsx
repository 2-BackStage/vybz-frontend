'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CategoryDataType } from '@/types/ResponseDataTypes';
import { Button } from '@repo/ui/components/ui/button';

export default function CategoryBar({
  categories,
  className,
}: {
  categories: CategoryDataType[];
  className?: string;
}) {
  const [selected, setSelected] = useState(categories[0]?.name ?? 'All');

  const handleClick = (category: string) => {
    setSelected(category);
  };

  return (
    <nav className={className}>
      <h2 className="mb-6 font-poppins text-white text-3xl font-semibold">
        Category
      </h2>

      <Swiper slidesPerView="auto" spaceBetween={12} className="w-full">
        {categories.map((category) => (
          <SwiperSlide key={category.id} style={{ width: 'auto' }}>
            <Button
              onClick={() => handleClick(category.name)}
              className={`text-lg p-4 rounded-md transition-all border-none
                ${
                  selected === category.name
                    ? 'bg-cyan-400 text-black border-cyan-400 hover:bg-cyan-300'
                    : 'text-white border-white hover:bg-white/10'
                }`}
            >
              {category.name}
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </nav>
  );
}
