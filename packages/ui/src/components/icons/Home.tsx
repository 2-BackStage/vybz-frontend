import * as React from 'react';

export const Home = ({
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
    <path d="M3 9.5L12 3l9 6.5" />
    <path d="M9 22V12h6v10" />
    <path d="M3 9.5V22h18V9.5" />
  </svg>
);
