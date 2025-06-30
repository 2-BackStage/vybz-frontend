'use client';
import { useSearchParams, useRouter } from 'next/navigation';

export default function FailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-8 flex flex-col items-center">
        <button
          className="absolute right-4 top-4 text-gray-400 text-2xl hover:text-gray-600"
          onClick={() => router.replace('/mypage')}
          aria-label="닫기"
        >
          ×
        </button>
        <div className="bg-red-400 rounded-full p-4 mb-4">
          <svg width="48" height="48" fill="none"><circle cx="24" cy="24" r="24" fill="#f87171"/><path d="M16 16l16 16M32 16L16 32" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">결제에 실패하였습니다.</h2>
        <div className="w-full bg-gray-50 border rounded-xl p-6 mb-6">
          <p className="text-gray-500 font-semibold mb-1">에러코드 :</p>
          <p className="text-lg font-bold text-gray-700 mb-2">{code || '-'}</p>
          <p className="text-gray-500 font-semibold mb-1">에러메시지 :</p>
          <p className="text-lg font-bold text-gray-700">{message || '-'}</p>
        </div>
        <button
          onClick={() => router.replace('/mypage')}
          className="w-full border border-red-400 text-red-600 font-bold py-3 rounded-xl hover:bg-red-50 transition"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}