export function RecentBox() {
  return (
    <div>
      <h3 className="text-blue-300 font-semibold mb-3 text-lg">
        최근 활동
      </h3>
      <div className="space-y-3">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-white text-sm font-medium">
            새 영상 업로드
          </div>
          <div className="text-gray-400 text-xs">2시간 전</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-white text-sm font-medium">
            홍대 공연 완료
          </div>
          <div className="text-gray-400 text-xs">1일 전</div>
        </div>
      </div>
    </div>
  );
}
