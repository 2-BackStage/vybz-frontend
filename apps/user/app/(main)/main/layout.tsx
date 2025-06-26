import MainHeader from '@/components/common/layouts/header/MainHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
