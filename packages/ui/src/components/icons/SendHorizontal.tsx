import * as React from 'react';

export const SendHorizontal = ({
  width = 24,
  height = 24,
  fill = 'white',
  ...props
}: {
  width?: number | string;
  height?: number | string;
  fill?: number | string;
} & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <defs>
      <mask id="cut-middle-line">
        <path d="M22 12L2 20L7 12L2 4L22 12Z" fill="white" />
        <path
          d="M10 12H14"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </mask>
    </defs>

    <path
      d="M22 12L2 20L7 12L2 4L22 12Z"
      fill={fill}
      mask="url(#cut-middle-line)"
    />
  </svg>
);
