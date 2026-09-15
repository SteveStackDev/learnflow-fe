import { createContext, useState, useCallback } from "react";
import { authService } from "~/services";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem("fyset_user"));
    if (user) {
      return user;
    } else {
      return {};
    }
  });

  const getUser = useCallback(async () => {
    const userLocalStorage = localStorage.getItem("fyset_user");

    if (!userLocalStorage) {
      const u = await authService.getMe();
      if (!u) return {};
      return u;
    }

    try {
      const parsed = JSON.parse(userLocalStorage);
      if (Object.keys(parsed).length > 0) {
        return parsed;
      }
    } catch {
      // fallback
    }

    const u = await authService.getMe();
    if (!u) return {};
    return u;
  }, []);

  const updateUser = useCallback((newUser) => {
    localStorage.setItem("fyset_user", JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const deleteUser = useCallback(() => {
    authService.signOut().then(() => {
      localStorage.removeItem("fyset_user");
      setUser({});
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, getUser, deleteUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
