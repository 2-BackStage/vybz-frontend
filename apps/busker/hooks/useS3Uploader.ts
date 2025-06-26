'use client';

import { useState } from 'react';

export interface UseS3UploaderOptions {
  apiUrl?: string;
  headers?: Record<string, string>;
  onSuccess?: (url: string, response: unknown ) => void;
  onError?: (error: Error) => void;
  validateFile?: (file: File) => boolean | Promise<boolean>;
}

export interface S3UploadMeta {
  type: string;
  userUuid: string;
  originalName: string;
  fileType: string;
}

export interface S3UploadResult {
  url: string;
  response: unknown ;
}

export function useS3Uploader(options: UseS3UploaderOptions = {}) {
  const { apiUrl = '/api/s3Handler', headers = {}, onSuccess, onError, validateFile } = options;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadFile = async (
    file: File,
    meta: S3UploadMeta
  ): Promise<S3UploadResult | null> => {
    if (validateFile) {
      const isValid = await validateFile(file);
      if (!isValid) {
        const err = new Error('유효하지 않은 파일입니다.');
        setError(err);
        onError?.(err);
        return null;
      }
    }
    setUploading(true);
    setError(null);
    try {
      const base64Content = await toBase64(file);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify({
          ...meta, 
          fileContent: base64Content,
        }),
      });
      if (!response.ok) {
        const err = new Error('S3 업로드 실패');
        setError(err);
        onError?.(err);
        return null;
      }
      const data = await response.json();
      const imageUrl: string | undefined = data.imageUrl;
      if (!imageUrl) {
        const err = new Error('업로드 응답에 imageUrl이 포함되어 있지 않습니다.');
        setError(err);
        onError?.(err);
        return null;
      }
      onSuccess?.(imageUrl, data);
      return { url: imageUrl, response: data };
    } catch (err) {
      setError(err as Error);
      onError?.(err as Error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, error, uploadFile };
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        const parts = result.split(',');
        if (parts.length === 2 && parts[1]) {
          resolve(parts[1]);
        } else {
          reject(new Error('base64 형식이 올바르지 않습니다.'));
        }
      } else {
        reject(new Error('파일을 base64 문자열로 변환할 수 없습니다.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('파일 읽기 오류'));
    };
  });
}
