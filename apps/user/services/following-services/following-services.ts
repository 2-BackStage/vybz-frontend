'use server';

import { FollowingsResponseDataType } from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { revalidateTag } from 'next/cache';

export const getFollowingsUsers = async (
    page?: number,
    pageSize?: number
  ): Promise<FollowingsResponseDataType> => {
    const session = await getServerSession(options);
    if (!session) {
      return {
        content: [],
        nextCursor: null,
        hasNext: false,
        pageSize: pageSize ?? 10,
        page: page ?? 1,
      };
    }
    
    try {
      const params = new URLSearchParams();
      params.append('userUuid', session.user?.userUuid || '');
      if (page !== undefined) params.append('page', page.toString());
      if (pageSize !== undefined) params.append('pageSize', pageSize.toString());
  
      const query = params.toString();
      const url = `/follow-service/api/v1/follow/following-list?${query}`;
      const response = await instance.get<FollowingsResponseDataType>(url, {
        tags: [`following-${session.user?.userUuid}`],
      });
  
      return response.result!;
    } catch (error) {
      console.error('Error in getFollowingsUsers:', error);
      return {
        content: [],
        nextCursor: null,
        hasNext: false,
        pageSize: pageSize ?? 10,
        page: page ?? 1,
      };
    }
  };
  
  export const AddFollow = async (buskerUuid: string, nickname: string, profileImageUrl: string): Promise<boolean> => {
    const session = await getServerSession(options);
    if (!session) {
      return false;
    }
    
    try {
      const requestBody = {
        follower: [{
          userUuid: session.user?.userUuid,
          nickname: session.user?.name || '',
          profileImageUrl: session.user?.image || ''
        }],
        following: [{
          buskerUuid,
          nickname,
          profileImageUrl
        }]
      };

      const response = await instance.post('/follow-service/api/v1/follow', {
        body: JSON.stringify(requestBody),
        tags: [`following-${session.user?.userUuid}`],
      });
      
      return response.isSuccess;
    } catch (error) {
      console.error('Error in AddFollow:', error);
      return false;
    }
  };

  export const RemoveFollow = async (buskerUuid: string): Promise<boolean> => {
    const session = await getServerSession(options);
    if (!session) {
      return false;
    }
    
    try {
      const requestBody = {
        userUuid: session.user?.userUuid,
        buskerUuid: buskerUuid
      };

      const response = await instance.delete('/follow-service/api/v1/follow', {
        body: JSON.stringify(requestBody),
        requireAuth: true,
      });
      
      if (response.isSuccess) {
        revalidateTag(`following-${session.user?.userUuid}`);
      }

      return response.isSuccess;
    } catch (error) {
      console.error('Error in RemoveFollow:', error);
      return false;
    }
  };
