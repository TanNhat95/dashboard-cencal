import React from "react";

type SVGComponentProps = React.SVGProps<SVGSVGElement>;

export const ProposalsIcon = (props: SVGComponentProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.875 3.125H3.125"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.625 13.75V6.25C15.625 5.90482 15.3452 5.625 15 5.625H11.875C11.5298 5.625 11.25 5.90482 11.25 6.25V13.75C11.25 14.0952 11.5298 14.375 11.875 14.375H15C15.3452 14.375 15.625 14.0952 15.625 13.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.125 5.625H5C4.65482 5.625 4.375 5.90482 4.375 6.25V16.875C4.375 17.2202 4.65482 17.5 5 17.5H8.125C8.47018 17.5 8.75 17.2202 8.75 16.875V6.25C8.75 5.90482 8.47018 5.625 8.125 5.625Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
