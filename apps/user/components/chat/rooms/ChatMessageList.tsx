'use client';

import ChatMessageItem from '@/components/chat/rooms/ChatMessageItem';
import {
  ChatMessageListType,
  ChatMessageType,
} from '@/types/ResponseDataTypes';
import ReverseInfiniteScrollWrapper from '@/components/common/layouts/wrapper/ReverseInfiniteScrollWrapper';
import { useInfiniteCursorQuery } from '@/hooks/useInfiniteCursorQuery';
import { getChatMessages } from '@/services/chat-services';

export default function ChatMessageList({
  chatListData,
  userUuid,
}: {
  chatListData: ChatMessageListType;
  userUuid: string;
}) {
  const {
    items: messages,
    fetchMore,
    hasMore,
    isLoading,
  } = useInfiniteCursorQuery<ChatMessageListType, ChatMessageType>({
    queryKey: 'chatMessageList',
    queryFn: async (cursor: string | null) => {
      const response = await getChatMessages(cursor);
      return response.data;
    },
    getNextCursor: (lastPage) => lastPage.nextCursor,
    selectItems: (pages) => pages.flatMap((page) => page.content),
    initialData: chatListData,
  });

  return (
    <ReverseInfiniteScrollWrapper
      hasNextPage={hasMore}
      isLoading={isLoading}
      fetchMore={fetchMore}
    >
      <section className="w-full px-2 pb-20 flex flex-col-reverse">
        {messages.map((msg) => (
          <ChatMessageItem
            key={msg.id}
            message={msg}
            currentUserUuid={userUuid}
          />
        ))}
      </section>
    </ReverseInfiniteScrollWrapper>
  );
}
