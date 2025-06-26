'use client';

import { useState, useRef, useEffect, useCallback, ChangeEvent } from 'react';

export default function TextareaUploader({
  defaultValue = '',
  className = '',
  initialRows = 2,
  maxLength = 150,
  name = 'introduction',
  id = 'intro',
  placeholder = '자기소개를 입력하세요',
}: {
  defaultValue?: string;
  className?: string;
  initialRows?: number;
  maxLength?: number;
  name?: string;
  id?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
    },
    []
  );

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    if (textareaRef.current && defaultValue) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [defaultValue]);

  return (
    <section
      className={`relative w-full rounded-xl bg-div-background px-4 py-3 text-left text-indigo-200 ${className}`}
    >
      <p className="text-sm mb-1">소개</p>
      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        rows={initialRows}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={handleChange}
        className="w-full bg-transparent text-lg font-semibold focus:outline-none resize-none overflow-hidden"
      />
      <div className="absolute bottom-2 right-3 text-xs text-neutral-400">
        {value.length}/{maxLength}
      </div>
    </section>
  );
}
