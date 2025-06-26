import { NotificationDataType } from '@/types/ResponseDataTypes';
import { notificationData } from '@/data/notificationData';

const dummyNotifications: NotificationDataType[] = [
  ...notificationData,
  ...Array.from({ length: 50 }, (_, i) => {
    const day = 15 - Math.floor(i / 5);
    return {
      id: (notificationData.length + i + 1).toString(),
      date: `2025-06-${day.toString().padStart(2, '0')} 13:00:00`,
      buskerName: '카리나',
      buskerProfileImage: '/buskerUrl.jpg',
      buskerUuid: '1',
      feedId: '1',
      message: '님이 피드에 좋아요를 남겼습니다.',
    };
  }),
];

export async function fetchNotifications(
  page: number,
  pageSize: number
): Promise<{ content: NotificationDataType[] }> {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const content = dummyNotifications.slice(startIndex, endIndex);

  await new Promise((res) => setTimeout(res, 500));

  return { content };
}
