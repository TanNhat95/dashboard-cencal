import React from "react";

type SVGComponentProps = React.SVGProps<SVGSVGElement>;

export const BackLinkIcon = (props: SVGComponentProps) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="32" height="32" rx="8" fill="#212226" />
    <path
      d="M22.875 16H9.125"
      stroke="#858585"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.75 10.375L9.125 16L14.75 21.625"
      stroke="#858585"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
