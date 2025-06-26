import ChatHeader from '@/components/common/layouts/header/ChatHeader';
import DmBar from '@/components/common/form/DmBar';
import { UseChat } from '@/context/ChatContext';
import { UseModal } from '@/context/ModalContext';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ChatMessageList from '@/components/chat/rooms/ChatMessageList';
import { ChatMessageDataPage } from '@/data/chatData';
import { unstable_ViewTransition as ViewTransition } from 'react';

export default async function page() {
  const userUuid = (await getServerSession(options))?.user.userUuid || '';
  const ChatMessageData = await ChatMessageDataPage;
  return (
    <div className="relative min-w-80 h-screen text-white">
      <ChatHeader />
      <ViewTransition name="blue-label">
        <main className="absolute inset-x-0 bottom-0 top-29 flex px-4 bg-blue-400 rounded-tr-4xl border-t-2 border-indigo-900">
          <UseModal>
            <ChatMessageList
              chatListData={ChatMessageData}
              userUuid={userUuid}
            />
          </UseModal>
          <UseChat>
            <UseModal>
              <DmBar />
            </UseModal>
          </UseChat>
        </main>
      </ViewTransition>
    </div>
  );
}
