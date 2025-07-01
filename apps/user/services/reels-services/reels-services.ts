import { ReelsUrlDataType } from '@/types/ResponseDataTypes';

interface ReelsResponse {
  content: {
    id: string;
    writerUuid: string | null;
    content: string;
    thumbnailUrl: string;
    videoUrl: string;
    likeCount: number;
    commentCount: number;
    createdAt: string | null;
  }[];
  hasNext: boolean;
  nextCursor: string | null;
}

export async function getReelsVideos(size: number, lastId?: string, sortType: 'LATEST' | 'LIKES' | 'COMMENTS' = 'LATEST'): Promise<ReelsUrlDataType[]> {
  try {
    let url = `${process.env.BASE_API_URL}/feed-read-service/api/v1/read/feed/reels?sortType=${sortType}&size=${size}`;
    if (lastId) {
      url += `&lastId=${lastId}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const safeStatusText = (response.statusText || "").replace(/[\r\n]/g, "");
      console.error('Failed to fetch reels videos:', safeStatusText);
      return [];
    }

    const data = await response.json();
    const result = data.result as ReelsResponse;
    
    // Map the API response to the ReelsUrlDataType format
    return result.content.map(item => ({
      realsId: item.id,
      realsUrl: item.videoUrl,
      realsThumbnailUrl: item.thumbnailUrl,
      realsDescription: item.content,
      realsLikeCount: item.likeCount,
      realsCommentCount: item.commentCount,
      buskerId: item.writerUuid || '',
      buskerName: '', // Not provided in the API response
      buskerProfileImage: '' // Not provided in the API response
    }));
  } catch (error) {
    console.error('Error fetching reels videos:', error);
    return [];
  }
}
