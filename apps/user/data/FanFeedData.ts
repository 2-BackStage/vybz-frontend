import { FanFeedDataType } from '@/types/ResponseDataTypes';

export const FanFeedData: FanFeedDataType[] = [
  {
    id: '1',
    buskerName: '방송국스타',
    buskerProfileImage: '/BuskerUrl.jpg',
    timeAgo: '2시간 전',
    content: '오늘도 즐거운 공연이었어요! 다음 주에도 만나요~ 🎤✨ #공연 #즐거움',
    likesCount: 45,
    commentsCount: 12,
    
  },
  {
    id: '2',
    buskerName: '거리예술가들',
    buskerProfileImage: '/BuskerUrl.jpg',
    timeAgo: '1일 전',
    content: '비 오는 날에도 저희를 보러와주신 모든 분들께 감사드립니다. 다음 공연은 더 특별한 무대로 찾아뵐게요!',
    likesCount: 128,
    commentsCount: 34
  },
  {
    id: '3',
    buskerName: '포토그래퍼K',
    buskerProfileImage: '/BuskerUrl.jpg',
    timeAgo: '5시간 전',
    content: '어제 공연 현장 스케치입니다!',
    imageSrcList: [
      '/BuskerUrl.jpg',
      '/BuskerUrl.jpg',
      '/BuskerUrl.jpg'
    ],
    likesCount: 256,
    commentsCount: 42
  },
  {
    id: '4',
    buskerName: '스트릿댄스팀',
    buskerProfileImage: '/BuskerUrl.jpg',
    timeAgo: '1일 전',
    content: '신곡 뮤직비디오 촬영 현장 스틸컷 공개!',
    imageSrcList: [
      '/BuskerUrl.jpg',
      '/BuskerUrl.jpg'
    ],
    likesCount: 312,
    commentsCount: 78
  },
  {
    id: '5',
    buskerName: '아트스트리트',
    buskerProfileImage: '/BuskerUrl.jpg',
    timeAgo: '2일 전',
    content: '주말에 진행된 버스킹 공연 현장입니다!',
    imageSrcList: [
      '/BuskerUrl.jpg'
    ],
    likesCount: 178,
    commentsCount: 29
  },
  {
    id: '6',
    buskerName: '포토그래퍼K',
    buskerProfileImage: '/BuskerUrl.jpg',
    timeAgo: '5시간 전',
    content: '어제 공연 현장 스케치입니다!',
    imageSrcList: [
      '/BuskerUrl.jpg',
      '/BuskerUrl.jpg',
      '/BuskerUrl.jpg',
      '/BuskerUrl.jpg',
    ],
    likesCount: 256,
    commentsCount: 42
  }
];
