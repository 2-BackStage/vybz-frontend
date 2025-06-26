'use client';

import { ChatListType } from '@/types/ResponseDataTypes';
import { useInfiniteScrollQuery } from '@/hooks/useInfiniteFetchQuery';
import InfiniteScrollWrapper from '@/components/common/layouts/wrapper/InfiniteScrollWrapper';
import ChatListItem from '@/components/chat/ChatListItem';
import { getChatList } from '@/services/chat-services/chat-list-services';
export default function InfiniteChatList({
  chatList,
  page,
}: {
  chatList?: ChatListType[];
  page: number;
}) {
  const {
    items: AllChatList,
    isLoading,
    hasMore: hasNextPage,
    fetchMore,
  } = useInfiniteScrollQuery<ChatListType>({
    queryKey: 'chatList',
    queryFn: async (page, pageSize) => {
      const response = await getChatList(page, pageSize);
      return { content: response.data };
    },
    initialData: chatList,
    pageSize: page || 10,
  });

  return (
    <InfiniteScrollWrapper
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      fetchMore={fetchMore}
    >
      {AllChatList.map((item, index) => (
        <ChatListItem key={`${item.chatId}-${index}`} chatListItem={item} />
      ))}
    </InfiniteScrollWrapper>
  );
}
