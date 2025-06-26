'use server';

import { getServerSession } from 'next-auth';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { instance } from '@/utils/requestHandler';
import { cookies } from 'next/headers';

export async function auth() {
  return await getServerSession(options);
}

export async function isUserLoggedIn(): Promise<boolean> {
  try {
    const session = await getServerSession(options);
    return Boolean(session);
  } catch (error) {
    console.error('세션 확인 중 오류 발생:', error);
    return false;
  }
}

export async function signOut() {
  try {
    const session = await getServerSession(options);
    const refreshToken = session?.user?.refreshToken;

    if (!refreshToken) {
      throw new Error('리프레시 토큰을 찾을 수 없습니다.');
    }

    const response = await instance.delete('/auth/sign-out', {
      body: JSON.stringify({
        refreshToken,
      }),
      requireAuth: true,
    });

    const cookieStore = await cookies();
    cookieStore.delete('next-auth.session-token');
    cookieStore.delete('next-auth.csrf-token');
    cookieStore.delete('next-auth.callback-url');

    cookieStore.delete('refresh-token');

    return response.result;
  } catch (error) {
    console.error('로그아웃 오류:', error);
    throw error;
  }
}