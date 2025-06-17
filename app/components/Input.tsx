import React from "react";
import { Controller, FieldValues, Control, Path } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder: string;
  disabled?: boolean;
}

const Input = <T extends FieldValues>({
  name,
  control,
  placeholder,
  disabled,
}: InputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          value={field.value || ""}
          className="px-4 py-3 bg-grayScale600 text-white rounded-lg h-12 w-full"
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    />
  );
};

export default Input;
