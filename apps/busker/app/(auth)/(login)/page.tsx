import Banner from '@/components/login/Banner';
import LoginBox from '@/components/login/LoginBox';
import LoginOAuthBox from '@/components/login/LoginOAuthBox';

// 정적 생성 시 발생할 수 있는 문제 방지
export const dynamic = 'force-dynamic';

export default function page() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Banner />
      <section className="flex-3/4 text-start text-white px-10">
        <LoginBox />
        <LoginOAuthBox />
      </section>
    </main>
  );
}
