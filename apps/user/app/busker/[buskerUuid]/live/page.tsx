import { UseChat } from '@/context/ChatContext';
import ChatBar from '@/components/common/form/ChatBar';
import BuskerInfoBox from '@/components/live/BuskerInfoBox';

import { BuskerLiveData } from '@/data/profileData';

export default function page() {
  const data = BuskerLiveData;
  return (
    <main className="h-screen text-white font-poppins px-4">
      <BuskerInfoBox data={data} className="pt-20" />
      <UseChat>
        <ChatBar />
      </UseChat>
    </main>
  );
}
