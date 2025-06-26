import { Phone, Mail, Globe } from '@repo/ui/components/icons';

export default function MainFooter() {
  return (
    <footer className="bg-blue-300 py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-6xl font-bold text-gray-900 mb-4">+82 123 456789</p>
        <p className="text-2xl font-semibold text-gray-800 mb-8">
          VYBZ BUSKER PLATFORM
        </p>
        <div className="flex justify-center space-x-8 text-gray-700">
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <p>전화 문의</p>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <p>이메일 지원</p>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <p>온라인 상담</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
