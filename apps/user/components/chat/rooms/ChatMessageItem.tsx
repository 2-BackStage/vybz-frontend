'use client';

import Image from 'next/image';
import { ChatMessageType } from '@/types/ResponseDataTypes';

export default function ChatMessageItem({
  message,
  currentUserUuid,
}: {
  message: ChatMessageType;
  currentUserUuid: string;
}) {
  const isMyMessage = message.senderUuid === currentUserUuid;

  const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.paused) {
      video
        .play()
        .catch((error) => console.error('Error playing video:', error));
    } else {
      video.pause();
    }
  };

  const renderMessageContent = () => {
    switch (message.messageType) {
      case 'TEXT':
        return (
          <div
            className={`max-w-xs px-4 py-3 rounded-br-3xl rounded-bl-3xl ${
              isMyMessage
                ? 'bg-white text-gray-800 rounded-tl-3xl'
                : 'bg-indigo-800 text-white rounded-tr-3xl'
            }`}
          >
            <p className="text-sm font-medium whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
        );

      case 'IMAGE':
        return (
          <Image
            src={message.content}
            alt="Image"
            width={128}
            height={128}
            className="max-w-xs rounded-4xl"
          />
        );

      case 'VIDEO':
        return (
          <video
            src={message.content}
            className="max-w-xs rounded-4xl cursor-pointer"
            controls
            onClick={handleVideoClick}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`flex items-end gap-2 mb-3 font-poppins ${
        isMyMessage ? 'justify-end' : 'justify-start'
      }`}
    >
      {isMyMessage && !message.read && (
        <div className="text-xs text-red-500 font-semibold mb-1">1</div>
      )}
      {renderMessageContent()}
      {!isMyMessage && !message.read && (
        <div className="text-xs text-red-500 font-semibold mb-1">1</div>
      )}
    </div>
  );
}
