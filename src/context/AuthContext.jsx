import { createContext, useState } from "react";
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

  const getUser = async () => {
    const userLocalStorage = localStorage.getItem("fyset_user");

    if (!userLocalStorage) {
      const user = await authService.getMe();
      if (!user) return {};
      return user;
    }

    if (Object.keys(JSON.parse(userLocalStorage)).length > 0) {
      return user;
    } else {
      const user = await authService.getMe();
      if (!user) return {};
      return user;
    }
  };

  const updateUser = (user) => {
    localStorage.setItem("fyset_user", JSON.stringify(user));
    setUser(user);
  };

  const deleteUser = () => {
    authService.signOut().then(() => {
      localStorage.removeItem("fyset_user");
      setUser({});
    });
  };

  return (
    <AuthContext.Provider value={{ user, getUser, deleteUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
