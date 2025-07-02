import { MemberShipType, PaymentHistoryResponse } from "@/types/ResponseDataTypes";
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

export async function fetchActiveMemberships(userUuid: string): Promise<MemberShipType[]> {
  try {
    const response = await instance.get<{ result: MemberShipType[] }>(
      `/support-service/api/v1/membership/active/${userUuid}`,
      { cache: 'no-store' }
    );
    
    if (!response.isSuccess) {
      console.error('활성 멤버십 조회 실패:', response.message);
      return [];
    }
    
    // 응답 구조 확인 및 안전한 반환
    if (response.result && Array.isArray(response.result.result)) {
      return response.result.result;
    } else if (Array.isArray(response.result)) {
      return response.result;
    } else {
      console.warn('예상과 다른 응답 구조:', response.result);
      return [];
    }
  } catch (error) {
    console.error('활성 멤버십 조회 중 오류:', error);
    return [];
  }
}

export async function fetchExpiredMemberships(userUuid: string): Promise<MemberShipType[]> {
  try {
    const response = await instance.get<{ result: MemberShipType[] }>(
      `/support-service/api/v1/membership/expired/${userUuid}`,
      { cache: 'no-store' }
    );
    
    if (!response.isSuccess) {
      console.error('만료된 멤버십 조회 실패:', response.message);
      return [];
    }
    
    // 응답 구조 확인 및 안전한 반환
    if (response.result && Array.isArray(response.result.result)) {
      return response.result.result;
    } else if (Array.isArray(response.result)) {
      return response.result;
    } else {
      console.warn('예상과 다른 응답 구조:', response.result);
      return [];
    }
  } catch (error) {
    console.error('만료된 멤버십 조회 중 오류:', error);
    return [];
  }
}