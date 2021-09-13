import { createRef, forwardRef } from "react";

const Input = ({ label, placeholder, type = "text" }, ref) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          ref={ref}
        />
      </div>
    </div>
  );
};

const forwardedRef = forwardRef(Input);
export default forwardedRef;
