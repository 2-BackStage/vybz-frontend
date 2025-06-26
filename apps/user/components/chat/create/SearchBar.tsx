'use client';

import { Input } from '@repo/ui/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchBar({
  initialQuery = '',
}: {
  initialQuery?: string;
}) {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = value.trim();
    if (query) {
      router.push(`?q=${encodeURIComponent(query)}`);
    } else {
      router.push('?');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 px-4 py-2 bg-div-background rounded-md text-white"
    >
      <label className="whitespace-nowrap">받는 사람 :</label>
      <Input
        type="text"
        placeholder="검색"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent px-0"
      />
    </form>
  );
}
