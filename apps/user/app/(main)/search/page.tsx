import SearchBar from '@/components/common/form/SearchBar';
import RecentSearch from '@/components/search/RecentSearch';
import SuggestedSection from '@/components/search/SuggestedSection';
import { SearchResultsData, RecentSearchesData } from '@/data/profileData';

export default function page() {
  // 검색어 입력 후 query string(`?q=...`)으로 검색 결과 표시
  // 결과는 실시간 fetch로 불러오며, 상태 관리는 zustand 사용

  return (
    <main className="min-h-screen px-4 pt-10 text-white font-poppins space-y-10">
      <SearchBar placeholder="Search artists, songs, genres..." />
      <RecentSearch data={RecentSearchesData} />
      <SuggestedSection data={SearchResultsData} />
    </main>
  );
}
