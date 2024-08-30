import React from "react";

function InputCheckBoxYesOrNo({
  placeholder,
  label,
  value,
  handleChange,
  name,
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
        <input
          type="radio"
          id={`${name}-yes`}
          name={name}
          value="yes"
          checked={value === "yes"}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor={`${name}-yes`} className="mr-4 text-white">
          Yes
        </label>

        <input
          type="radio"
          id={`${name}-no`}
          name={name}
          value="no"
          checked={value === "no"}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor={`${name}-no`} className="text-white">
          No
        </label>
      </div>
    </div>
  );
}

export default InputCheckBoxYesOrNo;
