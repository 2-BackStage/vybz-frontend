import SwiperWrapper from '@/components/common/layouts/wrapper/SwiperWrapper';
import { reelsVideoData } from '@/data/swiperData';
import Link from 'next/link';
import { UseModal } from '@/context/ModalContext';
import { UseChat } from '@/context/ChatContext';
import CommentDrawer from '@/components/reels/Comment/CommentDrawer';
import { CommentsData } from '@/data/CommentData';

export default function page() {
  // const initialVideos = await getReelsVideos(1, 5);

  return (
    <UseModal>
      <UseChat>
        <SwiperWrapper initialItems={reelsVideoData}>
          <Link
            href="/reels"
            className="absolute top-5 left-5 z-10 text-4xl font-semibold tracking-tighter text-white font-poppins"
          >
            Reels
          </Link>
          <CommentDrawer commentData={CommentsData} />
        </SwiperWrapper>
      </UseChat>
    </UseModal>
  );
}
