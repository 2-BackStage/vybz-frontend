import Image from 'next/image';
import Link from 'next/link';
import { LiveFreeViewType } from '@/types/ResponseDataTypes';
import MembershipBadge from '@/components/common/badge/MembershipBadge';
import LiveBadge from '@/components/common/badge/LiveBadge';
import { formatNumberToKm } from '@/utils/format';

export default function LiveCard({ item }: { item: LiveFreeViewType }) {
  return (
    <Link
      href={`/busker/${item.buskerId}/live`}
      className="overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity"
    >
      <div className="relative w-full h-36">
        <div className="absolute top-1 left-1 flex items-center space-x-1 z-10">
          <LiveBadge className="rounded" />
          <span className="text-xs px-1.5 py-0.5 rounded bg-black text-white font-semibold">
            {formatNumberToKm(item.viewerCount ?? 0)}명
          </span>
        </div>
        <Image
          src={item.buskerProfileImage}
          alt={item.liveName}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div className="p-2 text-white">
        <h3 className="text-sm font-medium truncate">{item.liveName}</h3>
        <p className="text-xs text-gray-300 truncate">{item.buskerName}</p>
        {item.isMembership && <MembershipBadge />}
      </div>
    </Link>
  );
}
