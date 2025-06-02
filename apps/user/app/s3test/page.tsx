import S3UploadComponent from '@/components/s3Upload/S3UploadComponent';

export default function S3UploadTestPage() {
  return (
    <main className="p-10 bg-amber-50">
      <h1 className="text-xl font-bold mb-4">S3 파일 업로드 테스트</h1>
      <S3UploadComponent usage="reels" />
    </main>
  );
}
