import Image from 'next/image';
import { Button } from '@repo/ui/components/ui/button';
import { User } from '@repo/ui/components/icons';
import { cn } from '@repo/ui/lib/utils';
import { BuskerInfoReadResponseType } from '@/types/ResponseDataTypes';

export default function BuskerInfoBox({
  data,
  className,
}: {
  data: BuskerInfoReadResponseType;
  className?: string;
}) {
  return (
    <section
      className={cn('flex w-full items-center justify-between', className)}
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full relative border-2 border-purple-500">
          <Image
            src={data.profileImageUrl}
            alt="buskerProfileImage"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold">{data.nickname}</h1>
          <p className="text-sm text-gray-300">
            {data.followerCount} Followers
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button className="rounded-full bg-lime-400 hover:bg-lime-300 text-black px-5 py-2 text-sm font-semibold border-none">
          Follow
        </Button>
        <div className="flex items-center space-x-1 rounded-full bg-gray-400/60 px-4 py-2 text-sm">
          <User className="h-6 text-white" />
          <p>{data.subscribeCount}</p>
        </div>
      </div>
    </section>
  );
}
