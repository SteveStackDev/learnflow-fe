import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Tự động dọn dẹp các key localStorage cũ không cần thiết
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("learnflow_theme");
      localStorage.removeItem("learnflow_user");
      localStorage.removeItem("learnflow_token");
      localStorage.removeItem("fyset_token");
    } catch {
      // bỏ qua lỗi nếu có
    }
  }

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

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    const current =
      typeof document !== "undefined"
        ? document.documentElement.getAttribute("data-theme") ||
          localStorage.getItem("fyset_theme") ||
          "light"
        : "light";
    return {
      theme: current,
      toggleTheme: () => {
        const next = current === "light" ? "dark" : "light";
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", next);
          localStorage.setItem("fyset_theme", next);
        }
      },
      changeTheme: (newTheme) => {
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", newTheme);
          localStorage.setItem("fyset_theme", newTheme);
        }
      },
    };
  }
  return context;
}
