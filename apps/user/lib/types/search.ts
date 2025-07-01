// 검색 API 응답 타입들
export interface SearchResponse<T> {
  httpStatus: string;
  isSuccess: boolean;
  message: string;
  code: number;
  result: T;
}

// 릴스 검색 요청 파라미터
export interface ReelsSearchParams {
  keyword: string;
  size: number;
  cursorId?: string;
  cursorCreatedAt?: number;
}

// 릴스 데이터
export interface Reel {
  id: string;
  writerUuid: string;
  content: string;
  hashTag: string[];
  thumbnailUrl: string;
  createdAt: number;
}

// 릴스 검색 결과
export interface ReelsSearchResult {
  content: Reel[];
  hasNext: boolean;
  nextCursorFollowerCount: number | null;
  nextCursorBuskerUuid: string | null;
  nextCursorId: string | null;
  nextCursorCreatedAt: number | null;
}

// 해시태그 검색 요청 파라미터
export interface HashtagSearchParams {
  keyword: string;
  size: number;
}

// 해시태그 데이터
export interface Hashtag {
  tagName: string;
}

// 버스커 검색 요청 파라미터
export interface BuskerSearchParams {
  keyword: string;
  size: number;
  cursorFollowerCount?: number;
  cursorBuskerUuid?: string;
}

// 버스커 데이터
export interface Busker {
  buskerUuid: string;
  nickname: string;
  profileImageUrl: string;
  followerCount: number;
}

// 버스커 검색 결과
export interface BuskerSearchResult {
  content: Busker[];
  hasNext: boolean;
  nextCursorFollowerCount: number | null;
  nextCursorBuskerUuid: string | null;
  nextCursorId: string | null;
  nextCursorCreatedAt: number | null;
} 