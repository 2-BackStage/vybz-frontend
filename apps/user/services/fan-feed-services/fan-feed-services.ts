import { FanFeedDataType } from '@/types/ResponseDataTypes';

export const fetchFanFeeds = async (
  page: number,
  pageSize: number
): Promise<FanFeedDataType[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Array.from({ length: pageSize }, (_, i) => ({
    id: String((page - 1) * pageSize + i + 2),
    buskerName: `버스커${(page - 1) * pageSize + i + 1}`,
    buskerProfileImage: '/buskerUrl.jpg',
    timeAgo: `${i + 1}시간 전`,
    content: `테스트 피드 내용 ${(page - 1) * pageSize + i + 1}`,
    imageSrcList:
      i % 3 === 0
        ? []
        : [
            '/buskerUrl.jpg',
            '/buskerUrl.jpg',
            '/buskerUrl.jpg',
          ].slice(0, (i % 3) + 1),
    likesCount: Math.floor(Math.random() * 100),
    commentsCount: Math.floor(Math.random() * 30),
  }));
};
