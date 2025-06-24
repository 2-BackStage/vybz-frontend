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

  const snsTypes = ['instagram', 'youtube', 'tiktok', 'soundcloud'];

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
      instance.post<BuskerUpdateSNSResponseType>(
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

export async function addBuskerCategory(
  buskerUuid: string,
  categoryId: number
) {
  const requestData = {
    buskerUuid,
    categoryId,
  };

  const response = await instance.post(
    `/busker-info-service/api/v1/busker-category`,
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

export async function deleteBuskerCategory(
  buskerUuid: string,
  categoryId: number
) {
  const requestData = {
    buskerUuid,
    categoryId,
  };

  const response = await instance.delete(
    `/busker-info-service/api/v1/busker-category`,
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

export async function updateCategories(buskerUuid: string, formData: FormData) {
  const artistGenreString = formData.get('artistGenre') as string;
  const artistGenre = artistGenreString ? JSON.parse(artistGenreString) : [];

  const initialCategoriesString = formData.get('initialCategories') as string;
  const initialCategories = initialCategoriesString
    ? JSON.parse(initialCategoriesString)
    : [];

  const categoriesToAdd = artistGenre.filter(
    (id: number) => !initialCategories.includes(id)
  );

  const categoriesToRemove = initialCategories.filter(
    (id: number) => !artistGenre.includes(id)
  );

  console.log('추가할 카테고리:', categoriesToAdd);
  console.log('삭제할 카테고리:', categoriesToRemove);

  if (categoriesToAdd.length === 0 && categoriesToRemove.length === 0) {
    return { message: 'No category changes' };
  }

  const addPromises = categoriesToAdd.map((categoryId: number) =>
    addBuskerCategory(buskerUuid, categoryId)
  );

  const removePromises = categoriesToRemove.map((categoryId: number) =>
    deleteBuskerCategory(buskerUuid, categoryId)
  );

  const results = await Promise.all([...addPromises, ...removePromises]);
  return results;
}
