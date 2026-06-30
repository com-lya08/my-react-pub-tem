/** @type { import('@storybook/react-vite').Preview } */
import "../src/styles/reset.scss";
import "../src/styles/style.scss";
import ModalRoot from "../src/components/Modal/ModalRoot";

export const globalTypes = {
	theme: {
		name: "Theme",
		defaultValue: "light",
		toolbar: {
			icon: "mirror",
			items: [
				{ value: "light", icon: "sun", title: "Light mode" },
				{ value: "dark", icon: "moon", title: "Dark mode" },
			],
			dynamicTitle: true,
		},
	},
};
const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: "todo",
		},
	},
	initialGlobals: {
		theme: "light",
	},
	decorators: [
		(Story, context) => {
			document.documentElement.setAttribute("data-color-mode", context.globals.theme);
			return (
				<>
					<Story />
					<ModalRoot />
				</>
			);
		},
	],
};

export default preview;
