import Image from 'next/image';
import Link from 'next/link';

export default function UserCard({
  name,
  image,
  buskerId,
}: {
  name: string;
  image: string;
  buskerId: string;
}) {
  return (
    <Link href={`/chat/${buskerId}`} className="flex items-start space-x-2">
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
      <h3 className="ml-2 text-lg font-semibold">{name}</h3>
    </Link>
  );
}
