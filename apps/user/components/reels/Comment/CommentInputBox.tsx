'use client';

import { use } from 'react';
import Image from 'next/image';
import { Smile } from '@repo/ui/components/icons';
import { ChatContext } from '@/context/ChatContext';
import { Button } from '@repo/ui/components/ui/button';

export default function CommentInputBox({
  onSubmit,
}: {
  onSubmit: (text: string) => void;
}) {
  const { comment, setComment, showEmojibox, toggleShowEmojibox } =
    use(ChatContext);

  const handleSend = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <div className="border-t border-gray-200 px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 shrink-0">
          <Image
            src="/buskerUrl.jpg"
            alt="user avatar"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1 relative">
          <input
            className="w-full text-sm p-2 pr-10 bg-transparent outline-none"
            placeholder="댓글을 입력하세요..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            type="button"
            onClick={toggleShowEmojibox}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-transparent border-none transition-colors [&_svg]:size-6 text-gray-500"
          >
            <Smile
              className={
                showEmojibox ? 'text-black fill-gray-400 ' : 'text-gray-500'
              }
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
