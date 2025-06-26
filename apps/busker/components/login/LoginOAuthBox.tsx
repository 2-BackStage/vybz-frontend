'use client';
import { Button } from '@repo/ui/components/ui/button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';

export default function LoginOAuthBox() {
  const handleGoogleLogin = useCallback(() => {
    signIn('google', { callbackUrl: '/main' });
  }, []);

  const handleKakaoLogin = useCallback(() => {
    signIn('kakao', { callbackUrl: '/main' });
  }, []);
  return (
    <div className="w-full space-y-2 flex space-x-4 min-w-xs max-w-md mx-auto">
      <Button
        variant="outline"
        className="w-full bg-gray-800 text-white border-none h-12 flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
      >
        <Image src="/logo/google.png" alt="Google" width={20} height={20} />
        <p className="font-semibold">Continue with Google</p>
      </Button>
      <Button
        variant="outline"
        className="w-full bg-[#FEE500] text-black border-none flex items-center h-12 justify-center gap-2"
        onClick={handleKakaoLogin}
      >
        <Image src="/logo/kakao.png" alt="Kakao" width={20} height={20} />
        <p className="font-semibold">Continue with Kakao</p>
      </Button>
    </div>
  );
}
