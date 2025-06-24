import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from '@repo/ui/components/ui';
import { CrossedTools } from '@repo/ui/components/icons';
import AvatarUploader from '@/components/common/form/AvatarUplodader';
import SNSBox from '@/components/about/boxs/SNSBox';
import CategoryBox from '@/components/about/boxs/CategoryBox';
import NameBox from '@/components/about/boxs/NameBox';
import Description from '@/components/about/boxs/Description';
import { cn } from '@repo/ui/lib/utils';
import {
  BuskerSNSResponseType,
  BuskerCategoryResponseType,
} from '@/types/ResponseDataTypes';
import {
  updateProfile,
  updateSNS,
  updateCategories,
} from '@/services/info-services/BuskerInfoReadService';

export default function EditSection({
  className,
  SNSData,
  buskerUuid,
  buskerCategoryList,
}: {
  className?: string;
  SNSData: BuskerSNSResponseType[];
  buskerUuid: string;
  buskerCategoryList: BuskerCategoryResponseType[];
}) {
  return (
    <Card className={cn('bg-div-background border-div-background', className)}>
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-blue-400 text-xl flex items-center">
          <CrossedTools className="w-5 h-5 mr-2" />
          프로필 정보 수정
        </CardTitle>
      </CardHeader>

      <form
        id="profileForm"
        action={async (formData) => {
          'use server';
          await Promise.all([
            updateProfile(buskerUuid, formData),
            updateSNS(buskerUuid, formData),
            updateCategories(buskerUuid, formData),
          ]);
        }}
      >
        <CardContent className="space-y-6 pt-6">
          <AvatarUploader userUuid={buskerUuid} />
          <NameBox />
          <CategoryBox buskerCategoryList={buskerCategoryList} />
          <Description />
          <SNSBox SNSData={SNSData} />

          <div className="pt-4 border-t border-gray-700">
            <Button
              type="submit"
              className="w-full bg-blue-300 hover:bg-blue-400 text-gray-900 font-semibold h-12 text-lg"
            >
              프로필 업데이트
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
