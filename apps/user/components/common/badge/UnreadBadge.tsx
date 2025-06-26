import { shortUnreadCount } from '@/utils/format';

export default function UnreadBadge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <div className="bg-red-500 text-white rounded-full text-center py-1 px-2 w-fit ml-auto">
      <p className="leading-none">{shortUnreadCount(count)}</p>
    </div>
  );
}
