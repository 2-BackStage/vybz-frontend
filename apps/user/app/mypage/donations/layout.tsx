import CommonHeader from '@/components/common/layouts/header/CommonHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CommonHeader
        title="V티켓 내역"
        href="/mypage"
        className="!bg-background"
      />
      {children}
    </>
  );
}
