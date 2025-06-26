import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';

function generateS3Key({
  type,
  userUuid,
  originalName,
}: {
  type: string;
  userUuid: string;
  originalName: string;
}): string {
  const ext = originalName.split('.').pop() || 'bin';
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const uuid = (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 10));
  return `uploads/${type}/${date}/${userUuid}-${uuid}.${ext}`;
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { type, userUuid, originalName, fileType, fileContent } = await req.json();
    const s3Key = generateS3Key({ type, userUuid, originalName });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: s3Key,
      Body: Buffer.from(fileContent, 'base64'),
      ContentType: fileType,
    };
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
    return NextResponse.json({ imageUrl, s3Key });
  } catch (error) {
    console.error('S3 Upload Error:', error);
    return NextResponse.json(
      { error: 'S3 업로드 실패', detail: (error as Error).message },
      { status: 500 }
    );
  }
}
