'use server';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { fetchPaymentHistory } from '@/services/payment-services/payment-services';
import { fetchDonationHistory } from '@/services/support-services/support-services';
import { HistoryDataType } from '@/types/ResponseDataTypes';

export async function getDonationHistory(page: number = 1, size: number = 10): Promise<HistoryDataType> {
  const session = await getServerSession(options);
  const userUuid = session?.user?.userUuid;

  if (!userUuid) {
    throw new Error('로그인이 필요합니다.');
  }

  try {
    const response = await fetchDonationHistory(userUuid, page, size);
    return {
      type: 'use',
      data: response.dtoList,
      page: response.current,
      size: response.requestPageDTO.size,
      totalCount: response.totalCount,
      totalPages: response.totalPage,
      pageNumList: response.pageNumList,
      prev: response.prev,
      next: response.next,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      currentPage: response.current
    };
  } catch (error) {
    console.error('후원 내역 조회 오류:', error);
    throw error;
  }
}

export async function getPaymentHistory(page: number = 1, size: number = 10): Promise<HistoryDataType> {
  const session = await getServerSession(options);
  const userUuid = session?.user?.userUuid;

  if (!userUuid) {
    throw new Error('로그인이 필요합니다.');
  }

  try {
    const response = await fetchPaymentHistory(userUuid, page, size);
    return {
      type: 'purchase',
      data: response.dtoList,
      page: response.current,
      size: response.requestPageDTO.size,
      totalCount: response.totalCount,
      totalPages: response.totalPage,
      pageNumList: response.pageNumList,
      prev: response.prev,
      next: response.next,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      currentPage: response.current
    };
  } catch (error) {
    console.error('결제 내역 조회 오류:', error);
    throw error;
  }
} 