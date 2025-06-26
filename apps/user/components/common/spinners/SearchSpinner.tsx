import { cn } from '@repo/ui/lib/utils';

export default function Spinner({
  size = 5,
  color = 'white',
  classname = '',
}: {
  size?: number;
  color?: string;
  classname?: string;
}) {
  return (
    <div className={cn(`flex items-center gap-8 ${classname}`)}>
      <div
        className={`w-${size} h-${size} border-4 border-${color} border-t-transparent rounded-full animate-spin`}
      />
      <p className="text-lg text-blue-400">검색 중...</p>
    </div>
  );
}
