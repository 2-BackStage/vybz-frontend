import BackHeader from '@/components/common/layouts/header/BackHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackHeader title="알림" className="!bg-background" showIcons={false} />
      {children}
    </>
  );
}
