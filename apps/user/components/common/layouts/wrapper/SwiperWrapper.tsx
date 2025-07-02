'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Mousewheel } from 'swiper/modules';
import { useQueryClient } from '@tanstack/react-query';

import {
  BuskerInfoReadResponseType,
  ReelsUrlDataType,
  UserInfoDataType,
} from '@/types/ResponseDataTypes';
import { getReelsVideos } from '@/services/reels-services/reels-services';
import { getBuskerInfo } from '@/services/user-services/UserInfoServices';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

import ReelsBackgroundWrapper from './backgrounds/ReelsBackgroundWrapper';
import ReelsBoxs from '@/components/reels/ReelsBoxs';
import ReelsMetaDataBox from '@/components/reels/ReelsMetaDataBox';
import Spinner from '@/components/common/spinners/Spinner';

export default function SwiperWrapper({
  initialItems,
  children,
  pageSize = 10,
  sortType = 'LATEST',
}: {
  initialItems: ReelsUrlDataType[];
  children: React.ReactNode;
  pageSize?: number;
  sortType?: 'LATEST' | 'LIKES' | 'COMMENTS';
}) {
  SwiperCore.use([Mousewheel]);

  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex);
  };

  const {
    items,
    fetchMore,
    loading: isItemsLoading,
  } = useInfiniteScroll<ReelsUrlDataType>({
    fetchFn: getReelsVideos,
    initialItems,
    pageSize,
    sortType,
  });

  // writerUuid를 가져오기 위한 배열 준비
  const writerUuids = useMemo(() => {
    console.log(`writer`, items);
    return items?.map((item) => item.buskerId).filter((uuid) => !!uuid) || [];
  }, [items]);

  // 사용자 정보를 저장할 상태
  const [userInfoMap, setUserInfoMap] = useState<
    Record<string, UserInfoDataType>
  >({});
  const [userInfoLoadingMap, setUserInfoLoadingMap] = useState<
    Record<string, boolean>
  >({});
  const userInfoMapRef = useRef(userInfoMap);
  const userInfoLoadingMapRef = useRef(userInfoLoadingMap);

  // QueryClient 가져오기
  const queryClient = useQueryClient();

  // useEffect를 사용하여 렌더링 단계가 아닌 이펙트 단계에서 데이터 가져오기
  useEffect(() => {
    userInfoMapRef.current = userInfoMap;
  }, [userInfoMap]);

  useEffect(() => {
    userInfoLoadingMapRef.current = userInfoLoadingMap;
  }, [userInfoLoadingMap]);

  // UUID 문자열로 변환하여 의존성 검사 최적화
  const writerUuidsString = useMemo(() => writerUuids.join(','), [writerUuids]);

  // 모든 사용자 정보를 항상 가져오기 (효율성 무시)
  useEffect(() => {
    // 유효한 UUID가 있는 경우 항상 실행
    if (writerUuids.length > 0) {
      console.log('All writer UUIDs:', writerUuids);

      // 모든 UUID에 대해 항상 가져오기 (필터링 없음)
      const uuidsToFetch = writerUuids.filter((uuid) => !!uuid);

      if (uuidsToFetch.length === 0) {
        console.log('No valid UUIDs found');
        return;
      }

      console.log(
        'Fetching user info for ALL UUIDs (no filtering):',
        uuidsToFetch
      );

      // 각 UUID에 대해 사용자 정보 가져오기
      const fetchUserInfo = async () => {
        // 로딩 상태 설정 (한 번만)
        const newLoadingMap: Record<string, boolean> = {};
        uuidsToFetch.forEach((uuid) => {
          newLoadingMap[uuid] = true;
        });

        setUserInfoLoadingMap((prev) => ({ ...prev, ...newLoadingMap }));

        // 함수형 업데이트를 사용하여 최신 상태를 참조
        const promises = uuidsToFetch.map(async (uuid) => {
          try {
            // 캐시에서 먼저 확인
            const cachedData = queryClient.getQueryData<UserInfoDataType>([
              'userInfo',
              uuid,
            ]);
            if (cachedData) {
              return { uuid, data: cachedData };
            }

            console.log(`Fetching busker info for UUID: ${uuid}`);
            const data = await getBuskerInfo(uuid);
            console.log('Busker API response:', data);
            queryClient.setQueryData(['userInfo', uuid], data);
            return { uuid, data };
          } catch (error) {
            console.error(`Error fetching user info for ${uuid}:`, error);
            return {
              uuid,
              data: {
                nickname: '알 수 없음',
                profileImageUrl: '/defaultprofile.png',
                followingCount: 0,
                subscribeCount: 0,
                vticketCount: 0,
              },
            };
          }
        });

        const results = await Promise.all(promises);

        // 상태 업데이트 (한 번에)
        setUserInfoMap((prevUserInfoMap) => {
          const newUserInfoMap = { ...prevUserInfoMap };
          let hasChanges = false;

          results.forEach(({ uuid, data }) => {
            if (uuid && data && !newUserInfoMap[uuid]) {
              // BuskerInfoReadResponseType인지 UserInfoDataType인지 확인
              const userInfo: UserInfoDataType = {
                nickname: data.nickname,
                profileImageUrl: data.profileImageUrl,
                followingCount:
                  (data as BuskerInfoReadResponseType).followingCount || 0,
                subscriptionCount:
                  (data as BuskerInfoReadResponseType).subscribeCount ||
                  (data as BuskerInfoReadResponseType).subscribedCount ||
                  0,
                vticketCount:
                  (data as BuskerInfoReadResponseType).vticketCount || 0,
              };
              newUserInfoMap[uuid] = userInfo;
              hasChanges = true;
            }
          });

          return hasChanges ? newUserInfoMap : prevUserInfoMap;
        });

        // 로딩 상태 업데이트 (한 번에)
        setUserInfoLoadingMap((prevLoadingMap) => {
          const updatedLoadingMap = { ...prevLoadingMap };
          uuidsToFetch.forEach((uuid) => {
            updatedLoadingMap[uuid] = false;
          });
          return updatedLoadingMap;
        });

        // 리렌더링 트리거 (메모리에 따른 최적화)
        setRenderTrigger((prev) => prev + 1);
      };

      fetchUserInfo();
    }
  }, [writerUuids, writerUuidsString, queryClient]); // UUID 리스트가 변경될 때만 실행

  return (
    <main key={renderTrigger} className="relative h-screen w-screen">
      {isItemsLoading && items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Spinner size={10} className="text-white" />
        </div>
      )}
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel
        watchSlidesProgress
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        onReachEnd={fetchMore}
        className="h-screen w-screen"
      >
        {useMemo(() => {
          return items.map((item, index) => {
            const isActive = index === activeIndex;
            const writerUuid = item.buskerId;

            // writerUuid로 사용자 정보 가져오기
            let userInfo = userInfoMap[writerUuid];

            // 사용자 정보가 없거나 nickname이 빈 문자열인 경우 기본값 사용
            if (!userInfo || !userInfo.nickname) {
              userInfo = {
                nickname: '알 수 없음',
                profileImageUrl: '/defaultprofile.png',
                followingCount: 0,
                subscriptionCount: 0,
                vticketCount: 0,
              };
            }

            return (
              <SwiperSlide
                key={`${item.realsId}-${isActive}`}
                className="relative"
              >
                <ReelsBackgroundWrapper
                  videoUrl={item.realsUrl}
                  isActive={isActive}
                />
                <ReelsBoxs
                  likeCount={item.realsLikeCount}
                  reelsCommentCount={item.realsCommentCount}
                  feedId={item.realsId}
                />
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-b from-black/0 via-black/70 to-black/90 pt-10 pb-16">
                  <div className="relative">
                    <ReelsMetaDataBox
                      realsDescription={item.realsDescription}
                      buskerId={item.buskerId}
                      buskerName={userInfo.nickname}
                      buskerProfileImage={
                        userInfo.profileImageUrl || '/defaultprofile.png'
                      }
                    />
                    {userInfoLoadingMap[writerUuid] && (
                      <div className="absolute top-2 right-2 z-20">
                        <Spinner size={3} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          });
        }, [items, activeIndex, userInfoMap, userInfoLoadingMap])}
      </Swiper>

      {children}
    </main>
  );
}
