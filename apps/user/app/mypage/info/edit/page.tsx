import AvatarUploader from '@/components/common/form/AvatarUploader';
import NicknameUploder from '@/components/common/form/NicknameUploder';
// import TextareaUploader from '@/components/common/form/TextareaUploader';
import { Button } from '@repo/ui/components/ui/button';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getUserInfo } from '@/services/user-services/user-info-read-services';

export default async function Page() {
  const session = await getServerSession(options);
  const userUuid = session?.user?.userUuid || '';
  const userInfo = await getUserInfo(userUuid);

  return (
    <main className="min-h-screen text-end px-7 pt-10 text-white font-poppins">
      <AvatarUploader src={userInfo.profileImageUrl} userUuid={userUuid} />
      <NicknameUploder
        defaultValue={userInfo.nickname || ''}
        className="mt-6"
      />
      {/* <TextareaUploader
        defaultValue={session?.user?.email || ''}
        className="mt-12"
      /> */}

      <Button className="mt-2 p-0 bg-transparent border-0">
        <u className="text-white/50">logout</u>
      </Button>

      <Button className="absolute bottom-0 left-1/2 -translate-x-1/2 p-0 bg-transparent border-0">
        <u className="text-white/50">delete account</u>
      </Button>
    </main>
  );
}
