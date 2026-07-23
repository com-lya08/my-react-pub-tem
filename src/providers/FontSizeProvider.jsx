import { useState, useEffect } from "react";
import { FontSizeContext } from "./Context";

export function FontSizeProvider({ children }) {
  const [fontSize, setFontSize] = useState("normal");

  useEffect(() => {
    document.documentElement.setAttribute("data-font-size", fontSize);
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}