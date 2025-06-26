'use client';

import { Textarea } from '@repo/ui/components/ui/textarea';
import { FormContext } from '@/context/FormContext';
import { use } from 'react';

export default function Description() {
  const { artistDescription, setArtistDescription } = use(FormContext);

  return (
    <section>
      <label className="block text-blue-300 text-lg font-semibold mb-2">
        자기소개
      </label>
      <Textarea
        placeholder="자기소개를 작성해주세요..."
        defaultValue={artistDescription}
        rows={4}
        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
        onChange={(e) => setArtistDescription(e.target.value)}
      />
      <input type="hidden" name="introduction" value={artistDescription} />
    </section>
  );
}
