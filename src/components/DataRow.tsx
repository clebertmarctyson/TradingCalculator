interface DataRowProps {
  label: string;
  value: string;
  prefix?: string;
}

export const DataRow = ({ label, value, prefix = "" }: DataRowProps) => {
  const copyValue = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="flex justify-between items-center py-2 px-3 bg-gray-700 rounded-md mb-2">
      <span className="text-gray-300">{label}:</span>
      <div className="flex items-center space-x-2">
        <span className="text-gray-200">
          {prefix}
          {value}
        </span>
        <button
          onClick={copyValue}
          className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          Copy
        </button>
      </div>
    </div>
  );
};
