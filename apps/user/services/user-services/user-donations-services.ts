'use server';

import { HistoryDataType, UseHistoryDataType } from '@/types/ResponseDataTypes';

export async function fetchHistory(page: number): Promise<{
  data: HistoryDataType;
}> {
  const dummyPerPage = 3;
  const allData: UseHistoryDataType[] = [
    {
      id: '1',
      date: '2025-06-15',
      vticketCount: 10000,
      buskerName: '카리나',
      buskerProfileImage: '/buskerUrl.jpg',
      buskerUuid: 'sub1',
      message: '카리나님 항상 응원합니다.',
    },
    {
      id: '2',
      date: '2025-06-14',
      vticketCount: 20000,
      buskerName: '카리나',
      buskerProfileImage: '/buskerUrl.jpg',
      buskerUuid: 'sub1',
      message: '카리나님 항상 응원합니다.',
    },
    {
      id: '3',
      date: '2025-06-13',
      vticketCount: 30000,
      buskerName: '카리나',
      buskerProfileImage: '/buskerUrl.jpg',
      buskerUuid: 'sub1',
      message: '카리나님 항상 응원합니다.',
    },
    {
      id: '4',
      date: '2025-06-12',
      vticketCount: 40000,
      buskerName: '카리나',
      buskerProfileImage: '/buskerUrl.jpg',
      buskerUuid: 'sub1',
      message: '카리나님 항상 응원합니다.',
    },
    {
      id: '5',
      date: '2025-06-11',
      vticketCount: 50000,
      buskerName: '카리나',
      buskerProfileImage: '/buskerUrl.jpg',
      buskerUuid: 'sub1',
      message: '카리나님 항상 응원합니다.',
    },
  ];

  const totalPages = Math.ceil(allData.length / dummyPerPage);
  const start = (page - 1) * dummyPerPage;
  const end = start + dummyPerPage;

  const paginated = allData.slice(start, end);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          type: 'use',
          data: paginated,
          page,
          totalPages,
        },
      });
    }, 300);
  });
}
