import * as React from 'react';

export const SearchX = ({
  height = '1em',
  strokeWidth = '2',
  fill = 'none',
  focusable = 'false',
  xColor = 'currentColor',
  circleColor = 'currentColor',
  lineColor = 'currentColor',
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, 'children'> & {
  xColor?: string;
  circleColor?: string;
  lineColor?: string;
}) => (
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
      stroke={xColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      <path d="m13.5 8.5l-5 5" />
      <path d="m8.5 8.5l5 5" />
    </g>
    <circle
      cx="11"
      cy="11"
      r="8"
      fill={fill}
      stroke={circleColor}
      strokeWidth={strokeWidth}
    />

    <path
      d="m21 21l-4.3-4.3"
      fill={fill}
      stroke={lineColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
