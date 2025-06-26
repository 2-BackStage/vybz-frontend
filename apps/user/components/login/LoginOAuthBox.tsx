'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@repo/ui/components/ui/button';

export default function LoginOAuthBox() {
  const handleGoogleLogin = useCallback(() => {
    signIn('google', { callbackUrl: '/main' });
  }, []);

  const handleKakaoLogin = useCallback(() => {
    signIn('kakao', { callbackUrl: '/main' });
  }, []);

  return (
    <section className="w-full space-y-2 px-6">
      <Button
        variant="outline"
        className="w-full bg-gray-800 text-white border-none h-14 flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
      >
        <Image src="/logo/google.png" alt="Google" width={20} height={20} />
        <p className="text-lg font-semibold">Continue with Google</p>
      </Button>
      <Button
        variant="outline"
        className="w-full bg-[#FEE500] text-black border-none flex items-center h-14 justify-center gap-2"
        onClick={handleKakaoLogin}
      >
        <Image src="/logo/kakao.png" alt="Kakao" width={20} height={20} />
        <p className="text-lg font-semibold">Continue with Kakao</p>
      </Button>
    </section>
  );
}
