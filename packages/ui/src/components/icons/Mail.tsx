import * as React from 'react';

export const Mail = ({
  height = '1em',
  strokeWidth = '2',
  fill = 'none',
  focusable = 'false',
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, 'children'>) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}
  >
    <g
      fill={fill}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </g>
  </svg>
);
