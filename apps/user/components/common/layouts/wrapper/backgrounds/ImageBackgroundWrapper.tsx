import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';

export default function ImageBackgroundWrapper({
  src,
  alt = 'Background',
  children,
  className,
}: {
  src: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn(className)}>
      <div className="fixed inset-0 -z-10">
        <Image
          src={src}
          alt={alt}
          fill
          className="h-full object-cover brightness-100"
          priority
        />
        <div className="absolute top-0 left-0 right-0 h-26 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />
      </div>
      <div className="relative z-10">{children}</div>
    </main>
  );
}
