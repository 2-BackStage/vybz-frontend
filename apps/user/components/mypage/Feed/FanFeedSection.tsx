'use client';

import { FanFeedDataType } from '@/types/ResponseDataTypes';
import FeedArticle from './FeedArticle';
import InfiniteScrollWrapper from '@/components/common/layouts/wrapper/InfiniteScrollWrapper';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { fetchFanFeeds } from '@/services/fan-feed-services/fan-feed-services';

export default function FanFeedSection({
  userName,
  initialFeeds,
}: {
  userName?: string;
  initialFeeds: FanFeedDataType[];
}) {
  const {
    items: feeds,
    loading: isLoading,
    hasMore: hasNextPage,
    fetchMore,
  } = useInfiniteScroll<FanFeedDataType>({
    fetchFn: fetchFanFeeds,
    initialItems: initialFeeds,
    initialPage: 1,
    pageSize: 5,
  });

  return (
    <section className="mx-auto px-4 py-6 mt-4">
      <h2 className="text-2xl font-bold text-white mb-1">
        {userName ? `${userName}'s` : 'My'} Feed
      </h2>
      <p className="text-gray-400">
        {userName ? '' : '내가'} 좋아하는 버스커와 추억을 공유해요
      </p>

      <InfiniteScrollWrapper
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        fetchMore={fetchMore}
      >
        <div className="mt-2 space-y-6 border-t border-gray-300 pt-6">
          {feeds.map((feed) => (
            <FeedArticle key={feed.id} feed={feed} />
          ))}
        </div>
      </InfiniteScrollWrapper>
    </section>
  );
}
