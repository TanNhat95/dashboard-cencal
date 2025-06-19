import React from "react";
import { Controller, FieldValues, Control, Path } from "react-hook-form";

import { twMerge } from "tailwind-merge";

interface CustomContactSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder: string;
  onClick: () => void;
  disabled?: boolean;
  classNames?: {
    wrapper?: string;
    content?: string;
    iconWrapper?: string;
    icon?: string;
  };
}

const CustomContactSelect = <T extends FieldValues>({
  name,
  control,
  placeholder,
  onClick,
  disabled,
  classNames = {},
}: CustomContactSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div
          className={twMerge(
            "relative w-full text-white px-4 py-3 bg-grayScale600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 cursor-pointer",
            classNames.wrapper
          )}
          onClick={(e) => {
            e.preventDefault();
            if (!disabled) onClick();
          }}
        >
          <span className={twMerge("text-grayScale400", classNames.content)}>
            {field.value || placeholder}
          </span>
          <div
            className={twMerge(
              "pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400",
              classNames.iconWrapper
            )}
          >
            <svg
              className={twMerge("h-4 w-4", classNames.icon)}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.96l3.71-3.73a.75.75 0 011.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
            </svg>
          </div>
        </div>
      )}
    />
  );
};

export default CustomContactSelect;
