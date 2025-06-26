import NotificationList from '@/components/notifications/NotificationList';
import { notificationData } from '@/data/notificationData';

export default function page() {
  return <NotificationList notificationData={notificationData} />;
}
