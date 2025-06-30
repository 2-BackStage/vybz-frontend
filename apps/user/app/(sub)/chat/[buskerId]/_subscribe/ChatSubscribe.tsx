'use client';

import { use, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { ChatMessageType } from '@/types/ResponseDataTypes';
import { ChatRoomContext } from '@/context/ChatRoomContext';

export default function ChatSubscribe({ userUuid }: { userUuid: string }) {
  const { addMessage } = use(ChatRoomContext);
  const params = useParams();
  const searchParams = useSearchParams();

  const buskerId = params.buskerId as string;
  const chatRoomId = searchParams.get('chatId');

  useEffect(() => {
    if (!chatRoomId || !userUuid) {
      console.warn('chatRoomId 또는 userUuid가 존재하지 않습니다.');
      console.log('chatRoomId가', chatRoomId);
      console.log('userUuid가', userUuid);
      console.log('buskerId가', buskerId);
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/chat-service/api/v1/chat-message/subscribe?chatRoomId=${chatRoomId}&participantUuid=${userUuid}`;
    const eventSource = new EventSource(url);

    console.log(
      `🔌 SSE 연결 시도중... [chatRoomId: ${chatRoomId}, userUuid: ${userUuid}]`
    );

    eventSource.onopen = () => {
      console.log(
        `✅ SSE 연결됨 [chatRoomId: ${chatRoomId}, userUuid: ${userUuid}]`
      );
    };

    eventSource.onmessage = (event) => {
      try {
        const data: ChatMessageType = JSON.parse(event.data);
        console.log('📩 새 메시지 수신:', data);

        // 수신된 메시지를 로컬 상태에 추가
        addMessage(data);
      } catch (err) {
        console.error('❌ 메시지 파싱 오류:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error(
        `❌ SSE 연결 오류 [chatRoomId: ${chatRoomId}, userUuid: ${userUuid}]`,
        err
      );
      eventSource.close();
    };

    return () => {
      console.log(
        `🔌 SSE 연결 종료 [chatRoomId: ${chatRoomId}, userUuid: ${userUuid}]`
      );
      eventSource.close();
    };
  }, [chatRoomId, userUuid, buskerId, addMessage]);

  return null;
}
