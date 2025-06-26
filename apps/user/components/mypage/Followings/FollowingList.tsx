'use client';

import { useState, useEffect } from 'react';
import FollowingBuskerBox from './FollowingBuskerBox';
import {
  FollowingDataType,
  FollowingsResponseDataType,
} from '@/types/ResponseDataTypes';
import InfiniteScrollWrapper from '@/components/common/layouts/wrapper/InfiniteScrollWrapper';
import { useInfiniteScrollQuery } from '@/hooks/useInfiniteFetchQuery';
import { getFollowingsUsers } from '@/services/following-services/following-services';

export default function FollowingList({
  initialFollowings,
}: {
  initialFollowings: FollowingsResponseDataType;
}) {
  const [openedMenuId, setOpenedMenuId] = useState<string | null>(null);

  const {
    items: followings,
    isLoading,
    hasMore: hasNextPage,
    fetchMore,
  } = useInfiniteScrollQuery<FollowingDataType>({
    queryKey: 'followings',
    queryFn: async (page, pageSize) => {
      const response = await getFollowingsUsers(page, pageSize);
      return { content: response.content };
    },
    initialData: initialFollowings.content,
    pageSize: initialFollowings.pageSize,
  });

  const handleMenuToggle = (buskerId: string) => {
    setOpenedMenuId(openedMenuId === buskerId ? null : buskerId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openedMenuId &&
        !(event.target as HTMLElement).closest(
          `[data-busker-id="${openedMenuId}"]`
        )
      ) {
        setOpenedMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openedMenuId]);

  if (!followings.length && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-400">
        <p>팔로우 중인 버스커가 없습니다.</p>
      </div>
    );
  }

  return (
    <InfiniteScrollWrapper
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      fetchMore={fetchMore}
    >
      <section className="mt-4 font-poppins text-white space-y-4">
        {followings.map((following) => (
          <div key={following.buskerUuid} data-busker-id={following.buskerUuid}>
            <FollowingBuskerBox
              buskerName={following.nickname}
              buskerId={following.buskerUuid}
              buskerProfileImage={following.profileImageUrl}
              isMenuOpen={openedMenuId === following.buskerUuid}
              onMenuToggle={() => handleMenuToggle(following.buskerUuid)}
            />
          </div>
        ))}
      </section>
    </InfiniteScrollWrapper>
  );
}
