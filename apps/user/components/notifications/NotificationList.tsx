'use client';

import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { useState } from 'react';
import { NotificationDataType } from '@/types/ResponseDataTypes';
import { useInfiniteScrollQuery } from '@/hooks/useInfiniteFetchQuery';
import { fetchNotifications } from '@/services/user-services/user-notifications-service';
import { categorizeNotifications } from '@/utils/categorizeNotifications';
import InfiniteScrollWrapper from '@/components/common/layouts/wrapper/InfiniteScrollWrapper';
import NotificationItem from '@/components/notifications/NotificationItem';
import EmptyNotification from '@/components/notifications/EmptyNotification';

export default function NotificationList({
  notificationData,
}: {
  notificationData: NotificationDataType[];
}) {
  const queryClient = useQueryClient();
  const [swipedId, setSwipedId] = useState<string | null>(null);

  const {
    items: allNotifications,
    fetchMore,
    hasMore,
    isLoading,
  } = useInfiniteScrollQuery<NotificationDataType>({
    queryKey: 'notifications',
    queryFn: fetchNotifications,
    initialData: notificationData,
  });

  const handleDelete = (id: string) => {
    queryClient.setQueryData<InfiniteData<NotificationDataType[]>>(
      ['notifications'],
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: NotificationDataType[]) =>
            page.filter((item) => item.id !== id)
          ),
        };
      }
    );
  };

  const handleSwipe = (id: string | null) => {
    setSwipedId(id);
  };

  const categorizedData = categorizeNotifications(allNotifications);
  const categoryOrder = ['오늘', '어제', '최근 7일', '최근 30일', '이전 활동'];
  const sortedCategories = categoryOrder.filter(
    (category) => (categorizedData[category] || []).length > 0
  );

  return (
    <InfiniteScrollWrapper
      fetchMore={fetchMore}
      hasNextPage={hasMore}
      isLoading={isLoading}
    >
      <main className="text-white px-4 mt-20 font-poppins">
        {sortedCategories.map((category) => (
          <div key={category}>
            <h3 className="text-xl font-semibold mx-4 my-3">{category}</h3>
            {categorizedData[category]?.map((notification) => (
              <NotificationItem
                key={notification.id}
                {...notification}
                onDelete={handleDelete}
                isOpen={swipedId === notification.id}
                onSwipe={handleSwipe}
              />
            ))}
          </div>
        ))}

        {sortedCategories.length === 0 && <EmptyNotification />}
      </main>
    </InfiniteScrollWrapper>
  );
}
