"use client";
import { useState, useEffect } from "react";
import { Search, X, Grid3X3, User } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { searchReels, searchHashtags, searchBuskers } from "../../../lib/api/search";
import { useSearchStore } from "../../../lib/store/searchStore";

export default function SearchPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState("인물");
  const [searchQuery, setSearchQuery] = useState("");
  const [recent, setRecent] = useState(["카리나", "이지은", "윈터"]);

  const {
    keyword,
    reels,
    hashtags,
    buskers,
    isLoadingReels,
    isLoadingHashtags,
    isLoadingBuskers,
    hasNextReels,
    hasNextBuskers,
    setKeyword,
    setReels,
    setHashtags,
    setBuskers,
    setLoadingReels,
    setLoadingHashtags,
    setLoadingBuskers,
    setHasNextReels,
    setHasNextBuskers,
    clearResults,
  } = useSearchStore();

  const suggestedArtists = [
    { name: "카리나", image: "" },
    { name: "이지은", image: "" },
    { name: "윈터", image: "" },
  ];

  // 검색어가 변경될 때마다 API 호출
  useEffect(() => {
    if (keyword.trim()) {
      setSearchQuery(keyword);
      setIsSearching(true);
    } else {
      setIsSearching(false);
      clearResults();
    }
  }, [keyword, clearResults]);

  // 릴스 검색 쿼리
  const reelsQuery = useQuery({
    queryKey: ['search-reels', keyword],
    queryFn: () => searchReels({ keyword, size: 20 }),
    enabled: !!keyword.trim() && activeTab === "릴스",
  });

  // 해시태그 검색 쿼리
  const hashtagsQuery = useQuery({
    queryKey: ['search-hashtags', keyword],
    queryFn: () => searchHashtags({ keyword, size: 20 }),
    enabled: !!keyword.trim() && activeTab === "태그",
  });

  // 버스커 검색 쿼리
  const buskersQuery = useQuery({
    queryKey: ['search-buskers', keyword],
    queryFn: () => searchBuskers({ keyword, size: 20 }),
    enabled: !!keyword.trim() && activeTab === "인물",
  });

  // 쿼리 결과 처리
  useEffect(() => {
    if (reelsQuery.data) {
      setReels(reelsQuery.data.result.content);
      setHasNextReels(reelsQuery.data.result.hasNext);
    }
  }, [reelsQuery.data, setReels, setHasNextReels]);

  useEffect(() => {
    if (hashtagsQuery.data) {
      setHashtags(hashtagsQuery.data.result);
    }
  }, [hashtagsQuery.data, setHashtags]);

  useEffect(() => {
    if (buskersQuery.data) {
      setBuskers(buskersQuery.data.result.content);
      setHasNextBuskers(buskersQuery.data.result.hasNext);
    }
  }, [buskersQuery.data, setBuskers, setHasNextBuskers]);

  // 에러 처리
  useEffect(() => {
    if (reelsQuery.error) {
      console.error('릴스 검색 실패:', reelsQuery.error);
      setReels([]);
      setHasNextReels(false);
    }
  }, [reelsQuery.error, setReels, setHasNextReels]);

  useEffect(() => {
    if (hashtagsQuery.error) {
      console.error('해시태그 검색 실패:', hashtagsQuery.error);
      setHashtags([]);
    }
  }, [hashtagsQuery.error, setHashtags]);

  useEffect(() => {
    if (buskersQuery.error) {
      console.error('버스커 검색 실패:', buskersQuery.error);
      setBuskers([]);
      setHasNextBuskers(false);
    }
  }, [buskersQuery.error, setBuskers, setHasNextBuskers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setKeyword(value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setKeyword(searchQuery);
      // 최근 검색어에 추가
      if (!recent.includes(searchQuery)) {
        setRecent([searchQuery, ...recent.slice(0, 4)]);
      }
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleRecentSearch = (searchTerm: string) => {
    setKeyword(searchTerm);
    setSearchQuery(searchTerm);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Search Bar */}
      <div className="p-4 pt-12">
        <div className="relative">
          <Input
            placeholder="Search artists, songs, genres..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="bg-[#2a2a2a] border-none rounded-full pl-6 pr-16 py-4 text-gray-300 placeholder:text-gray-500 focus:ring-0 focus:ring-offset-0"
          />
          <Button
            size="icon"
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 rounded-full w-10 h-10"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {isSearching && (
        <div className="px-4 mb-20">
          {/* Search Tabs */}
          <div className="flex space-x-1 mb-6 bg-[#2a2a2a] rounded-full p-1">
            {["태그", "인물", "릴스"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab ? "bg-white text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {(reelsQuery.isLoading || hashtagsQuery.isLoading || buskersQuery.isLoading) && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}

          {/* Search Results Content */}
          {activeTab === "태그" && !hashtagsQuery.isLoading && (
            <div className="space-y-3">
              {hashtags.length > 0 ? (
                hashtags.map((hashtag, index) => (
                  <div key={index} className="flex items-center space-x-4 py-3">
                    <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 font-bold">#</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">#{hashtag.tagName}</h3>
                      <p className="text-gray-400 text-sm">{Math.floor(Math.random() * 1000)}K posts</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          )}

          {activeTab === "인물" && !buskersQuery.isLoading && (
            <div className="space-y-4">
              {buskers.length > 0 ? (
                buskers.map((busker, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      {busker.profileImageUrl && (
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600">
                          <Image
                            src={busker.profileImageUrl}
                            alt={busker.nickname}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-white font-medium text-sm">{busker.nickname}</h3>
                        <p className="text-gray-400 text-xs">
                          {busker.followerCount ? busker.followerCount.toLocaleString() : '0'} followers
                        </p>
                      </div>
                    </div>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1 rounded-full text-xs font-medium"
                    >
                      Follow
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          )}

          {activeTab === "릴스" && !reelsQuery.isLoading && (
            <div className="grid grid-cols-3 gap-1">
              {reels.length > 0 ? (
                reels.map((reel, index) => (
                  <div key={index} className="aspect-[3/4] relative rounded-lg overflow-hidden bg-[#2a2a2a]">
                    {reel.thumbnailUrl && (
                      <Image 
                        src={reel.thumbnailUrl}
                        alt={`Reel ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-black/50 rounded flex items-center justify-center">
                        <div
                          className="w-3 h-3 border-l-2 border-white border-l-white ml-1"
                          style={{ borderTop: "6px solid transparent", borderBottom: "6px solid transparent" }}
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                      {Math.floor(Math.random() * 999)}K
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-400">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!isSearching && (
        <>
          {/* Recent Searches */}
          <div className="px-4 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recent Searches</h2>
              <Button 
                variant="ghost" 
                className="text-purple-400 hover:text-purple-300 p-0"
                onClick={() => setRecent([])}
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-3">
              {recent.map((search, index) => (
                <div key={index} className="flex items-center justify-between bg-[#2a2a2a] rounded-2xl px-6 py-4">
                  <span 
                    className="text-white font-medium cursor-pointer"
                    onClick={() => handleRecentSearch(search)}
                  >
                    {search}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-400 hover:text-white h-6 w-6"
                    onClick={() => setRecent(recent.filter(r => r !== search))}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested For You */}
          <div className="px-4 mb-20">
            <h2 className="text-2xl font-bold mb-6">Suggested For You</h2>

            <div className="grid grid-cols-2 gap-4">
              {suggestedArtists.map((artist, index) => (
                <div key={index} className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#2a2a2a]">
                  {artist.image && (
                    <Image src={artist.image} alt={artist.name} fill className="object-cover" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">{artist.name}</h3>
                  </div>
                </div>
              ))}

              {/* Third item in single column */}
              <div className="col-span-2">
                <div className="relative rounded-2xl overflow-hidden aspect-[2/1] bg-[#2a2a2a] max-w-[50%]">
                  <Image src="/artist-image.png" alt="윈터" fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">윈터</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#2a2a2a]">
        <div className="flex justify-around items-center py-3">
          <Button variant="ghost" size="icon" className="text-gray-400">
            <div
              className="w-6 h-6 bg-gray-400 rounded"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)" }}
            />
          </Button>

          <Button size="icon" className="bg-blue-500 hover:bg-blue-600 rounded-full w-12 h-12">
            <Search className="w-6 h-6" />
          </Button>

          <Button variant="ghost" size="icon" className="text-gray-400">
            <Grid3X3 className="w-6 h-6" />
          </Button>

          <Button variant="ghost" size="icon" className="text-gray-400">
            <User className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
