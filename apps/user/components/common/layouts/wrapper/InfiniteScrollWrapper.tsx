'use client';

import React, { useEffect, useRef } from 'react';
import { InfiniteScrollProps } from '@/types/InfiniteScrollTypes';
import Spinner from '@/components/common/spinners/Spinner';

export default function InfiniteScrollWrapper(props: InfiniteScrollProps) {
  const { children, hasNextPage, isLoading, fetchMore } = props;
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) fetchMore();
      },
      { threshold: 1.0 }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasNextPage, isLoading, fetchMore]);

  return (
    <>
      {children}
      {hasNextPage && (
        <div
          ref={sentinelRef}
          className="h-12 flex items-center justify-center"
        >
          {isLoading && <Spinner />}
        </div>
      )}
    </>
  );
}
