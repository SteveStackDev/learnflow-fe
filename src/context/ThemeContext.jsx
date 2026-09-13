import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return (
      document.documentElement.getAttribute("data-theme") ||
      localStorage.getItem("fyset_theme") ||
      "light"
    );
  });

  useEffect(() => {
    document.documentElement.classList.add("theme-switching");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fyset_theme", theme);

    const timer = setTimeout(() => {
      document.documentElement.classList.remove("theme-switching");
    }, 50);

    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
