import {
  ChatMessageListType,
  ChatMessageType,
} from '@/types/ResponseDataTypes';

function generateDummyMessages(
  startId: string,
  count: number
): ChatMessageType[] {
  const messages: ChatMessageType[] = [];
  for (let i = 0; i < count; i++) {
    const idNum = Number(startId) + i;
    messages.push({
      id: idNum.toString(),
      senderUuid: (idNum % 2 === 0 ? 'user-a-' : 'user-b-') + idNum,
      messageType: 'TEXT',
      content: `과거 메시지입니다 ${idNum}`,
      read: Math.random() < 0.5,
      sentAt: `2025-06-17 14:${50 - i}:00`,
    });
  }
  return messages;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getChatMessages(
  cursor: string | null
): Promise<{ data: ChatMessageListType }> {
  await delay(5000);

  const pageSize = 20;
  const allMessages = generateDummyMessages('11', 100);

  const startIndex = cursor
    ? allMessages.findIndex((msg) => msg.id === cursor) + 1
    : 0;

  const pagedMessages = allMessages.slice(startIndex, startIndex + pageSize);
  const nextCursor =
    startIndex + pageSize < allMessages.length
      ? (allMessages[startIndex + pageSize - 1]?.id ?? null)
      : null;

  return Promise.resolve({
    data: {
      content: pagedMessages,
      nextCursor,
      hasNext: nextCursor !== null,
      pageSize,
    },
  });
}
