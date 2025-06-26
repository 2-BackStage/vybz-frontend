import Image from 'next/image';
import Link from 'next/link';
import LogobackgroundWrapper from '@/components/common/layouts/wrapper/backgrounds/LogobackgroundWrapper';

export default function page() {
  return (
    <Link href="/login">
      <LogobackgroundWrapper className="h-full text-center text-xl text-white bg-black">
        <section>
          <Image
            src="/logo/logo.png"
            alt="Logo"
            width={272}
            height={153}
            priority
            className="pt-40 mx-auto brightness-200"
          />
          <p className="font-roboto pt-8 opacity-75">Feel the VYBZ.</p>
          <p className="font-roboto opacity-75">Share your moment.</p>
          <p className="font-monoton pt-72 text-4xl">VYBZ</p>
        </section>
        <footer>
          <p className="pt-14 text-xs opacity-55">
            © 2025 VYBZ. All Rights RESERVED.
          </p>
        </footer>
      </LogobackgroundWrapper>
    </Link>
  );
}
