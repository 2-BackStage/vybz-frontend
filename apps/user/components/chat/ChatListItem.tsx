'use client';

import { ChatListType } from '@/types/ResponseDataTypes';
import UnreadBadge from '@/components/common/badge/UnreadBadge';
import Image from 'next/image';
import Link from 'next/link';
import { formatTimeAgo } from '@/utils/format';
import { shortString } from '@/utils/format';

export default function ChatListItem({
  chatListItem,
}: {
  chatListItem: ChatListType;
}) {
  return (
    <Link
      href={`/chat/${chatListItem.chatId}`}
      className="flex items-center justify-between py-4"
    >
      <div className="flex items-center space-x-4">
        <div className="relative w-13 h-13 shrink-0 rounded-full overflow-hidden">
          <Image
            src={chatListItem.buskerProfileImage}
            alt={chatListItem.buskerName}
            fill
            className="object-cover"
            sizes="52px"
          />
        </div>
        <div className="ml-3">
          <p
            className={`${chatListItem.unreadCount > 0 ? 'font-semibold' : 'text-base'}`}
          >
            {chatListItem.buskerName}
          </p>
          <p
            className={`${chatListItem.unreadCount > 0 ? 'font-semibold' : 'text-base text-gray-400'}`}
          >
            {shortString(chatListItem.lastMessage)}
          </p>
        </div>
      </div>
      <div className="space-y-2 text-xs self-start">
        <p className="text-gray-400">
          {formatTimeAgo(chatListItem.lastMessageTime)}
        </p>
        <UnreadBadge count={chatListItem.unreadCount} />
      </div>
    </Link>
  );
}
