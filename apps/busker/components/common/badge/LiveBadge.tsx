export default function LiveBadge({ className }: { className?: string }) {
  return (
    <span
      className={`px-2 py-0.5 text-xs font-bold text-white bg-red-600 rounded ${className}`}
    >
      LIVE
    </span>
  );
}
