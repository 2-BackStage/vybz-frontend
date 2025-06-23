import { Input } from '@repo/ui/components/ui/input';
import { ComponentProps } from 'react';

interface InputBoxProps extends ComponentProps<typeof Input> {
  label: string;
  id: string;
  className?: string;
}

export default function InputBox({
  label,
  id,
  className = '',
  placeholder = '',
  ...props
}: InputBoxProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-400 text-sm mb-1">
        {label}
      </label>
      <Input
        id={id}
        placeholder={placeholder}
        className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 h-10 ${className}`}
        {...props}
      />
    </div>
  );
}
