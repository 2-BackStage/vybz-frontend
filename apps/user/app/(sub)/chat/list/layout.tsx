import ProfileHeader from '@/components/common/layouts/header/ProfileHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProfileHeader />
      {children}
    </>
  );
}
