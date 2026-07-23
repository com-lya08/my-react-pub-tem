import { forwardRef } from "react";

const RadioBox = forwardRef(
  ({ children, className = "", ...props }, ref) => {

    return (
      <label className={`form-radio ${className}`}>
        <input ref={ref} type="radio" {...props} />
        {children && <span>{children}</span>}
      </label>
    );
  }
);

export default RadioBox;