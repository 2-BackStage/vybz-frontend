import SearchBar from '@/components/chat/create/SearchBar';
import SearchResultList from '@/components/chat/create/SearchResultList';
import { InitialChatSearchData } from '@/data/chatData';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = Array.isArray(params.q) ? params.q[0] : (params.q ?? '');

  return (
    <main className="px-4 mt-20">
      <SearchBar initialQuery={q} />
      <SearchResultList searchResults={q} initialData={InitialChatSearchData} />
    </main>
  );
}
