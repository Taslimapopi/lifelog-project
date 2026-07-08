import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("dark") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dark", theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
