import BackHeader from '@/components/common/layouts/header/BackHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackHeader title="" className="!bg-background" />
      {children}
    </>
  );
}
