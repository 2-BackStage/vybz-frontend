'use client';

import React, { useEffect, useRef } from 'react';
import { InfiniteScrollProps } from '@/types/InfiniteScrollTypes';
import Spinner from '@/components/common/spinners/Spinner';

export default function ReverseInfiniteScrollWrapper({
  children,
  hasNextPage,
  isLoading,
  fetchMore,
}: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const prevScrollHeightRef = useRef<number>(0);

  useEffect(() => {
    if (!hasNextPage || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          prevScrollHeightRef.current =
            scrollContainerRef.current?.scrollHeight ?? 0;
          fetchMore();
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.1,
      }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasNextPage, isLoading, fetchMore]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const newHeight = container.scrollHeight;
    const oldHeight = prevScrollHeightRef.current;

    if (newHeight > oldHeight) {
      container.scrollTop += newHeight - oldHeight;
    }
  }, [children]);

  return (
    <div ref={scrollContainerRef} className="grow overflow-y-auto">
      <div ref={sentinelRef} className="h-1" />
      <div className="h-16 flex items-center justify-center">
        {isLoading && <Spinner className="block" />}
      </div>
      {children}
    </div>
  );
}
