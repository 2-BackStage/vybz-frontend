'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@repo/ui';
import { Search } from 'lucide-react';

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');

  // URL 쿼리 파라미터가 변경될 때 입력값 업데이트
  useEffect(() => {
    const queryKeyword = searchParams.get('q') || '';
    setKeyword(queryKeyword);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search?q=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleClear = () => {
    setKeyword('');
    router.push('/search');
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="버스커, 릴스, 해시태그를 검색해보세요..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="ml-2 flex gap-2">
          <Button type="submit" disabled={!keyword.trim()}>
            검색
          </Button>
          {keyword && (
            <Button type="button" variant="outline" onClick={handleClear}>
              초기화
            </Button>
          )}
        </div>
      </div>
    </form>
  );
} 