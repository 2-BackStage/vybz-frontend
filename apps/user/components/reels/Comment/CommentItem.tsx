import { CommentDataType } from '@/types/ResponseDataTypes';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeartButton } from '@/components/common/button/HeartButton';
import { formatNumberToK } from '@/utils/format';

export default function CommentItem({
  username,
  avatarUrl,
  text,
  timeAgo,
  likes,
}: CommentDataType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 py-3 border-b border-gray-200"
    >
      <div className="relative w-8 h-8 shrink-0">
        <Link href={`/busker/${username}`} onClick={(e) => e.stopPropagation()}>
          <Image
            src={avatarUrl}
            alt={username}
            fill
            className="rounded-full object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-1 text-sm justify-between">
        <div>
          <div className="flex items-center gap-1">
            <p className="font-semibold mr-1">{username}</p>
            <p>{timeAgo}</p>
          </div>
          <p>{text}</p>
        </div>
        <div className="text-center ml-1 my-auto">
          <HeartButton className="w-4 h-4 stroke-black fill-none [&_svg]:size-4" />
          <p>{formatNumberToK(likes)}</p>
        </div>
      </div>
    </motion.div>
  );
}
