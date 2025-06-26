import { HistoryDataType, SubscriptionType } from '@/types/ResponseDataTypes';
import { PurchaseHistoryDataType, UseHistoryDataType } from '@/types/ResponseDataTypes';

export const subscriptionData: SubscriptionType[] = [
  {
    id: 'sub1',
    name: 'Vocal Vixens',
    months: 14,
    avatarUrl: '/buskerUrl.jpg',
    subscribedSince: '2023-03-15'
  },
  {
    id: 'sub2',
    name: 'The Street Pianos',
    months: 12,
    avatarUrl: '/buskerUrl.jpg',
    subscribedSince: '2023-05-22'
  },
  {
    id: 'sub3',
    name: 'Brass Monkeys',
    months: 10,
    avatarUrl: '/buskerUrl.jpg',
    subscribedSince: '2023-07-10'
  }
];

export const purchaseHistoryData: PurchaseHistoryDataType[] = [
  {
    id: '1',
    date: '2025-06-15',
    vticketCount: 10000,
    amount: 11000
  },
  {
    id: '2',
    date: '2025-06-15',
    vticketCount: 20000,
    amount: 22000
  },
  {
    id: '3',
    date: '2025-06-14',
    vticketCount: 30000,
    amount: 33000
  },
  {
    id: '4',
    date: '2025-06-13',
    vticketCount: 40000,
    amount: 44000
  },
  {
    id: '5',
    date: '2025-06-13',
    vticketCount: 50000,
    amount: 55000
  },
  {
    id: '6',
    date: '2025-06-12',
    vticketCount: 60000,
    amount: 66000
  },
  {
    id: '7',
    date: '2025-06-12',
    vticketCount: 70000,
    amount: 77000
  },
  {
    id: '8',
    date: '2025-06-12',
    vticketCount: 80000,
    amount: 88000
  },
  {
    id: '9',
    date: '2025-06-12',
    vticketCount: 90000,
    amount: 99000
  },
  {
    id: '10',
    date: '2025-06-12',
    vticketCount: 100000,
    amount: 110000
  }
];

export const useHistoryData: UseHistoryDataType[] = [
  {
    id: '1',
    date: '2025-06-15',
    vticketCount: 10000,
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    buskerUuid: 'sub1',
    message: '카리나님 항상 응원합니다.'
  },
  {
    id: '2',
    date: '2025-06-15',
    vticketCount: 20000,
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    buskerUuid: 'sub1',
    message: '카리나님 항상 응원합니다.'
  },
  {
    id: '3',
    date: '2025-06-14',
    vticketCount: 30000,
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    buskerUuid: 'sub1',
    message: '카리나님 항상 응원합니다.'
  },
  {
    id: '4',
    date: '2025-06-13',
    vticketCount: 40000,
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    buskerUuid: 'sub1',
    message: '카리나님 항상 응원합니다.'
  },
  {
    id: '5',
    date: '2025-06-13',
    vticketCount: 50000,
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    buskerUuid: 'sub1',
    message: '카리나님 항상 응원합니다.'
  },
  {
    id: '6',
    date: '2025-06-12',
    vticketCount: 60000,
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    buskerUuid: 'sub1',
    message: '카리나님 항상 응원합니다.'
  },
  {
    id: '7',
    date: '2025-06-12',
    vticketCount: 70000,
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    buskerUuid: 'sub1',
    message: '카리나님 항상 응원합니다.'
  },
  {
    id: '8',
    date: '2025-06-12',
    vticketCount: 80000,
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    buskerUuid: 'sub1',
    message: '카리나님 항상 응원합니다.'
  },
  {
    id: '9',
    date: '2025-06-12',
    vticketCount: 90000,
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    buskerUuid: 'sub1',
    message: '카리나님 항상 응원합니다.'
  },
  {
    id: '10',
    date: '2025-06-12',
    vticketCount: 100000,
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    buskerUuid: 'sub1',
    message: '카리나님 항상 응원합니다.'
  },
];   

export const historyData: HistoryDataType = {
 type: 'purchase',
 data: purchaseHistoryData,
 page: 1,
 totalPages: 10
};