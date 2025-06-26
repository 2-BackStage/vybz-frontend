import ImageBackgroundWrapper from '@/components/common/layouts/wrapper/backgrounds/ImageBackgroundWrapper';
import FavoriteBuskerCard from '@/components/mypage/subscriptions/FavoriteBuskerCard';
import SubscriptionSection from '@/components/mypage/subscriptions/SubscriptionSection';
import ExpiredSubscriptionSection from '@/components/mypage/subscriptions/ExpiredSubscriptionSection';

import { ProfileData } from '@/data/profileData';
import { subscriptionData } from '@/data/MypageData';

export default function page() {
  return (
    <ImageBackgroundWrapper
      src={ProfileData.profileImage}
      className="text-white font-poppins"
    >
      <FavoriteBuskerCard
        name={ProfileData.nickname}
        months={6}
        registrationDate="2025-06-01"
      />
      <SubscriptionSection subscriptions={subscriptionData} />
      <ExpiredSubscriptionSection subscriptions={subscriptionData} />
    </ImageBackgroundWrapper>
  );
}
