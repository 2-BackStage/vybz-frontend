import { VideoCarouselDataType } from '@/types/ResponseDataTypes';
import { LiveFreeViewType, ReelsUrlDataType } from '@/types/ResponseDataTypes';

export const videoSlideData: VideoCarouselDataType[] = [
  {
    id: '1',
    videoSrc: '/background/intro.mp4',
    thumbnailSrc: '/background/logopage1.jpg',
  },
  {
    id: '2',
    videoSrc: '/background/intro.mp4',
    thumbnailSrc: '/background/logopage1.jpg',
  },
  {
    id: '3',
    videoSrc: '/background/intro.mp4',
    thumbnailSrc: '/background/logopage1.jpg',
  },
];

export const liveFreeViewData: LiveFreeViewType[] = [
  {
    id: '1',
    buskerId: 'busker1',
    buskerName: '카리나',
    liveName: '우리동네 아이돌',
    buskerProfileImage: '/buskerUrl.jpg',
    isMembership: true,
  },
  {
    id: '2',
    buskerId: 'busker2',
    buskerName: '윈터',
    liveName: '겨울 특집 라이브',
    buskerProfileImage: '/buskerUrl.jpg',
    isMembership: true,
  },
  {
    id: '3',
    buskerId: 'busker3',
    buskerName: '닝닝',
    liveName: '신나는 공연',
    buskerProfileImage: '/buskerUrl.jpg',
    isMembership: false,
  },
];

export const reelsVideoData: ReelsUrlDataType[] = [
  {
    realsId: '1',
    realsUrl: '/background/intro.mp4',
    realsThumbnailUrl: '/background/intro.mp4',
    realsDescription:
      '반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다반갑습니다',
    buskerId: '1',
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    realsLikeCount: 830000,
    realsCommentCount: 551,
  },
  {
    realsId: '2',
    realsUrl: '/background/intro.mp4',
    realsThumbnailUrl: '/background/intro.mp4',
    realsDescription: '안녕하세요',
    buskerId: '2',
    buskerName: '윈터',
    buskerProfileImage: '/buskerUrl.jpg',
    realsLikeCount: 10,
    realsCommentCount: 10,
  },
  {
    realsId: '3',
    realsUrl: '/background/intro.mp4',
    realsThumbnailUrl: '/background/intro.mp4',
    realsDescription: '안녕하세요',
    buskerId: '3',
    buskerName: '닝닝',
    buskerProfileImage: '/buskerUrl.jpg',
    realsLikeCount: 10,
    realsCommentCount: 10,
  },
  {
    realsId: '4',
    realsUrl: '/background/intro.mp4',
    realsThumbnailUrl: '/background/intro.mp4',
    realsDescription: '안녕하세요',
    buskerId: '4',
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    realsLikeCount: 10,
    realsCommentCount: 10,
  },
  {
    realsId: '5',
    realsUrl: '/background/intro.mp4',
    realsThumbnailUrl: '/background/intro.mp4',
    realsDescription: '안녕하세요',
    buskerId: '5',
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    realsLikeCount: 10,
    realsCommentCount: 10,
  },
];

export const dummyLiveData: LiveFreeViewType[] = [
  {
    id: 'b001',
    buskerId: 'b001',
    liveName: '도심 속 힐링 버스킹',
    buskerName: '홍길동',
    buskerProfileImage: '/buskerUrl.jpg',
    isMembership: true,
    viewerCount: 100000,
  },
  {
    id: 'b002',
    buskerId: 'b002',
    liveName: '감성 기타 선율',
    buskerName: '이수민',
    buskerProfileImage: '/buskerUrl.jpg',
    isMembership: false,
  },
  {
    id: 'b003',
    buskerId: 'b003',
    liveName: '밤하늘 재즈 콘서트',
    buskerName: '김재훈',
    buskerProfileImage: '/buskerUrl.jpg',
    isMembership: true,
  },
  {
    id: 'b004',
    buskerId: 'b004',
    liveName: '비 오는 날의 버스킹',
    buskerName: '박지은',
    buskerProfileImage: '/buskerUrl.jpg',
    isMembership: false,
  },
  {
    id: 'b005',
    buskerId: 'b005',
    liveName: '낮과 밤의 사운드',
    buskerName: '정우성',
    buskerProfileImage: '/buskerUrl.jpg',
    isMembership: true,
  },
  {
    id: 'b006',
    buskerId: 'b006',
    liveName: '올드팝 리바이벌',
    buskerName: '최유리',
    buskerProfileImage: '/buskerUrl.jpg',
    isMembership: false,
  },
];
