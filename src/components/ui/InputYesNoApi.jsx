import React from "react";

function InputYesNoApi({ label, value, handleChange, name, className }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-black">
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
        <label htmlFor={`${name}-yes`} className="mr-4 text-black">
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
        <label htmlFor={`${name}-no`} className="text-black">
          No
        </label>
      </div>
    </div>
  );
}

export default InputYesNoApi;
