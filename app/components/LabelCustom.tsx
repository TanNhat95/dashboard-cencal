interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
}

const Label = ({ children, required }: LabelProps) => (
  <label className="block text-sm font-medium mb-2">
    {children}
    {required && <span className="text-error ml-1">*</span>}
  </label>
);

export default Label;
