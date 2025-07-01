import { BackgroundWrapper } from '@/components/busker/about/BackgroundWrapper';
import { BuskerProfileBox } from '@/components/busker/about/BuskerProfileBox';
import { StateBox } from '@/components/busker/about/StateBox';
import { Button } from '@repo/ui/components/ui/button';
import { BuskerInfoSection } from '@/components/busker/about/BuskerInfoSection';
import { SNSLinkBox } from '@/components/busker/about/SNSLinkBox';
import { RecentBox } from '@/components/busker/about/RecentBox';
import {
  getBuskerInfo,
  getBuskerSNSList,
  checkFollowStatus,
} from '@/services/user-services/UserInfoServices';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import SubscribeButton from './subscribe/SubscribeButton';

export default async function Page({
  params,
}: {
  params: { buskerUuid: string };
}) {
  const { buskerUuid } = params;
  const session = await getServerSession(options);
  const [initialData, snsLinks, isFollowing] = await Promise.all([
    getBuskerInfo(buskerUuid),
    getBuskerSNSList(buskerUuid),
    checkFollowStatus(session?.user?.userUuid || '', buskerUuid), // Replace 'current-user-uuid' with actual user UUID
  ]);
  return (
    <div className="bg-gray-800 rounded-2xl h-full overflow-hidden relative pt-16">
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-700">
        <BackgroundWrapper
          buskerProfileUrl={
            initialData.profileImageUrl || '/defaultProfile.png'
          }
        >
          <div className="absolute bottom-6 left-6 right-6">
            <BuskerProfileBox
              artistName={initialData.nickname}
              buskerProfileUrl={initialData.profileImageUrl}
              isFollowing={isFollowing}
              buskerUuid={buskerUuid}
              user={
                session?.user
                  ? {
                      userUuid: session.user.userUuid,
                      name: session.user.name || '',
                      image: session.user.image || '',
                    }
                  : undefined
              }
            />
            <StateBox initialData={initialData} />
            <div className="flex gap-2">
              <SubscribeButton buskerUuid={buskerUuid} />
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full">
                응원 메시지 보내기
              </Button>
            </div>
          </div>
        </BackgroundWrapper>

        {/* 검은 배경 섹션 */}
        <div className="bg-black p-6 space-y-6">
          <BuskerInfoSection artistDescription="" artistGenre={[]} />

          {/* SNS 링크 */}
          <SNSLinkBox links={snsLinks} />

          {/* 최근 활동 */}
          <RecentBox />
        </div>
      </div>
    </div>
  );
}
