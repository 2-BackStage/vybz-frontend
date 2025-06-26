'use client';

import { use } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import { Smile } from '@repo/ui/components/icons';
import { ChatContext } from '@/context/ChatContext';
import Emojibox from '@/components/common/EmojiBox';
import ChatBarButtonBox from '@/components/live/ChatBarButtonBox';
import { emojiData } from '@/data/EmojiData';

export default function ChatForm({ className }: { className?: string }) {
  const { showEmojibox, toggleShowEmojibox, comment, setComment } =
    use(ChatContext);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-gray-900/30 ${className}`}
    >
      <form className=" relative flex items-center justify-between  backdrop-blur-md px-4 py-2">
        <label className="relative w-full pr-4" id="comment">
          <Button
            type="button"
            onClick={toggleShowEmojibox}
            className="absolute top-1/2 -translate-y-1/2 text-white z-10 w-12 h-12 border-none bg-transparent hover:bg-transparent [&_svg]:size-6"
          >
            <Smile />
          </Button>
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Send your comment..."
            className="text-white border-none bg-gray-400/30 backdrop-blur-md h-12 py-0 !pl-12 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </label>
        <ChatBarButtonBox />
      </form>

      <div
        className={cn(
          'transition-all duration-300 ease-in-out bg-gray-900/30 w-full',
          showEmojibox
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        )}
      >
        <Emojibox emojiData={emojiData} />
      </div>
    </div>
  );
}
