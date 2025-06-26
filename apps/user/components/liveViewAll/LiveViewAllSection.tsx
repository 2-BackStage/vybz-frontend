'use client';

import InfiniteScrollWrapper from '@/components/common/layouts/wrapper/InfiniteScrollWrapper';
import LiveCard from '@/components/common/card/LiveCard';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { LiveFreeViewType } from '@/types/ResponseDataTypes';

import { generateLiveCards } from '@/utils/generateLiveCards';

export default function LiveViewAllSection({
  lives: initialLives,
}: {
  lives: LiveFreeViewType[];
}) {
  const fetchFn = async (
    page: number,
    size: number
  ): Promise<LiveFreeViewType[]> => {
    await new Promise((res) => setTimeout(res, 1000));
    return generateLiveCards((page - 1) * size, size);
  };

  const {
    items: lives,
    loading: isLoading,
    hasMore: hasNextPage,
    fetchMore,
  } = useInfiniteScroll<LiveFreeViewType>({
    fetchFn,
    initialItems: initialLives,
    initialPage: 1,
    pageSize: 6,
  });

  return (
    <InfiniteScrollWrapper
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      fetchMore={fetchMore}
    >
      <section aria-label="Live busker list" className="pt-10">
        <ul className="grid grid-cols-3 gap-3">
          {lives.map((live) => (
            <li key={live.id}>
              <LiveCard item={live} />
            </li>
          ))}
        </ul>
      </section>
    </InfiniteScrollWrapper>
  );
}
