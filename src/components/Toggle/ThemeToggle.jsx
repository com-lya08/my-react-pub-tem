import { useTheme } from "../../providers/useContext";
import { forwardRef } from "react";

const ThemeToggle = forwardRef(({ className = "", srOnly = false, children, ...props }, ref) => {
	const { theme, setTheme } = useTheme();

	return (
		<label className={`form-switch ${className}`}>
			<input ref={ref} type="checkbox" checked={theme === "dark"} onChange={() => setTheme(theme === "dark" ? "light" : "dark")} {...props} />

			{children && <span className={srOnly ? "visual-hidden" : ""}>{children}</span>}
		</label>
	);
});

export default ThemeToggle;
