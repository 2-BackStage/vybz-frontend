import { unstable_ViewTransition as ViewTransition } from 'react';
import SearchBar from '@/components/common/form/SearchBar';
import { ChatListData } from '@/data/chatData';
import ChatSectionHeader from '@/components/common/layouts/header/ChatSectionHeader';
import InfiniteChatList from '@/components/chat/InfiniteChatList';

export default function page() {
  return (
    <main className="font-poppins space-y-10">
      <ViewTransition name="blue-label">
        <div className="pt-20 bg-blue-400 pb-4 rounded-b-4xl px-4">
          <SearchBar placeholder="검색어를 입력해주세요" />
        </div>
      </ViewTransition>
      <section className="px-8 text-white">
        <ChatSectionHeader />
        <InfiniteChatList
          chatList={ChatListData.data}
          page={ChatListData.page}
        />
      </section>
    </main>
  );
}
