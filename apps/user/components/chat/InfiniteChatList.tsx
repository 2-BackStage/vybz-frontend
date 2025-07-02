'use client';

import {
  BuskerInfoReadResponseType,
  ChatRoomListResponseType,
  ChatRoomType,
  UserInfoDataType,
} from '@/types/ResponseDataTypes';
import { useInfiniteCursorQuery } from '@/hooks/useInfiniteCursorQuery';
import InfiniteScrollWrapper from '@/components/common/layouts/wrapper/InfiniteScrollWrapper';
import ChatListItem from '@/components/chat/ChatListItem';
import { getChatList } from '@/services/chat-services/chat-list-services';
import { getBuskerInfo } from '@/services/user-services/UserInfoServices';
import { useState, useMemo, useEffect, useRef } from 'react';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

// 메모이제이션된 ChatListItem 컴포넌트
const MemoizedChatListItem = React.memo(ChatListItem);

export default function InfiniteChatList({
  chatList = [],
  nextCursor = null,
  hasNext = false,
}: {
  chatList: ChatRoomType[];
  nextCursor: string | null;
  hasNext: boolean;
}) {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [renderTrigger, setRenderTrigger] = useState(0);
  const {
    items: allChatRooms,
    isLoading,
    hasMore: hasNextPage,
    fetchMore,
  } = useInfiniteCursorQuery<ChatRoomListResponseType, ChatRoomType>({
    queryKey: 'chatRooms',
    queryFn: async (cursor) => {
      const response = await getChatList(cursor || undefined);
      return response;
    },
    getNextCursor: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
    selectItems: (pages) => pages.flatMap((page) => page.content),
    initialData: {
      content: chatList,
      nextCursor: nextCursor || '',
      hasNext: hasNext,
      pageSize: 10,
    },
  });

  // 사용자 정보를 가져오기 위한 배열 준비
  const participantUuids = useMemo(() => {
    return (
      allChatRooms
        ?.map((room) => {
          const otherParticipant = room.participant[0]; // busker가 첫 번째
          return otherParticipant?.participantUuid || '';
        })
        .filter((uuid) => !!uuid) || []
    );
  }, [allChatRooms]);

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

  useEffect(() => {
    // 유효한 UUID가 있는 경우에만 실행
    if (participantUuids.length > 0) {
      console.log('Fetching user info for:', participantUuids);

      // 실제로 가져와야 할 UUID만 필터링
      const uuidsToFetch = participantUuids.filter(
        (uuid) =>
          uuid &&
          !userInfoMapRef.current[uuid] &&
          !userInfoLoadingMapRef.current[uuid]
      );

      if (uuidsToFetch.length === 0) {
        console.log('No new UUIDs to fetch');
        return;
      }

      console.log('Actually fetching for:', uuidsToFetch);

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

            const data = await getBuskerInfo(uuid);
            queryClient.setQueryData(['userInfo', uuid], data);
            return { uuid, data };
          } catch (error) {
            console.error(`Error fetching user info for ${uuid}:`, error);
            return {
              uuid,
              data: {
                nickname: '알 수 없음',
                profileImageUrl: '/defaultProfile.png',
                followingCount: 0,
                subscriptionCount: 0,
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
  }, [participantUuids, queryClient]);

  return (
    <div key={renderTrigger} className="flex flex-col gap-4">
      <InfiniteScrollWrapper
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        fetchMore={fetchMore}
      >
        {useMemo(() => {
          return allChatRooms?.map((room) => {
            const otherParticipant = room.participant[0]; // busker가 첫 번째
            const participantUuid = otherParticipant?.participantUuid || '';

            // 참가자 UUID로 사용자 정보 가져오기
            const isLoading = userInfoLoadingMap[participantUuid] || false;
            const userInfo = userInfoMap[participantUuid] || {
              nickname: '알 수 없음',
              profileImageUrl: '/defaultProfile.png',
              followingCount: 0,
              subscriptionCount
              : 0,
              vticketCount: 0,
            };

            return (
              <MemoizedChatListItem
                key={room.chatRoomId}
                chatId={room.chatRoomId}
                userInfo={userInfo}
                lastMessage={room.content || '삭제된 메세지 입니다'}
                lastMessageTime={room.sentAt || new Date().toISOString()}
                unreadCount={otherParticipant?.unreadCount || 0}
                messageType={room.messageType}
                isSelected={selectedChatId === room.chatRoomId}
                onSelect={() => setSelectedChatId(room.chatRoomId)}
                isLoading={isLoading}
                buskerId={room.participant[0]?.participantUuid}
              />
            );
          });
        }, [allChatRooms, selectedChatId, userInfoMap, userInfoLoadingMap])}
      </InfiniteScrollWrapper>
    </div>
  );
}
