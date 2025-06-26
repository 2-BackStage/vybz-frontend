import { ChevronLeft } from '@repo/ui/components/icons';
import Link from 'next/link';

export default function CommonHeader(data: {
  title: string;
  href: string;
  className?: string;
}) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3.5 text-white bg-transparent flex items-center ${data.className}`}
    >
      <Link href={data.href} className="flex-shrink-0 py-1">
        <ChevronLeft width={28} height={28} />
      </Link>

      <h1 className="text-lg font-semibold ml-4">{data.title}</h1>
    </header>
  );
}
