'use client';

import InputBox from '@/components/common/InputBox';
import { FormContext } from '@/context/FormContext';
import { use } from 'react';

export default function NameBox() {
  const { artistName, setArtistName } = use(FormContext);
  return (
    <>
      <InputBox
        id="nickname"
        label="nickname"
        placeholder="nickname"
        defaultValue={artistName}
        className="h-12"
        onChange={(e) => setArtistName?.(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      />
      <input type="hidden" name="nickname" value={artistName} />
    </>
  );
}
