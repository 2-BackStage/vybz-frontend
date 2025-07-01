'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useSearchStore } from '../../lib/store/searchStore';
import { searchReels, searchHashtags, searchBuskers } from '../../lib/api/search';
import { ReelCard } from './ReelCard';
import { BuskerCard } from './BuskerCard';
import { HashtagCard } from './HashtagCard';
import { Loader2 } from 'lucide-react';

interface SearchResultsProps {
  keyword: string;
}

export function SearchResults({ keyword }: SearchResultsProps) {
  const {
    reels,
    hashtags,
    buskers,
    isLoadingReels,
    isLoadingHashtags,
    isLoadingBuskers,
    hasNextReels,
    hasNextBuskers,
    setReels,
    addReels,
    setHashtags,
    setBuskers,
    addBuskers,
    setLoadingReels,
    setLoadingHashtags,
    setLoadingBuskers,
    setHasNextReels,
    setHasNextBuskers,
    clearResults,
  } = useSearchStore();

  const reelsObserverRef = useRef<HTMLDivElement>(null);
  const buskersObserverRef = useRef<HTMLDivElement>(null);

  // 검색 실행 함수
  const performSearch = useCallback(async () => {
    if (!keyword.trim()) {
      clearResults();
      return;
    }

    // 릴스 검색
    setLoadingReels(true);
    try {
      const reelsResponse = await searchReels({
        keyword: keyword.trim(),
        size: 20,
      });
      if (reelsResponse.isSuccess) {
        setReels(reelsResponse.result.content);
        setHasNextReels(reelsResponse.result.hasNext);
      }
    } catch (error) {
      console.error('릴스 검색 실패:', error);
    } finally {
      setLoadingReels(false);
    }

    // 해시태그 검색
    setLoadingHashtags(true);
    try {
      const hashtagsResponse = await searchHashtags({
        keyword: keyword.trim(),
        size: 60,
      });
      if (hashtagsResponse.isSuccess) {
        setHashtags(hashtagsResponse.result);
      }
    } catch (error) {
      console.error('해시태그 검색 실패:', error);
    } finally {
      setLoadingHashtags(false);
    }

    // 버스커 검색
    setLoadingBuskers(true);
    try {
      const buskersResponse = await searchBuskers({
        keyword: keyword.trim(),
        size: 20,
      });
      if (buskersResponse.isSuccess) {
        setBuskers(buskersResponse.result.content);
        setHasNextBuskers(buskersResponse.result.hasNext);
      }
    } catch (error) {
      console.error('버스커 검색 실패:', error);
    } finally {
      setLoadingBuskers(false);
    }
  }, [keyword, setReels, setHashtags, setBuskers, setLoadingReels, setLoadingHashtags, setLoadingBuskers, setHasNextReels, setHasNextBuskers, clearResults]);

  // 무한스크롤 - 릴스
  const loadMoreReels = useCallback(async () => {
    if (!hasNextReels || isLoadingReels) return;

    setLoadingReels(true);
    try {
      const lastReel = reels[reels.length - 1];
      if (lastReel) {
        const response = await searchReels({
          keyword: keyword.trim(),
          size: 20,
          cursorId: lastReel.id,
          cursorCreatedAt: lastReel.createdAt,
        });
        if (response.isSuccess) {
          addReels(response.result.content);
          setHasNextReels(response.result.hasNext);
        }
      }
    } catch (error) {
      console.error('릴스 추가 로드 실패:', error);
    } finally {
      setLoadingReels(false);
    }
  }, [keyword, reels, hasNextReels, isLoadingReels, addReels, setHasNextReels, setLoadingReels]);

  // 무한스크롤 - 버스커
  const loadMoreBuskers = useCallback(async () => {
    if (!hasNextBuskers || isLoadingBuskers) return;

    setLoadingBuskers(true);
    try {
      const lastBusker = buskers[buskers.length - 1];
      if (lastBusker) {
        const response = await searchBuskers({
          keyword: keyword.trim(),
          size: 20,
          cursorFollowerCount: lastBusker.followerCount,
          cursorBuskerUuid: lastBusker.buskerUuid,
        });
        if (response.isSuccess) {
          addBuskers(response.result.content);
          setHasNextBuskers(response.result.hasNext);
        }
      }
    } catch (error) {
      console.error('버스커 추가 로드 실패:', error);
    } finally {
      setLoadingBuskers(false);
    }
  }, [keyword, buskers, hasNextBuskers, isLoadingBuskers, addBuskers, setHasNextBuskers, setLoadingBuskers]);

  // 검색어가 변경될 때 검색 실행
  useEffect(() => {
    performSearch();
  }, [performSearch]);

  // 무한스크롤 관찰자 설정
  useEffect(() => {
    const reelsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextReels) {
          loadMoreReels();
        }
      },
      { threshold: 0.1 }
    );

    const buskersObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextBuskers) {
          loadMoreBuskers();
        }
      },
      { threshold: 0.1 }
    );

    if (reelsObserverRef.current) {
      reelsObserver.observe(reelsObserverRef.current);
    }
    if (buskersObserverRef.current) {
      buskersObserver.observe(buskersObserverRef.current);
    }

    return () => {
      reelsObserver.disconnect();
      buskersObserver.disconnect();
    };
  }, [hasNextReels, hasNextBuskers, loadMoreReels, loadMoreBuskers]);

  if (!keyword.trim()) {
    return (
      <div className="text-center py-12 text-gray-500">
        검색어를 입력해주세요
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 해시태그 섹션 */}
      {hashtags.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">해시태그</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hashtags.map((hashtag, index) => (
              <HashtagCard key={index} hashtag={hashtag} />
            ))}
          </div>
          {isLoadingHashtags && (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
        </section>
      )}

      {/* 버스커 섹션 */}
      {buskers.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">버스커</h2>
          <div className="space-y-4">
            {buskers.map((busker, index) => (
              <BuskerCard key={busker.buskerUuid} busker={busker} />
            ))}
          </div>
          {isLoadingBuskers && (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
          {hasNextBuskers && <div ref={buskersObserverRef} className="h-4" />}
        </section>
      )}

      {/* 릴스 섹션 */}
      {reels.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">릴스</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {reels.map((reel, index) => (
              <ReelCard key={reel.id} reel={reel} />
            ))}
          </div>
          {isLoadingReels && (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
          {hasNextReels && <div ref={reelsObserverRef} className="h-4" />}
        </section>
      )}

      {/* 검색 결과가 없을 때 */}
      {!isLoadingReels && !isLoadingHashtags && !isLoadingBuskers && 
       reels.length === 0 && hashtags.length === 0 && buskers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">검색 결과가 없습니다</p>
          <p className="text-sm">다른 키워드로 검색해보세요</p>
        </div>
      )}
    </div>
  );
} 