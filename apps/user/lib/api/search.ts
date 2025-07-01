import {
  SearchResponse,
  ReelsSearchParams,
  ReelsSearchResult,
  HashtagSearchParams,
  Hashtag,
  BuskerSearchParams,
  BuskerSearchResult,
} from '../types/search';

const API_BASE_URL = 'https://back.vybz.kr/search-service';

// URL 파라미터를 쿼리 스트링으로 변환하는 헬퍼 함수
function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
}

// 릴스 검색 API
export async function searchReels(params: ReelsSearchParams): Promise<SearchResponse<ReelsSearchResult>> {
  const queryString = buildQueryString(params);
  const response = await fetch(`${API_BASE_URL}/api/v1/search/reels?${queryString}`, {
    method: 'GET',
    headers: {
      'accept': '*/*',
    },
  });

  if (!response.ok) {
    throw new Error(`릴스 검색 실패: ${response.status}`);
  }

  return response.json();
}

// 해시태그 검색 API
export async function searchHashtags(params: HashtagSearchParams): Promise<SearchResponse<Hashtag[]>> {
  const queryString = buildQueryString(params);
  const response = await fetch(`${API_BASE_URL}/api/v1/search/hashtags?${queryString}`, {
    method: 'GET',
    headers: {
      'accept': '*/*',
    },
  });

  if (!response.ok) {
    throw new Error(`해시태그 검색 실패: ${response.status}`);
  }

  return response.json();
}

// 버스커 검색 API
export async function searchBuskers(params: BuskerSearchParams): Promise<SearchResponse<BuskerSearchResult>> {
  const queryString = buildQueryString(params);
  const response = await fetch(`${API_BASE_URL}/api/v1/search/buskers?${queryString}`, {
    method: 'GET',
    headers: {
      'accept': '*/*',
    },
  });

  if (!response.ok) {
    throw new Error(`버스커 검색 실패: ${response.status}`);
  }

  return response.json();
} 