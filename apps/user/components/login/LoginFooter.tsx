import Image from 'next/image';
import LoginOAuthBox from '@/components/login/LoginOAuthBox';

export default function LoginFooter() {
  return (
    <footer className="w-full fixed bottom-0 left-0">
      <section className="flex justify-center space-x-2 pb-6">
        <p>Are you a busker?</p>
        <p>
          <u>Busker login</u>
        </p>
      </section>
      <LoginOAuthBox />
      <Image
        src="/logo/logo.png"
        alt="Logo"
        width={272}
        height={153}
        priority
        className="py-7 px-24 mx-auto brightness-200"
      />
    </footer>
  );
}
