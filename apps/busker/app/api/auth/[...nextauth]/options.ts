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
          const response = await fetch(
            `${process.env.BASE_API_URL}/busker-auth-service/api/v1/busker/sign-in`,
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
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
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
        user.buskerUuid = data.result.userUuid;

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
        buskerUuid: token.buskerUuid as string,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      const isInternalUrl = url.startsWith(baseUrl);

      if (isInternalUrl && url !== baseUrl) {
        return url;
      }

      return `${baseUrl}/main`;
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
};
