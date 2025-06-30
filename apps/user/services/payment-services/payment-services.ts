import { PaymentHistoryResponse } from "@/types/ResponseDataTypes";

export async function fetchPaymentHistory(
  userUuid: string,
  page: number = 1,
  size: number = 10
): Promise<PaymentHistoryResponse> {
  const res = await fetch(
    `${process.env.BASE_API_URL}/payment-service/api/v1/payment/${userUuid}?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) throw new Error('결제 내역 조회 실패');

  const data = await res.json();
  return data.result as PaymentHistoryResponse;
}