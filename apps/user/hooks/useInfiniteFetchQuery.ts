import { useInfiniteQuery } from '@tanstack/react-query';

export function useInfiniteScrollQuery<T>({
  queryKey,
  queryFn,
  initialData,
  pageSize = 20,
  refetchOnWindowFocus = false,
}: {
  queryKey: string;
  queryFn: (page: number, pageSize: number) => Promise<{ content: T[] }>;
  initialData?: T[];
  pageSize?: number;
  refetchOnWindowFocus?: boolean;
}) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({ pageParam = 1 }) => {
        const res = await queryFn(pageParam, pageSize);
        return res.content;
      },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < pageSize ? undefined : allPages.length + 1,
    initialData: {
      pages: [initialData ?? []],
      pageParams: [1],
    },
    refetchOnWindowFocus,
  });

  const isLoading = isPending || isFetchingNextPage;

  return {
    items: data?.pages.flat() ?? [],
    fetchMore: fetchNextPage,
    hasMore: hasNextPage,
    isLoading,
  };
}
