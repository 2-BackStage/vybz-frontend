'use client';

import { NotificationDataType } from '@/types/ResponseDataTypes';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Trash } from '@repo/ui/components/icons';
import { Button } from '@repo/ui/components/ui/button';
import { useState } from 'react';

interface NotificationItemProps extends NotificationDataType {
  timeAgo: string;
  onDelete?: (id: string) => void;
  isOpen?: boolean;
  onSwipe?: (id: string | null) => void;
}

export default function NotificationItem({
  id,
  buskerName,
  buskerProfileImage,
  buskerUuid,
  feedId,
  message,
  timeAgo,
  onDelete,
  isOpen = false,
  onSwipe,
}: NotificationItemProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -60) onSwipe?.(id);
    else onSwipe?.(null);
  };

  const handleDelete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDelete?.(id);
    }, 200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="relative overflow-x-hidden"
          initial={{ opacity: 1, height: 'auto' }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex w-[calc(100%+64px)]"
            drag="x"
            dragConstraints={{ left: -64, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            animate={{ x: isOpen ? -64 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex-1 px-4 py-3 cursor-pointer bg-transparent">
              <div className="flex items-center">
                <Link href={`/busker/${buskerUuid}`}>
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 mr-3">
                    <Image
                      src={buskerProfileImage}
                      alt={buskerName}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>

                <Link href={`/feed/${feedId}`} className="flex-1 text-sm">
                  <p>
                    <span className="font-semibold">{buskerName}</span>
                    {message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
                </Link>
              </div>
            </div>

            <div className="w-16 flex-shrink-0 bg-red-600 flex items-center justify-center">
              <Button
                variant="ghost"
                className="text-white p-0 m-0 h-auto w-auto [&_svg]:size-6"
                onClick={handleDelete}
              >
                <Trash />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
