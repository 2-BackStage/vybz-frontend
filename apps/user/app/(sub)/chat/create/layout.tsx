import CommonHeader from '@/components/common/layouts/header/CommonHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CommonHeader
        title="새 메세지"
        href="/chat/list"
        className="!bg-background"
      />
      {children}
    </>
  );
}
