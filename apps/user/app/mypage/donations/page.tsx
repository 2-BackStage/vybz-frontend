import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import VticketInstructions from '@/components/donations/VticketInstructions';
import DonationsClient from './DonationsClient';

export default async function page() {
  const session = await getServerSession(options);
  const userUuid = session?.user?.userUuid || '';

  return (
    <main className="text-white mt-16 mx-6 space-y-4 mb-4">
      <VticketInstructions />
      <DonationsClient userUuid={userUuid} />
    </main>
  );
}