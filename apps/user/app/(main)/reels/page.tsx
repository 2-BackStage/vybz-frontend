import SwiperWrapper from '@/components/common/layouts/wrapper/SwiperWrapper';
import Link from 'next/link';
import { UseModal } from '@/context/ModalContext';
import { UseChat } from '@/context/ChatContext';
import CommentDrawer from '@/components/reels/Comment/CommentDrawer';
import { CommentsData } from '@/data/CommentData';
import { getReelsVideos } from '@/services/reels-services/reels-services';

export default async function page() {
  const initialVideos = await getReelsVideos(10);

  return (
    <UseModal>
      <UseChat>
        <SwiperWrapper initialItems={initialVideos}>
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
