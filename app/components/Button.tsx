import React from "react";
import { twMerge } from "tailwind-merge";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "bordered" | "text" | "icon";
  color?: "blue" | "gray" | "red" | "white";
  size?: "h-12" | "h-full" | "h-fit" | "auto";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isCollapsed?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "filled",
  color = "blue",
  size = "auto",
  icon,
  children,
  className,
  disabled,
  isCollapsed,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "rounded-lg transition-colors cursor-pointer focus:outline-none";

  const variantClasses = {
    filled: twMerge(
      color === "blue" && "bg-blue-500 text-white hover:bg-blue-600",
      color === "gray" && "bg-gray-500 text-white hover:bg-gray-600",
      color === "red" && "bg-red-500 text-white hover:bg-red-600",
      color === "white" && "bg-white text-gray-900 hover:bg-gray-100",
      disabled && "bg-gray-500 cursor-not-allowed"
    ),
    bordered: twMerge(
      color === "blue" &&
        "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
      color === "gray" &&
        "border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white",
      color === "red" &&
        "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
      color === "white" &&
        "border border-white text-white hover:bg-white hover:text-gray-900",
      disabled && "border-gray-500 text-gray-500 cursor-not-allowed"
    ),
    text: twMerge(
      color === "blue" && "text-blue-500 hover:text-blue-600",
      color === "gray" && "text-gray-400 hover:text-white",
      color === "red" && "text-red-500 hover:text-red-700",
      color === "white" && "text-white hover:text-gray-200",
      disabled && "text-gray-500 cursor-not-allowed"
    ),
    icon: twMerge(
      "flex items-center justify-center",
      color === "blue" && "border border-blue-500 text-white hover:opacity-70",
      color === "gray" && "text-gray-400 hover:text-white",
      color === "red" && "text-red-500 hover:text-red-700",
      color === "white" && "text-white hover:text-gray-200",
      size === "h-12" && "w-12 h-12",
      size === "auto" && "w-[3.25rem] h-12",
      disabled && "border-gray-500 text-gray-500 cursor-not-allowed"
    ),
  };

  const sizeClasses = {
    "h-12": "h-12",
    "h-full": "h-full",
    "h-fit": "h-fit",
    auto: "",
  };

  const contentClasses = twMerge(
    variant !== "icon" && "px-4 py-2 text-sm font-bold",
    variant === "filled" && color === "blue" && "bg-mainBlue",
    variant === "bordered" &&
      color === "blue" &&
      "text-defaultBlue border-defaultBlue",
    disabled && "bg-gray-500 cursor-not-allowed"
  );

  const iconClasses = twMerge(
    isCollapsed !== undefined &&
      "transition-transform duration-300 ease-in-out",
    isCollapsed && "rotate-180",
    !isCollapsed && "rotate-0"
  );

  return (
    <button
      type={type}
      className={twMerge(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        contentClasses,
        variant === "icon" && iconClasses,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && (
        <span className={variant === "icon" ? iconClasses : ""}>{icon}</span>
      )}
      {children && <span>{children}</span>}
    </button>
  );
};

export default CustomButton;
