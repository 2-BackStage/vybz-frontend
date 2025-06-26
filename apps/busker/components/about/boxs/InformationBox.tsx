'use client';

import { Input } from '@repo/ui/components/ui/input';

export default function InformationBox({
  initialEmail,
  initialPhone,
}: {
  initialEmail: string;
  initialPhone: string;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-blue-300 font-medium">연락처 정보</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">이메일</label>
          <Input
            type="email"
            placeholder={initialEmail}
            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-10"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">전화번호</label>
          <Input
            placeholder={initialPhone}
            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-10"
          />
        </div>
      </div>
    </div>
  );
}
