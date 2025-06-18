import React from "react";
import { Controller, FieldValues, Control, Path } from "react-hook-form";

interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

const Select = <T extends FieldValues>({
  name,
  control,
  placeholder,
  options,
  disabled,
}: SelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative">
          <select
            {...field}
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
            className="appearance-none w-full text-bg400 px-4 py-3 bg-grayScale600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 cursor-pointer"
            disabled={disabled}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.96l3.71-3.73a.75.75 0 011.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
            </svg>
          </div>
        </div>
      )}
    />
  );
};

export default Select;
