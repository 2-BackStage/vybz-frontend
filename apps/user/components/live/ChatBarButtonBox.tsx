import { Button } from '@repo/ui/components/ui/button';
import { SendHorizontal } from '@repo/ui/components/icons';
import LikeButton from '@/components/common/button/LikeButton';
import { memo } from 'react';

export default memo(function ChatBarButtonBox() {
  return (
    <div className="flex items-center space-x-2">
      <Button
        type="submit"
        size="icon"
        className="w-12 h-12 rounded-full border bg-gray-400/30 backdrop-blur-md text-white cursor-pointer [&_svg]:size-8"
      >
        <SendHorizontal />
      </Button>
      <LikeButton />
    </div>
  );
});
