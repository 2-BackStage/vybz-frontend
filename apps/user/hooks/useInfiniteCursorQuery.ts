import { useInfiniteQuery } from '@tanstack/react-query';

export function useInfiniteCursorQuery<TPage, TItem>({
  queryKey,
  queryFn,
  getNextCursor,
  selectItems,
  initialData,
}: {
  queryKey: string;
  queryFn: (cursor: string | null) => Promise<TPage>;
  getNextCursor: (lastPage: TPage) => string | null;
  selectItems: (pages: TPage[]) => TItem[];
  initialData: TPage;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery<TPage>({
      queryKey: [queryKey],
      queryFn: ({ pageParam = null }) => queryFn(pageParam as string | null),
      initialPageParam: null,
      getNextPageParam: getNextCursor,
      initialData: {
        pages: [initialData],
        pageParams: [null],
      },
    });

  return {
    items: data ? selectItems(data.pages) : [],
    fetchMore: fetchNextPage,
    hasMore: hasNextPage,
    isLoading: isPending || isFetchingNextPage,
  };
}
