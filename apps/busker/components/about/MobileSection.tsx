import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from '@repo/ui/components/ui';
import { Phone } from '@repo/ui/components/icons';
import { cn } from '@repo/ui/lib/utils';
import { BuskerProfileBox } from './boxs/BuskerProfileBox';
import { StateBox } from './boxs/StateBox';
import { BackgroundWrapper } from './boxs/BackgroundWrapper';
import { BuskerInfoSection } from './boxs/BuskerInfoSection';
import { SNSLinkBox } from './boxs/SNSLinkBox';
import { RecentBox } from './boxs/RecentBox';
import { BuskerInfoReadResponseType } from '@/types/ResponseDataTypes';
export default function MobileSection({
  className,
  initialData,
}: {
  className?: string;
  initialData: BuskerInfoReadResponseType;
}) {
  return (
    <Card className={cn('bg-div-background border-div-background', className)}>
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-blue-400 text-xl flex items-center">
          <Phone className="w-5 h-5 mr-2" />
          모바일 미리보기
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 flex justify-center">
        <div className="w-80 bg-gray-900 rounded-3xl p-4 shadow-2xl border-4 border-gray-600">
          <div className="bg-gray-800 rounded-2xl h-full overflow-hidden relative">
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-700">
              <BackgroundWrapper>
                <div className="absolute bottom-6 left-6 right-6">
                  <BuskerProfileBox />
                  <StateBox initialData={initialData} />
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full">
                    응원 메시지 보내기
                  </Button>
                </div>
              </BackgroundWrapper>

              {/* 검은 배경 섹션 */}
              <div className="bg-black p-6 space-y-6">
                <BuskerInfoSection />

                {/* SNS 링크 */}
                <SNSLinkBox />

                {/* 최근 활동 */}
                <RecentBox />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
