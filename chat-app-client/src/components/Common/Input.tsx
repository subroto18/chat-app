import React from "react";

const Input = ({ className, onChange, value }: any) => {
  return (
    <input
      onChange={(e) => onChange(e.target.value)}
      value={value}
      type="text"
      className={className}
      placeholder="Search"
    />
  );
};

export default Input;
