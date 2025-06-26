import * as React from 'react';

export const SmileIcon = ({
  width = 24,
  height = 24,
  stroke = 'currentColor',
  strokeWidth = 2,
  ...props
}: {
  width?: number | string;
  height?: number | string;
  stroke?: string;
  strokeWidth?: number;
} & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 15s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);
export const Smile = React.memo(SmileIcon);
