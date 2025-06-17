import React from "react";

type SVGComponentProps = React.SVGProps<SVGSVGElement>;

export const CycleCheckedIcon = (props: SVGComponentProps) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="1.875"
      y="1.875"
      width="28.25"
      height="28.25"
      rx="14.125"
      stroke="#2E7FF1"
      strokeWidth="3.75"
    />
    <circle cx="16" cy="16" r="8" fill="#2E7FF1" />
  </svg>
);
