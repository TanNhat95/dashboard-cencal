import React from "react";

type SVGComponentProps = React.SVGProps<SVGSVGElement>;

export const ContactsIcon = (props: SVGComponentProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 12.5C12.7614 12.5 15 10.2614 15 7.5C15 4.73858 12.7614 2.5 10 2.5C7.23858 2.5 5 4.73858 5 7.5C5 10.2614 7.23858 12.5 10 12.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.42188 16.875C3.18979 15.5447 4.2944 14.4399 5.62465 13.6718C6.9549 12.9037 8.46392 12.4993 10 12.4993C11.5361 12.4993 13.0451 12.9037 14.3753 13.6718C15.7056 14.4399 16.8102 15.5447 17.5781 16.875"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
