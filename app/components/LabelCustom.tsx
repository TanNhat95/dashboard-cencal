import React from "react";

interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ children, required }) => {
  return (
    <label className="block text-sm font-medium text-white mb-1">
      {children}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  );
};

export default Label;
