import { forwardRef } from "react";

const Checkbox = forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return (
      <label className={`form-checkbox ${className}`}>
        <input ref={ref} type="checkbox" {...props} />
        {children && <span>{children}</span>}
      </label>
    );
  }
);

export default Checkbox;