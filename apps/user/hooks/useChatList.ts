import { useState, useCallback } from 'react';
import { getChatList, ChatListResponse } from '../services/chat-services/chat-list-services';

export const useChatList = (initialPageSize = 10) => {
  const [data, setData] = useState<ChatListResponse['data']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getChatList(page, initialPageSize);
      
      setData(prevData => [...prevData, ...response.data]);
      setHasMore(response.hasNextPage);
      setPage(prevPage => response.nextPage || prevPage);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch chat list'));
    } finally {
      setIsLoading(false);
    }
  }, [page, initialPageSize, isLoading, hasMore]);

  const refresh = useCallback(async () => {
    setPage(1);
    setHasMore(true);
    setData([]);
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getChatList(1, initialPageSize);
      
      setData(response.data);
      setHasMore(response.hasNextPage);
      setPage(response.nextPage || 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to refresh chat list'));
    } finally {
      setIsLoading(false);
    }
  }, [initialPageSize]);

  return {
    data,
    isLoading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};
