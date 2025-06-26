import Banner from '@/components/login/Banner';
import LoginBox from '@/components/login/LoginBox';
import LoginOAuthBox from '@/components/login/LoginOAuthBox';

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
