import { Home, Search, Reels, User } from '@repo/ui/components/icons';
import { FooterItemType } from '@/types/CommonType';

export const FooterData: FooterItemType[] = [
  {
    id: 'home',
    icon: Home,
    path: '/main',
  },
  {
    id: 'search',
    icon: Search,
    path: '/search',
  },
  {
    id: 'reels',
    icon: Reels,
    path: '/reels',
  },
  {
    id: 'user',
    icon: User,
    path: '/mypage',
  },
];