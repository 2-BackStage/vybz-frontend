'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/components/ui/button';

export default function SubscribeButton({ buskerUuid }: { buskerUuid: string }) {
  const router = useRouter();
  return (
    <Button
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full"
      onClick={() => router.push(`/busker/${buskerUuid}/subscribe`)}
    >
      구독하기
    </Button>
  );
} 