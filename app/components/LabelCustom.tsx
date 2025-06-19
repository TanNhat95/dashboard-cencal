import React from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
  classNames?: {
    label?: string;
    required?: string;
  };
}

const Label: React.FC<LabelProps> = ({
  children,
  required,
  classNames = {},
}) => {
  return (
    <label
      className={twMerge(
        "block text-sm font-medium text-white mb-1",
        classNames.label
      )}
    >
      {children}
      {required && (
        <span className={twMerge("text-error ml-1", classNames.required)}>
          *
        </span>
      )}
    </label>
  );
};

export default Label;
