import { createContext, useState, useCallback, useContext } from "react";
import { authService } from "~/services";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("fyset_user"));
      if (savedUser && typeof savedUser === "object") {
        return savedUser;
      }
    } catch {
      // ignore
    }
    return {};
  });

  const getUser = useCallback(async () => {
    const userLocalStorage = localStorage.getItem("fyset_user") || localStorage.getItem("fySet_user");

    if (userLocalStorage) {
      try {
        const parsed = JSON.parse(userLocalStorage);
        if (
          parsed &&
          Object.keys(parsed).length > 0 &&
          (parsed.id || parsed._id || parsed.email || parsed.name || parsed.username)
        ) {
          return parsed;
        }
      } catch {
        // fallback to getMe
      }
    }

    // Try fetching from backend session (critical for Google OAuth redirect)
    try {
      const u = await authService.getMe();
      if (u && (u.id || u._id || u.email || u.name || u.username)) {
        localStorage.setItem("fyset_user", JSON.stringify(u));
        setUser(u);
        return u;
      }
    } catch {
      // not logged in
    }

    return {};
  }, []);

  const updateUser = useCallback((newUser) => {
    if (newUser && Object.keys(newUser).length > 0) {
      localStorage.setItem("fyset_user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("fyset_user");
      localStorage.removeItem("fySet_user");
    }
    setUser(newUser || {});
  }, []);

  const deleteUser = useCallback(async () => {
    try {
      await authService.signOut();
    } catch (err) {
      console.warn("Sign out request error:", err);
    } finally {
      localStorage.removeItem("fyset_user");
      localStorage.removeItem("fySet_user");
      sessionStorage.removeItem("fyset_temp_token");
      setUser({});
    }
  }, []);



  const isAuthenticated = Boolean(
    user &&
      Object.keys(user).length > 0 &&
      (user.id || user._id || user.email || user.name || user.username || user.accessToken || user.token),
  );

  return (
    <AuthContext.Provider value={{ user, getUser, deleteUser, updateUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: {},
      getUser: async () => ({}),
      deleteUser: () => {},
      updateUser: () => {},
      isAuthenticated: false,
    };
  }
  return context;
}

