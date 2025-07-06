import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { routes } from './config/routes';

const FALLBACK_URL = '/main';

const withAuth = async (req: NextRequest, token: boolean) => {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  if (!token) {
    url.pathname = routes.signIn;
    url.search = `callbackUrl=${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

const withOutAuth = async (
  req: NextRequest,
  token: boolean,
  to: string | null
) => {
  const url = req.nextUrl.clone();

  if (token) {
    url.pathname = to ?? FALLBACK_URL;
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

const PUBLIC_ROUTES = ['/', routes.signIn];

export default async function middleware(request: NextRequest) {
  // manifest.json은 무조건 통과
  if (request.nextUrl.pathname === '/manifest.json') {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const accessToken = token?.accessToken;
  const { pathname, searchParams } = request.nextUrl;
  const callbackUrl = searchParams.get('callbackUrl');

  const isPublic = PUBLIC_ROUTES.includes(pathname);

  // 아이콘 파일은 예외처리
  if (
    pathname.startsWith('/vybz_icon_192.png') ||
    pathname.startsWith('/vybz_icon_512.png') ||
    pathname.startsWith('/firebase-messaging-sw.js')
  ) {
    return NextResponse.next();
  }

  if (pathname === routes.signIn) {
    return withOutAuth(request, Boolean(accessToken), callbackUrl);
  }
  if (isPublic) {
    return NextResponse.next();
  }

  return withAuth(request, Boolean(accessToken));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|fonts|images|background|logo).*)',
  ],
};
