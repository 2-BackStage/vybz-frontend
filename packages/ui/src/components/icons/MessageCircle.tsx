import * as React from 'react';

export const MessageCircle = ({
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
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    transform="scale(-1,1)"
    {...props}
  >
    <path d="M21 11.5c0 4.694-4.03 8.5-9 8.5-1.547 0-3-.357-4.29-1l-4.21 1 1.12-3.65A8.49 8.49 0 0 1 3 11.5C3 6.806 7.03 3 12 3s9 3.806 9 8.5z" />
  </svg>
);
