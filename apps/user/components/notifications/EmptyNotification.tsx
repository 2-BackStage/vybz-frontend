export default function EmptyNotification() {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <p className="text-2xl">🔔</p>
      </div>
      <p className="text-lg font-medium text-white mb-1">알림이 없습니다</p>
      <p className="text-gray-500 text-sm">
        새로운 알림이 오면 여기에 표시됩니다
      </p>
    </section>
  );
}
