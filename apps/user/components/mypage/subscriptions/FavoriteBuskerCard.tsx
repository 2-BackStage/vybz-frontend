import { Button } from '@repo/ui/components/ui';

// 날짜 포맷팅 함수
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '날짜 정보 없음';
    }
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('날짜 포맷팅 오류:', error);
    return '날짜 정보 없음';
  }
};

export default function FavoriteBuskerCard({
  name,
  displayText,
  registrationDate,
}: {
  name: string;
  displayText: string;
  registrationDate: string;
}) {
  return (
    <section className="mt-96 p-6 text-center mx-4 font-bold space-y-2">
      <p className="text-xl text-gray-300">나의 최애 Busker</p>
      <h3 className="text-6xl mb-4">{name}</h3>

      <p className="text-base text-orange-300">
        🔥 {displayText} 찐팬으로 응원 중!
      </p>
      <p className="text-sm text-gray-400">최애 등록일: {formatDate(registrationDate)}</p>
      <Button className="mt-2 bg-[#735DF8] text-sm py-5 px-6 rounded-lg transition">
        응원 메시지 보내기
      </Button>
    </section>
  );
}
