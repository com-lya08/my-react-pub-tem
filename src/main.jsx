import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
import { FontSizeProvider } from "./providers/FontSizeProvider.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider>
			<FontSizeProvider>
				<App />
			</FontSizeProvider>
		</ThemeProvider>
	</StrictMode>,
);
