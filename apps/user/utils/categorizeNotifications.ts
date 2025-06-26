import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat'; 
import { NotificationDataType } from '@/types/ResponseDataTypes';

dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat); 

type CategorizedNotification = NotificationDataType & { timeAgo: string };

export function categorizeNotifications(
  notifications: NotificationDataType[]
): Record<string, CategorizedNotification[]> {
  const now = dayjs();

  return notifications.reduce<Record<string, CategorizedNotification[]>>(
    (acc, notification) => {
      const rawDate = notification.date?.trim?.(); 

      const notifDate = dayjs(rawDate, 'YYYY-MM-DD HH:mm:ss', true);

      if (!notifDate.isValid()) {
        console.warn('Invalid date format:', rawDate);
        return acc; 
      }

      const diff = now.diff(notifDate, 'day');

      let category: string;
      if (diff === 0) {
        category = '오늘';
      } else if (diff === 1) {
        category = '어제';
      } else if (diff <= 7) {
        category = '최근 7일';
      } else if (diff <= 30) {
        category = '최근 30일';
      } else {
        category = '이전 활동';
      }

      const timeAgo = notifDate.fromNow();

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category]?.push({ ...notification, timeAgo });
      return acc;
    },
    {}
  );
}
