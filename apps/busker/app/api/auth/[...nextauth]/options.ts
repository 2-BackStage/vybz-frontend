import { NextAuthOptions, User } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import { CommonResponseType, UserDataType } from '@/types/ResponseDataTypes';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        //console.log('credentials', credentials);
        try {
          const apiUrl = process.env.BASE_API_URL || 'http://localhost:8080';
          const response = await fetch(
            `${apiUrl}/busker-auth-service/api/v1/busker/sign-in`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const user = (await response.json()) as CommonResponseType<User>;
          console.log('user', user);
          return user.result;
        } catch (error) {
          console.error('error', error);
        }
        // 회원로그인 api 호출
        return null;
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || 'dummy-client-id',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || 'dummy-client-secret',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-client-secret',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!profile) {
        return true;
      }

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

        const apiUrl = process.env.BASE_API_URL || 'http://localhost:8080';
        const res = await fetch(
          `${apiUrl}/user-auth-service/api/v1/oauth/sign-in`,
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
          baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001';
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
        return `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/main`;
      }
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
};
