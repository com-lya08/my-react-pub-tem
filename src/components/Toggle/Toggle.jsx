import { useTheme } from "../../providers/useTheme";
import Button from "../Button/Button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
    >
      Toggle
    </Button>
  );
}