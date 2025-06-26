import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string,
      refreshToken: string,
      userUuid: string,
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
    userUuid?: string;
  }

  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    picture?: string;

    id?: number;
    kakao_account?: {
      email?: string;
      profile?: {
        nickname?: string;
        profile_image_url?: string;
      };
    };
  }

}
