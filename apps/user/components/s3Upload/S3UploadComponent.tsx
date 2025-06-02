'use client';

import React, { useRef, useState } from 'react';
import { useS3Uploader } from '@/hooks/useS3Uploader';

interface UploadComponentProps {
  usage: 'profile' | 'reels' | 'feed' | 'chat';
}

export default function UploadComponent({ usage }: UploadComponentProps) {
  const [file, setFile] = useState<File | null>(null);
  const { uploadFile, uploading } = useS3Uploader();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;
    const url = await uploadFile(file, usage);
    if (url) {
      alert(`업로드 성공\n📎 URL: ${url}`);
      setFile(null);
    } else {
      alert('업로드 실패');
    }
  };

  return (
    <section className="space-y-4 rounded border bg-white p-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleSelect}
        className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
      >
        📂 파일 선택
      </button>

      {file && (
        <article className="text-sm text-gray-800">
          <p>📁 {file.name}</p>
          <p>📦 {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          <p>📄 {file.type}</p>
        </article>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`rounded px-4 py-2 text-white ${
          file && !uploading
            ? 'bg-blue-600 hover:bg-blue-500'
            : 'cursor-not-allowed bg-gray-400'
        }`}
      >
        {uploading ? '업로드 중…' : '🚀 업로드'}
      </button>
    </section>
  );
}
