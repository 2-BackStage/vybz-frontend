import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Badge } from '@repo/ui/components/ui';
import Link from 'next/link';
import Image from 'next/image';

export default function MainHeader({ userUrl }: { userUrl: string }) {
  return (
    <header className="bg-div-background border-div-background px-6 py-4 flex items-center justify-between space-x-6 text-white font-poppins">
      <div className="flex items-center space-x-4 flex-1">
        <Link href="/main" className="flex items-center space-x-2">
          <Image src="/logo/logo.png" alt="vybzLogo" width={100} height={100} />
          <h1 className="font-monoton text-3xl">vybz</h1>
        </Link>
        <nav className="ml-16 space-x-8 text-gray-300 text-xl">
          <Link href="/about" className="hover:text-blue-300 transition-colors">
            About
          </Link>
          <Link
            href="/notice"
            className="hover:text-blue-300 transition-colors"
          >
            Notice/Schedule
          </Link>
          <Link href="/media" className="hover:text-blue-300 transition-colors">
            Media
          </Link>
          <Link
            href="/fanFeed"
            className="hover:text-blue-300 transition-colors"
          >
            Feed
          </Link>
          <Link href="/live" className="hover:text-blue-300 transition-colors">
            Live
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Badge className="bg-blue-300 text-gray-900 font-semibold px-4 py-2.5 rounded-full">
          BUSKER ADMIN
        </Badge>
        <Avatar className="size-10 ring-2 ring-blue-300">
          <AvatarImage src={userUrl} />
          <AvatarFallback className="bg-blue-300 text-gray-900 font-semibold">
            BuskerProfile
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
