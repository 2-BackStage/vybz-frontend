import FormHeader from '@/components/common/layouts/header/FormHeader';
import { updateProfile } from '@/actions';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <form action={updateProfile}>
      <FormHeader title="프로필 편집" href="/mypage" />
      {children}
    </form>
  );
}
