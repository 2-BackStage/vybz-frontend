import { LiveFreeViewType } from '@/types/ResponseDataTypes';

export function generateLiveCards(startIndex: number, count = 6): LiveFreeViewType[] {
  return Array.from({ length: count }).map((_, idx) => {
    const i = startIndex + idx + 1;
    return {
      id: `live-${i}`,
      buskerId: `busker-${i}`,
      liveName: `라이브 공연 ${i}`,
      buskerName: `버스커 ${i}`,
      buskerProfileImage: `/buskerUrl.jpg`,
      isMembership: i % 2 === 0,
    };
  });
}