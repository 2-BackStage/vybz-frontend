import { HeartButton } from '@/components/common/button/HeartButton';
import { Button } from '@repo/ui/components/ui/button';
import { MessageCircle } from '@repo/ui/components/icons';
import { ModalContext } from '@/context/ModalContext';
import { use } from 'react';

export default function FeedButtonBox({
  likesCount,
  commentsCount,
  feedId,
}: {
  likesCount: number;
  commentsCount: number;
  feedId: string;
}) {
  const { open } = use(ModalContext);

  return (
    <div className="flex justify-end space-x-2 items-center text-white">
      <HeartButton className="-mr-2 [&_svg]:size-4" />
      <p>{likesCount}</p>
      <Button
        onClick={() => {
          open(feedId);
        }}
        className="border-none bg-transparent p-0 [&_svg]:size-6"
      >
        <MessageCircle className="fill-none stroke-white stroke-2 -mr-1" />
        <p>{commentsCount}</p>
      </Button>
    </div>
  );
}
