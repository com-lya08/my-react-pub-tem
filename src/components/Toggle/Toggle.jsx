import { useTheme } from "../../providers/useTheme";
// import Button from "../Button/Button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <input type="checkbox" checked={theme === "dark"} className="switch"
      onChange={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      />
  );
}