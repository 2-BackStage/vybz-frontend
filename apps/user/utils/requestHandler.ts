import { CommonResponseType } from '@/types/ResponseDataTypes';
import { auth } from '../services/auth-services/auth-services';

interface NextFetchRequestConfig {
  tags?: string[];
  revalidate?: number | false;
}

interface RequestOptions extends RequestInit {
  isMultipart?: boolean;
  requireAuth?: boolean;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number | false;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || process.env.BASE_API_URL || 'https://back.vybz.kr';

const fetchInstance = async <T = undefined>(
  url: string,
  options: RequestOptions = {}
): Promise<CommonResponseType<T>> => {
  try {
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    if (options.requireAuth === true) {
      const token = await auth();
      if (token?.user?.accessToken) {
        headers.Authorization = `Bearer ${token.user.accessToken}`;
      } else {
        throw new Error('인증이 필요합니다');
      }
    }

    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
    } else {
      headers['Content-Type'] = 'application/json';
      if (typeof options.body === 'object') {
        options.body = JSON.stringify(options.body);
      }
    }

    const nextOptions: NextFetchRequestConfig = {};
    if (options.tags?.length) nextOptions.tags = options.tags;
    if (options.revalidate !== undefined) nextOptions.revalidate = options.revalidate;

    console.log('Full URL:', `${BASE_URL}${url}`);
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
      cache: options.cache,
      next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
    });

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      console.error('Unexpected content type:', contentType, text);
      throw new Error('Invalid response format');
    }

    const result = (await response.json()) as CommonResponseType<T>;

    if (!response.ok) {
      console.error('API Error:', result);
    }

    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      httpStatus: 'INTERNAL_SERVER_ERROR',
      isSuccess: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 500,
      result: null as T,
    };
  }
};

export const instance = {
  get: async <T>(url: string, options: Omit<RequestOptions, 'body' | 'method'> = {}) =>
    fetchInstance<T>(url, { method: 'GET', ...options }),

  post: async <T>(url: string, options: Omit<RequestOptions, 'method'> = {}) =>
    fetchInstance<T>(url, { method: 'POST', ...options }),

  patch: async <T>(url: string, options: Omit<RequestOptions, 'method'> = {}) =>
    fetchInstance<T>(url, { method: 'PATCH', ...options }),

  put: async <T>(url: string, options: Omit<RequestOptions, 'method'> = {}) =>
    fetchInstance<T>(url, { method: 'PUT', ...options }),

  delete: async <T>(url: string, options: Omit<RequestOptions, 'method'> = {}) =>
    fetchInstance<T>(url, { method: 'DELETE', ...options }),
};
