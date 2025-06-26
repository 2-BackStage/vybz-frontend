import * as React from 'react';

export const ChevronRight = ({
  height = '1em',
  fill = 'currentColor',
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
    <path
      fill={fill}
      d="M10.586 6.343L12 4.93L19.071 12L12 19.071l-1.414-1.414L16.243 12z"
    />
  </svg>
);
