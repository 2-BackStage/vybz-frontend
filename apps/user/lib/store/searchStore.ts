import { create } from 'zustand';
import { Reel, Hashtag, Busker } from '../types/search';

interface SearchState {
  // 검색어
  keyword: string;
  
  // 검색 결과들
  reels: Reel[];
  hashtags: Hashtag[];
  buskers: Busker[];
  
  // 로딩 상태
  isLoading: boolean;
  isLoadingReels: boolean;
  isLoadingHashtags: boolean;
  isLoadingBuskers: boolean;
  
  // 무한스크롤 상태
  hasNextReels: boolean;
  hasNextBuskers: boolean;
  
  // 액션들
  setKeyword: (keyword: string) => void;
  setReels: (reels: Reel[]) => void;
  addReels: (reels: Reel[]) => void;
  setHashtags: (hashtags: Hashtag[]) => void;
  setBuskers: (buskers: Busker[]) => void;
  addBuskers: (buskers: Busker[]) => void;
  setLoading: (loading: boolean) => void;
  setLoadingReels: (loading: boolean) => void;
  setLoadingHashtags: (loading: boolean) => void;
  setLoadingBuskers: (loading: boolean) => void;
  setHasNextReels: (hasNext: boolean) => void;
  setHasNextBuskers: (hasNext: boolean) => void;
  clearResults: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  // 초기 상태
  keyword: '',
  reels: [],
  hashtags: [],
  buskers: [],
  isLoading: false,
  isLoadingReels: false,
  isLoadingHashtags: false,
  isLoadingBuskers: false,
  hasNextReels: false,
  hasNextBuskers: false,
  
  // 액션들
  setKeyword: (keyword) => set({ keyword }),
  
  setReels: (reels) => set({ reels }),
  addReels: (reels) => set((state) => ({ 
    reels: [...state.reels, ...reels] 
  })),
  
  setHashtags: (hashtags) => set({ hashtags }),
  
  setBuskers: (buskers) => set({ buskers }),
  addBuskers: (buskers) => set((state) => ({ 
    buskers: [...state.buskers, ...buskers] 
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  setLoadingReels: (isLoadingReels) => set({ isLoadingReels }),
  setLoadingHashtags: (isLoadingHashtags) => set({ isLoadingHashtags }),
  setLoadingBuskers: (isLoadingBuskers) => set({ isLoadingBuskers }),
  
  setHasNextReels: (hasNextReels) => set({ hasNextReels }),
  setHasNextBuskers: (hasNextBuskers) => set({ hasNextBuskers }),
  
  clearResults: () => set({
    reels: [],
    hashtags: [],
    buskers: [],
    hasNextReels: false,
    hasNextBuskers: false,
  }),
})); 