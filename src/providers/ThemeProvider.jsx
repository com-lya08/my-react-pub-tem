import { useEffect, createContext } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children, theme }) {
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-color-mode",
      theme
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
