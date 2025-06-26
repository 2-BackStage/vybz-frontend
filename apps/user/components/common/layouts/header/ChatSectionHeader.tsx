import Link from 'next/link';
import { NotePencil } from '@repo/ui/components/icons';

export default function ChatSectionHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">메세지</h2>
      <Link href="/chat/create">
        <NotePencil width={32} height={32} />
      </Link>
    </div>
  );
}
