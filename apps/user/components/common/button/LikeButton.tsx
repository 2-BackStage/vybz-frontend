'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from '@repo/ui/components/icons';
import { Button } from '@repo/ui/components/ui/button';

type HeartInstance = {
  id: string;
  x: number;
  y: number;
  scale: number;
  rotate: number;
};

export default function LikeButton() {
  const [hearts, setHearts] = useState<HeartInstance[]>([]);

  const createHeartId = (): HeartInstance => ({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    x: (Math.random() - 0.5) * 30,
    y: -80 - Math.random() * 40,
    scale: 0.9 + Math.random() * 0.4,
    rotate: (Math.random() - 0.5) * 60,
  });

  const handleClick = () => {
    const newHeart = createHeartId();
    setHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);
  };

  return (
    <div className="relative w-12 h-12">
      <Button
        type="button"
        size="icon"
        onClick={handleClick}
        className="w-12 h-12 rounded-full border bg-gray-400/30 backdrop-blur-md cursor-pointer [&_svg]:size-6"
      >
        <Heart />
      </Button>

      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              opacity: 0,
              x: 0,
              y: 0,
              scale: 0.8,
              rotate: 0,
            }}
            animate={{
              opacity: 1,
              x: heart.x,
              y: heart.y,
              scale: heart.scale,
              rotate: heart.rotate,
            }}
            exit={{
              opacity: 0,
              y: heart.y - 20,
              scale: heart.scale + 0.2,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <Heart width={20} height={20} fill="#EF4444" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
