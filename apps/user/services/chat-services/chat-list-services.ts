import { ChatListType } from '@/types/ResponseDataTypes';

const generateDummyChats = (count: number, page: number, pageSize: number): ChatListType[] => {
  const chats: ChatListType[] = [];
  const startIndex = (page - 1) * pageSize;
  
  for (let i = 0; i < count; i++) {
    const index = startIndex + i;
    const unreadCount = Math.floor(Math.random() * 10);
    const hoursAgo = Math.floor(Math.random() * 24 * 7);
    const lastMessageTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();
    
    chats.push({
      chatId: `chat_${index}`,
      buskerName: `버스커${index + 1}`, 
      buskerProfileImage: '/buskerUrl.jpg',
      lastMessage: `마지막 메시지 내용입니다. 이 채팅방의 ${index + 1}번째 메시지입니다.`,
      lastMessageTime,
      unreadCount,
    });
  }
  
  return chats;
};

export interface ChatListResponse {
  data: ChatListType[];
  hasNextPage: boolean;
  nextPage: number | null;
}

export const getChatList = async (page: number, pageSize: number = 10): Promise<ChatListResponse> => {
  // 5초 대기
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const data = generateDummyChats(pageSize, page, pageSize);
  const isLastPage = page >= 5;
  
  return {
    data,
    hasNextPage: !isLastPage,
    nextPage: isLastPage ? null : page + 1,
  };
};