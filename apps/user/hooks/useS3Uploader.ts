import { useState } from 'react';

interface UseS3UploaderParams {
  /** Spring Boot presign 엔드포인트 */
  presignUrl?: string;
  /** 업로드 완료 보고 엔드포인트 */
  completeUrl?: string;
}

export function useS3Uploader({
  presignUrl = `${process.env.NEXT_PUBLIC_API_URL}/files/presign`,
  completeUrl = `${process.env.NEXT_PUBLIC_API_URL}/files/complete`,
}: UseS3UploaderParams = {}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadFile = async (
    file: File,
    usage: 'profile' | 'reels' | 'feed' | 'chat'
  ): Promise<string | null> => {
    try {
      // presign URL 요청 : 업로드할 위치, 파일 ID 받기
      const { uploadUrl, fileUrl, fileId } = await fetch(presignUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileType: file.type, usage }),
      }).then((res) => res.json());

      // 실제 S3 업로드
      const s3Res = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      if (!s3Res.ok) throw new Error('S3 업로드 실패');

      // 업로드 완료 보고
      await fetch(completeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileId,
          usage,
          size: file.size,
        }),
      });

      return fileUrl;
    } catch {
      return null;
    }
  };

  return { uploadFile, uploading, error };
}
