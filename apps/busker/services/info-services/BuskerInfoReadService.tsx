'use server';
import {
  BuskerInfoReadResponseType,
  BuskerCategoryResponseType,
  BuskerSNSResponseType,
  BuskerUpdateProfileResponseType,
  BuskerUpdateSNSResponseType,
  BuskerUpdateProfileRequestType,
  BuskerUpdateSNSRequestType,
} from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';

export async function BuskerInfoReadService(
  buskerUuid: string
): Promise<BuskerInfoReadResponseType> {
  const response = await instance.get<BuskerInfoReadResponseType>(
    `/busker-info-read-service/api/v1/busker-info-read/${buskerUuid}`,
    {
      requireAuth: true,
    }
  );
  return response.result;
}

export async function BuskerCategoryReadService(
  buskerUuid: string
): Promise<BuskerCategoryResponseType[]> {
  const response = await instance.get<BuskerCategoryResponseType[]>(
    `/busker-info-service/api/v1/busker-category/list/${buskerUuid}`,
    {
      requireAuth: true,
    }
  );
  return response.result;
}

export async function BuskerSNSService(
  buskerUuid: string
): Promise<BuskerSNSResponseType[]> {
  const response = await instance.get<BuskerSNSResponseType[]>(
    `/busker-info-service/api/v1/busker-sns/list/${buskerUuid}`,
    {
      requireAuth: true,
    }
  );
  return response.result;
}

export async function updateProfile(buskerUuid: string, formData: FormData) {
  const keysToDelete = Array.from(formData.keys()).filter(
    (key) => key.startsWith('$ACTION_') || key === '$ACTION_REF_1'
  );
  keysToDelete.forEach((key) => formData.delete(key));
  const requestData: BuskerUpdateProfileRequestType = {
    buskerUuid: buskerUuid,
    nickname: formData.get('nickname') as string,
    introduction: formData.get('introduction') as string,
  };

  const profileImageUrl = formData.get('profileImageUrl') as string;
  if (profileImageUrl) {
    requestData.profileImageUrl = profileImageUrl;
  }

  console.log('프로필 업데이트 데이터:', requestData);

  const response = await instance.put<BuskerUpdateProfileResponseType>(
    `/busker-info-service/api/v1/busker`,
    {
      body: JSON.stringify(requestData),
      requireAuth: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.result;
}
export async function updateSNS(buskerUuid: string, formData: FormData) {
  const keysToDelete = Array.from(formData.keys()).filter(
    (key) => key.startsWith('$ACTION_') || key === '$ACTION_REF_1'
  );
  keysToDelete.forEach((key) => formData.delete(key));

  const snsRequests: BuskerUpdateSNSRequestType[] = [];

  const snsTypes = ['instagram', 'youtube', 'facebook', 'tiktok', 'twitter'];

  for (const snsType of snsTypes) {
    const snsUrl = formData.get(snsType) as string;
    const oldSnsUrl = formData.get(`old_${snsType}`) as string | undefined;

    if (snsUrl) {
      const snsRequest: BuskerUpdateSNSRequestType = {
        buskerUuid: buskerUuid,
        snsUrl: snsUrl,
      };

      if (oldSnsUrl) {
        snsRequest.oldSnsUrl = oldSnsUrl;
      }

      snsRequests.push(snsRequest);
    }
  }

  console.log('SNS 업데이트 데이터:', snsRequests);

  if (snsRequests.length === 0) {
    return { message: 'No SNS data to update' };
  }

  const responses = await Promise.all(
    snsRequests.map((request) =>
      instance.put<BuskerUpdateSNSResponseType>(
        `/busker-info-service/api/v1/busker-sns`,
        {
          body: JSON.stringify(request),
          requireAuth: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    )
  );

  return responses.map((response) => response.result);
}
