import Image from 'next/image';
import Link from 'next/link';

interface FeedHeaderProps {
  profileImage: string;
  username: string;
  timeAgo: string;
}

export default function FeedHeader({
  profileImage,
  username,
  timeAgo,
}: FeedHeaderProps) {
  return (
    <div className="mx-4 pt-4 pb-2 mb-4 border-b-2 border-gray-700/50">
      <Link href={`/busker/${username}`} className="flex items-center ">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-blue-400/50">
          <Image
            src={profileImage}
            alt={username}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold">
            @{username}
            <span className="ml-2 text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded-full">
              버스커
            </span>
          </h3>
          <p className="text-sm text-gray-400">{timeAgo}</p>
        </div>
      </Link>
    </div>
  );
}
