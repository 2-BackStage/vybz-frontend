import { unstable_ViewTransition as ViewTransition } from 'react';
import SearchBar from '@/components/common/form/SearchBar';
import ChatSectionHeader from '@/components/common/layouts/header/ChatSectionHeader';
import InfiniteChatList from '@/components/chat/InfiniteChatList';
import { getChatList } from '@/services/chat-services/chat-list-services';

export default async function page() {
  const ChatListData = await getChatList();
  return (
    <main className="font-poppins space-y-10">
      <ViewTransition name="blue-label">
        <div className="pt-20 bg-blue-400 pb-4 rounded-b-4xl px-4">
          <SearchBar placeholder="검색어를 입력해주세요" />
        </div>
      </ViewTransition>
      <section className="text-white">
        <ChatSectionHeader />
        <InfiniteChatList
          chatList={ChatListData.content}
          nextCursor={ChatListData.nextCursor}
          hasNext={ChatListData.hasNext}
        />
      </section>
    </main>
  );
}
