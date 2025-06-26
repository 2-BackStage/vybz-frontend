'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { FooterData } from '@/data/FooterData';

export default function MainFooter() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    const index = FooterData.findIndex(
      ({ path }) => pathname === path || pathname.startsWith(`${path}/`)
    );
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [pathname]);

  const handleTabChange = (path: string, index: number) => {
    if (index === activeIndex || isAnimating) return;

    setIsAnimating(true);
    setActiveIndex(index);

    setTimeout(() => {
      router.push(path);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 backdrop-brightness-85 text-white z-40 h-16">
      <div className="relative w-full h-full flex justify-around items-center">
        {activeIndex !== -1 && (
          <div
            className="absolute bottom-2 w-12 h-12 rounded-full bg-cyan-400 z-0 transition-all duration-400"
            style={{
              left: `calc((100% / ${FooterData.length}) * ${activeIndex} + (100% / ${FooterData.length} / 2) - 1.5rem)`,
            }}
          />
        )}

        <div className="flex justify-around items-center w-full z-10">
          {FooterData.map(({ id, icon: Icon, path }, index) => {
            const isActive = index === activeIndex;
            return (
              <Button
                key={id}
                onClick={() => handleTabChange(path, index)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative border-none bg-transparent [&_svg]:size-5
                  ${isActive ? 'scale-110 bg-transparent pointer-events-none hover:bg-transparent' : 'scale-100 hover:bg-white/20'} 
                `}
              >
                <Icon
                  className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70'}`}
                />
              </Button>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
