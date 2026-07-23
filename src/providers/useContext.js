import { useContext } from "react";
import { ThemeContext, FontSizeContext } from "./Context";

export const useTheme = () => useContext(ThemeContext);
export const useFontSize = () => useContext(FontSizeContext);