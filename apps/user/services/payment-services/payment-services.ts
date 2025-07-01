import { PaymentHistoryResponse } from "@/types/ResponseDataTypes";
import { instance } from "@/utils/requestHandler";

export async function fetchPaymentHistory(
  userUuid: string,
  page: number = 1,
  size: number = 10
): Promise<PaymentHistoryResponse> {
  const response = await instance.get<PaymentHistoryResponse>(
    `/payment-service/api/v1/payment/${userUuid}?page=${page}&size=${size}`,
    {
      requireAuth: true,
      cache: 'no-store',
    }
  );

  if (!response.isSuccess) {
    throw new Error(response.message || '결제 내역 조회 실패');
  }

  return response.result as PaymentHistoryResponse;
}