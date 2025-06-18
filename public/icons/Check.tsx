import React from "react";

type SVGComponentProps = React.SVGProps<SVGSVGElement>;

export const CheckIcon = (props: SVGComponentProps) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="2.5" y="2.5" width="20" height="20" rx="2" fill="#2E7FF1" />
    <path
      d="M17.6804 8.60437C17.3442 8.29179 16.7983 8.29199 16.4617 8.60437L10.9766 13.6978L8.53877 11.4341C8.20215 11.1215 7.65648 11.1215 7.31985 11.4341C6.98323 11.7467 6.98323 12.2534 7.31985 12.566L10.367 15.3955C10.5353 15.5517 10.7558 15.63 10.9764 15.63C11.197 15.63 11.4178 15.5519 11.586 15.3955L17.6804 9.73621C18.017 9.42384 18.017 8.91694 17.6804 8.60437Z"
      fill="white"
    />
  </svg>
);
