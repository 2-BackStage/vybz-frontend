import Image from 'next/image';
import { OtherUserDataType } from '@/types/ResponseDataTypes';
import { getDaysFromToday } from '@/utils/format';

export default function UserProfile({ data }: { data: OtherUserDataType }) {
  return (
    <section className="flex items-start space-x-2 text-white font-poppins mt-20 ml-6">
      <div className="relative w-16 h-16 shrink-0">
        <Image
          src={data.profileImageUrl}
          alt="user avatar"
          fill
          sizes="80px"
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-semibold text-2xl ml-2">{data.nickname}</h3>
        <p className="ml-2 text-gray-400">
          {getDaysFromToday(data.createdAt)}일째 덕질 중
        </p>
      </div>
    </section>
  );
}
