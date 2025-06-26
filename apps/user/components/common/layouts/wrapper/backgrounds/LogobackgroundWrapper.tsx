import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';

export default function LogobackgroundWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn(className)}>
      <div className="fixed inset-0">
        <Image
          src="/background/logopage2.jpg"
          alt="Background"
          fill
          className="h-full object-cover z-10 scale-y-[-1] object-[15%_center] opacity-75 mix-blend-screen brightness-30"
        />

        <Image
          src="/background/logopage1.jpg"
          alt="Background"
          fill
          className="h-full object-cover z-0 opacity-50 mix-blend-lighten brightness-80"
        />
      </div>
      <div className="relative z-20">{children}</div>
    </main>
  );
}
