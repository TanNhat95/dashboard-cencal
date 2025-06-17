import React from "react";

type SVGComponentProps = React.SVGProps<SVGSVGElement>;

export const CycleIcon = (props: SVGComponentProps) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="0.8"
      y="0.8"
      width="30.4"
      height="30.4"
      rx="15.2"
      stroke="#EFEFEF"
      strokeWidth="1.6"
    />
  </svg>
);
