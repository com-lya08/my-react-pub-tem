import { forwardRef } from "react";

const Toggle = forwardRef(({ className = "", srOnly = false, children, ...props }, ref) => {

	return (
		<label className={`form-switch ${className}`}>
			<input ref={ref} type="checkbox" {...props} />
			{children && <span className={srOnly ? "visual-hidden" : ""}>{children}</span>}
		</label>
	);
});

export default Toggle;
