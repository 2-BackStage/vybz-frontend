import { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import { CommonResponseType, UserDataType } from '@/types/ResponseDataTypes';

export const options: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  // Ensure NEXTAUTH_URL is set for build time
  ...(process.env.NEXTAUTH_URL && { url: process.env.NEXTAUTH_URL }),
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!profile || !account) {
        throw new Error('OAuthProfileMissing');
      }

      const getUserInfo = () => {
        const { provider } = account;
        console.log(provider);
        console.log(profile);
        const extractors = {
          kakao: () => ({
            providerId: String(profile.id),
            email: profile.kakao_account?.email ?? '',
            nickname: profile.kakao_account?.profile?.nickname ?? '',
            profileImageUrl:
              profile.kakao_account?.profile?.profile_image_url ?? '',
          }),
          google: () => ({
            providerId: profile.sub,
            email: profile.email ?? '',
            nickname: profile.name ?? '',
            profileImageUrl: profile.picture ?? '',
          }),
        };

        const extractor = extractors[provider as keyof typeof extractors];
        if (!extractor) throw new Error('UnsupportedOAuthProvider');

        return {
          provider,
          ...extractor(),
        };
      };

      try {
        const userInfo = getUserInfo();

        const res = await fetch(
          `${process.env.BASE_API_URL}/user-auth-service/api/v1/oauth/sign-in`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo),
            cache: 'no-cache',
          }
        );

        const data = (await res.json()) as CommonResponseType<UserDataType>;
        user.accessToken = data.result.accessToken;
        user.refreshToken = data.result.refreshToken;
        user.userUuid = data.result.userUuid;

        return true;
      } catch (error) {
        console.error('OAuth sign-in error:', error);
        throw new Error('OAuthTokenMissing');
      }
    },

    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        userUuid: token.userUuid as string,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      // URL 검증 및 안전한 리다이렉트 처리
      try {
        // baseUrl이 유효한지 확인
        if (!baseUrl || baseUrl === 'undefined' || baseUrl === 'null') {
          console.warn('Invalid baseUrl detected, using fallback');
          baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        }

        // URL이 유효한지 확인
        if (!url || url === 'undefined' || url === 'null') {
          console.warn('Invalid url detected, redirecting to main');
          return `${baseUrl}/main`;
        }

        const isInternalUrl = url.startsWith(baseUrl);

        if (isInternalUrl && url !== baseUrl) {
          return url;
        }

        return `${baseUrl}/main`;
      } catch (error) {
        console.error('Redirect error:', error);
        return `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/main`;
      }
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
};
