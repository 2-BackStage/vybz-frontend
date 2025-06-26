import * as React from 'react';

export const TagDelete = ({
  width = 24,
  height = 24,
  ...props
}: {
  width?: number | string;
  height?: number | string;
} & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 12C3 11.6 3.1 11.2 3.3 10.9L8.2 5.4C8.6 5 9.1 4.8 9.6 4.8H20C21.1 4.8 22 5.7 22 6.8V17.2C22 18.3 21.1 19.2 20 19.2H9.6C9.1 19.2 8.6 19 8.2 18.6L3.3 13.1C3.1 12.8 3 12.4 3 12Z" />
    <line x1="12" y1="10" x2="16" y2="14" />
    <line x1="16" y1="10" x2="12" y2="14" />
  </svg>
);
