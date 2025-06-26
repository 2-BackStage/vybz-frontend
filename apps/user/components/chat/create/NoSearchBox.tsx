import { SearchX } from '@repo/ui/components/icons';

export default function NoSearchBox() {
  return (
    <div className="text-center">
      <SearchX width={100} height={100} xColor="red" className="mx-auto" />
      <h2 className="text-2xl font-semibold mt-4">검색 결과 없음</h2>
      <p className="text-sm text-gray-400 mt-4">
        맞춤법을 다시 확인하거나 다른 검색어를 사용해보세요. 완전한 형태의
        단어를 입력할 때 검색 결과가 가장 좋습니다.
      </p>
    </div>
  );
}
