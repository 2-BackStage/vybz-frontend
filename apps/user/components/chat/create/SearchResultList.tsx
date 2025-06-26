'use client';

import { useEffect, useState } from 'react';
import { getSearchResults } from '@/services/chat-services';
import UserCard from '@/components/common/card/UserCard';
import { FollowingDataType } from '@/types/ResponseDataTypes';
import SearchSpinner from '@/components/common/spinners/SearchSpinner';
import NoSearchBox from './NoSearchBox';

export default function SearchResultList({
  searchResults,
  initialData,
}: {
  searchResults?: string;
  initialData: FollowingDataType[];
}) {
  const [results, setResults] = useState<FollowingDataType[]>(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchResults) {
      setResults(initialData);
      setLoading(false);
      return;
    }
    setLoading(true);
    getSearchResults(searchResults)
      .then((data) => setResults(Array.isArray(data) ? data : []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [searchResults, initialData]);

  return (
    <section className="mt-10 space-y-6 text-white">
      {loading ? (
        <SearchSpinner size={10} color="white" classname="px-3" />
      ) : searchResults === '' ? (
        <>
          <h2 className="text-xl font-semibold mb-7">추천</h2>
          {initialData.map((result) => (
            <UserCard
              key={result.buskerUuid}
              name={result.nickname}
              image={result.profileImageUrl}
              buskerId={result.buskerUuid}
            />
          ))}
        </>
      ) : results.length === 0 ? (
        <NoSearchBox />
      ) : (
        results.map((result) => (
          <UserCard
            key={result.buskerUuid}
            name={result.nickname}
            image={result.profileImageUrl}
            buskerId={result.buskerUuid}
          />
        ))
      )}
    </section>
  );
}
