import React from "react";

type SVGComponentProps = React.SVGProps<SVGSVGElement>;

export const CancelRedIcon = (props: SVGComponentProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.46967 6.46967C6.76256 6.17678 7.23744 6.17678 7.53033 6.46967L12 10.9393L16.4697 6.46967C16.7626 6.17678 17.2374 6.17678 17.5303 6.46967C17.8232 6.76256 17.8232 7.23744 17.5303 7.53033L13.0607 12L17.5303 16.4697C17.8232 16.7626 17.8232 17.2374 17.5303 17.5303C17.2374 17.8232 16.7626 17.8232 16.4697 17.5303L12 13.0607L7.53033 17.5303C7.23744 17.8232 6.76256 17.8232 6.46967 17.5303C6.17678 17.2374 6.17678 16.7626 6.46967 16.4697L10.9393 12L6.46967 7.53033C6.17678 7.23744 6.17678 6.76256 6.46967 6.46967Z"
      fill="#FA1717"
    />
  </svg>
);
