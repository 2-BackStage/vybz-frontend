import LoginArticle from '@/components/login/LoginArticle';
import VideoBackgroundWrapper from '@/components/common/layouts/wrapper/backgrounds/VideoBackgroundWrapper';
import LoginFooter from '@/components/login/LoginFooter';
import { loginArticleData } from '@/data/loginData';
import LiveBadge from '@/components/common/badge/LiveBadge';

export default function page() {
  return (
    <VideoBackgroundWrapper className="text-white font-poppins">
      <LoginArticle data={loginArticleData} />
      <LiveBadge className="ml-6 rounded-none" />
      <LoginFooter />
    </VideoBackgroundWrapper>
  );
}
