import { Button } from '@repo/ui/components/ui/button';
import { ChevronLeft, Check } from '@repo/ui/components/icons';
import Link from 'next/link';

export default function FormHeader(data: { title: string; href: string }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 text-white bg-transparent">
      <Link href={data.href} className="flex-shrink-0">
        <ChevronLeft width={28} height={28} />
      </Link>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
        {data.title}
      </h1>

      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="[&_svg]:size-6 text-green-500"
      >
        <Check />
      </Button>
    </header>
  );
}
