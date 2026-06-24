import clsx from "clsx";
// import styles from "./Button.module.scss";

// function Button({ variant = "btn-primary", disabled = false, position="rel",children, ...props }) {
// 	return (
// 		<button type="button" className={clsx(variant !== "btn-close" && styles.btn, styles[position], styles[variant], disabled && styles.disabled)} disabled={disabled} {...props}>
// 			{variant === "btn-close" ? <span className="sr-only">close button</span> : children}
// 		</button>
// 	);

function Button({ variant = "btn-primary", disabled = false, position="rel", children, ...props }) {
	const isCloseBtn = variant === "btn-close";
	return (
		<button type="button" className={clsx(!isCloseBtn && "btn", variant, position, disabled && "disabled")} disabled={disabled} {...props}>
			{variant === "btn-close" ? <span className="sr-only">close button</span> : children}
		</button>
	);
}

export default Button;
