import Button from "./Button";

export default {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},

	argTypes: {
		children: {
			control: "text",
		},
		variant: {
			control: "select",
			options: ["btn-primary", "btn-secondary", "btn-line"],
		},

		disabled: {
			control: "boolean",
		},
	},
};

export const Primary = {
	args: {
		variant: "btn-primary",
		children: "Primary Button",
	},
};

export const Secondary = {
	args: {
		variant: "btn-secondary",
		children: "Secondary Button",
	},
};

export const Close = {
	args: {
		variant: "btn-close",
		children: "Close Button",
	},
};

export const Outline = {
	args: {
		variant: "btn-line",
		children: "Outline Button",
	},
};

export const Disabled = {
	args: {
		// variant: "",
		children: "Disabled Button",
		disabled: true,
	},
};
