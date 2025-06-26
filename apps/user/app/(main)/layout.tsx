import MainFooter from '@/components/common/layouts/footer/MainFooter';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MainFooter />
    </>
  );
}
