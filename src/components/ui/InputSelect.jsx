import React from "react";

function InputSelect({
  label,
  value,
  handleChange,
  name,
  options = [],
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-200"
      >
        {label}
      </label>
      <div>
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="block w-full p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((item) => (
            <option key={item} className="text-black" value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputSelect;
