import { UseHistoryResponse } from "@/types/ResponseDataTypes";
import { instance } from "@/utils/requestHandler";

export async function fetchDonationHistory(
  userUuid: string,
  page: number = 1,
  size: number = 10
): Promise<UseHistoryResponse> {
  const response = await instance.get<UseHistoryResponse>(
    `/support-service/api/v1/donation/user-history/${userUuid}?page=${page}&size=${size}`,
    {
      requireAuth: true,
      cache: 'no-store',
    }
  );

  if (!response.isSuccess) {
    throw new Error(response.message || '후원 내역 조회 실패');
  }

  return response.result as UseHistoryResponse;
}