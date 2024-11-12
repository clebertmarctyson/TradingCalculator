interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}

export const InputField = ({
  label,
  value,
  onChange,
  step = 0.01,
}: InputFieldProps) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-gray-200">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      step={step}
      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-200"
    />
  </div>
);
