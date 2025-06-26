'use client';

import Image from 'next/image';
import { useState, useRef, useCallback, useEffect } from 'react';
import { VideoCarouselDataType } from '@/types/ResponseDataTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { Pagination } from 'swiper/modules';
import { Maximize, Volume2, VolumeX } from '@repo/ui/components/icons';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/components/ui/button';

export default function FullscreenSwiper({
  data,
}: {
  data: VideoCarouselDataType[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [bgVideoSrc, setBgVideoSrc] = useState('');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  useEffect(() => {
    const currentItem = data[activeIndex];
    if (currentItem?.videoSrc) {
      const video = document.createElement('video');
      video.src = currentItem.videoSrc;
      video.onloadeddata = () => {
        setBgVideoSrc(currentItem.videoSrc);
      };
    }
  }, [activeIndex, data]);

  const setVideoRef = useCallback((index: number) => {
    return (el: HTMLVideoElement | null) => {
      videoRefs.current[index] = el;
    };
  }, []);

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleSlideClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  const handleVideoEnded = () => {
    if (!swiperInstance) return;
    if (swiperInstance.isEnd) {
      swiperInstance.slideTo(0);
    } else {
      swiperInstance.slideNext();
    }
  };

  const handleMaximizeClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      router.push(`/reels/${id}`);
    },
    [router]
  );

  const handleToggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  }, []);

  return (
    <section className="w-full min-h-screen overflow-hidden relative pt-26">
      {bgVideoSrc && (
        <video
          ref={bgVideoRef}
          key={bgVideoSrc}
          src={bgVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="fixed w-screen h-screen object-cover top-0 left-0 -z-10 brightness-20 transition-opacity duration-500"
        />
      )}
      <Swiper
        slidesPerView={'auto'}
        centeredSlides
        spaceBetween={14}
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        className="flex items-center w-full relative"
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          bulletClass:
            'inline-block w-2 h-2 mx-1 rounded-full bg-white/50 transition-all duration-300',
          bulletActiveClass: 'bg-white w-4 rounded-2xl',
        }}
        modules={[Pagination]}
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={item.id}
            style={{ width: '250px', height: '400px' }}
            className={`rounded-2xl overflow-hidden transition-all duration-300 relative bg-black/30 backdrop-blur-sm cursor-pointer
              ${activeIndex === index ? 'scale-100 shadow-lg' : 'scale-90 opacity-50'}
            `}
            onClick={() => activeIndex !== index && handleSlideClick(index)}
          >
            {activeIndex === index ? (
              <>
                <video
                  ref={setVideoRef(index)}
                  src={item.videoSrc}
                  autoPlay
                  muted={isMuted}
                  playsInline
                  onEnded={handleVideoEnded}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-transparent text-white"
                    onClick={handleToggleMute}
                  >
                    {isMuted ? (
                      <VolumeX style={{ width: '30px', height: '30px' }} />
                    ) : (
                      <Volume2 style={{ width: '30px', height: '30px' }} />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-transparent text-white"
                    onClick={(e) => handleMaximizeClick(e, item.id)}
                  >
                    <Maximize style={{ width: '30px', height: '30px' }} />
                  </Button>
                </div>
              </>
            ) : (
              <Image
                src={item.thumbnailSrc}
                alt="썸네일"
                fill
                className="object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-4">
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
}
