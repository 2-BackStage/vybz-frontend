import EditSection from '@/components/about/EditSection';
import MobileSection from '@/components/about/MobileSection';
import { UseForm } from '@/context/FormContext';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import {
  BuskerInfoReadService,
  BuskerCategoryReadService,
  BuskerSNSService,
} from '@/services/info-services/BuskerInfoReadService';

export default async function page() {
  const session = await getServerSession(options);
  const buskerInfoReadService = await BuskerInfoReadService(
    session?.user.buskerUuid || ''
  );
  const buskerCategoryService = await BuskerCategoryReadService(
    session?.user.buskerUuid || ''
  );
  const buskerSNSService = await BuskerSNSService(
    session?.user.buskerUuid || ''
  );
  return (
    <main className="flex space-x-8 justify-between items-start px-20 py-14">
      <UseForm
        initialData={{
          name: buskerInfoReadService.nickname,
          genre: buskerCategoryService.map((item) => item.categoryId),
          description: buskerInfoReadService.introduction,
          profileImage: buskerInfoReadService.profileImageUrl,
        }}
      >
        <MobileSection className="flex-1" initialData={buskerInfoReadService} />
        <EditSection
          className="flex-1"
          SNSData={buskerSNSService}
          buskerUuid={session?.user.buskerUuid || ''}
          buskerCategoryList={buskerCategoryService}
        />
      </UseForm>
    </main>
  );
}
