import React from "react";

type SVGComponentProps = React.SVGProps<SVGSVGElement>;

export const CycleCompletedIcon = (props: SVGComponentProps) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="32" height="32" rx="16" fill="#2E7FF1" />
    <g clipPath="url(#clip0_1_1397)">
      <path
        d="M24.3512 10.1111C23.8097 9.56892 22.9305 9.56926 22.3883 10.1111L13.5541 18.9457L9.62765 15.0193C9.08547 14.4771 8.20662 14.4771 7.66444 15.0193C7.12227 15.5614 7.12227 16.4403 7.66444 16.9825L12.5723 21.8903C12.8432 22.1612 13.1984 22.297 13.5537 22.297C13.909 22.297 14.2646 22.1616 14.5355 21.8903L24.3512 12.0743C24.8934 11.5325 24.8934 10.6532 24.3512 10.1111Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_1397">
        <rect
          width="17.5"
          height="17.5"
          fill="white"
          transform="translate(7.25 7.25)"
        />
      </clipPath>
    </defs>
  </svg>
);
