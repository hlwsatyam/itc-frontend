import React from "react";

function InputLabelTab({ placeholder, label, value, handleChange, name }) {
  return (
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-200">
        {label}
      </label>
      <input
        id="name"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
        required
      />
    </div>
  );
}

export default InputLabelTab;
