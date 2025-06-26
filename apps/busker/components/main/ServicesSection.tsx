import { CalendarCheck, Heart, Guitar } from '@repo/ui/components/icons';

export default function ServicesSection() {
  return (
    <section className="bg-gray-800 py-16 ">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-6 ">
              <CalendarCheck className="w-10 h-10 text-gray-900" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">일정 관리</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              공연 일정과 공지를 관리하고 팬들에게 실시간으로 알려보세요. 간편한
              일정 등록과 자동 알림 기능을 제공합니다.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Guitar className="w-10 h-10 text-gray-900" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              라이브 스트리밍
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              공연 릴스와 사진을 쉽게 업로드하고 관리하세요. 쉬운 라이브
              스트리밍을 지원합니다.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-gray-900" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">팬 소통</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              팬들과의 소통을 강화하고 피드백을 실시간으로 확인하세요. 댓글,
              좋아요, 팔로우를 한눈에 파악할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
