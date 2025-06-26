'use client';
import { Pause } from '@repo/ui/components/icons';
import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReelsBackgroundWrapper({
  videoUrl,
  isActive = true,
  children,
}: {
  videoUrl: string;
  isActive?: boolean;
  children?: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [videoUrl, isActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      if (isPlaying) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, [isPlaying, isActive]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        autoPlay
        loop
        playsInline
        onClick={handleVideoClick}
      />

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-white pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Pause width={100} height={100} />
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </div>
  );
}
