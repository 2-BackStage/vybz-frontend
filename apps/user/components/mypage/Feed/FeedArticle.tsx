import { FanFeedDataType } from '@/types/ResponseDataTypes';
import FeedHeader from '@/components/mypage/Feed/FeedHeader';
import FeedImageBox from '@/components/mypage/Feed/FeedImageBox';
import FeedButtonBox from '@/components/mypage/Feed/FeedButtonBox';

export default function FeedArticle({ feed }: { feed: FanFeedDataType }) {
  return (
    <article className="bg-div-background rounded-xl overflow-hidden border-div-background text-white">
      <FeedHeader
        profileImage={feed.buskerProfileImage}
        username={feed.buskerName}
        timeAgo={feed.timeAgo}
      />

      <div className="px-4 py-1">
        {feed.content && <p className="mb-4">{feed.content}</p>}
        {feed.imageSrcList && <FeedImageBox images={feed.imageSrcList} />}

        <FeedButtonBox
          likesCount={feed.likesCount}
          commentsCount={feed.commentsCount}
          feedId={feed.id}
        />
      </div>
    </article>
  );
}
