import { useState, useCallback } from 'react';

export function useInfiniteScroll<T>({
  fetchFn,
  initialItems = [],
  initialPage = 1,
  pageSize = 5,
}: {
  fetchFn: (page: number, size: number) => Promise<T[]>;
  initialItems?: T[];
  initialPage?: number;
  pageSize?: number;
}) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [page, setPage] = useState(initialPage + 1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    fetchFn(page, pageSize)
      .then((newItems) => {
        setItems((prev) => [...prev, ...newItems]);
        setPage((p) => p + 1);
        if (newItems.length < pageSize) setHasMore(false);
      })
      .catch((err) => {
        console.error('fetch error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, hasMore, fetchFn, page, pageSize]);

  return { items, loading, hasMore, fetchMore };
}