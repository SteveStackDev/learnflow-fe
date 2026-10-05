import { createContext, useState, useCallback, useContext, useEffect } from "react";
import { authService } from "~/services";

export const AuthContext = createContext({});

// Hàm helper dọn dẹp key chuẩn hóa duy nhất 1 key là "fyset_user"
const STORAGE_KEY = "fyset_user";
const OLD_STORAGE_KEY = "fySet_user";

const clearUserStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(OLD_STORAGE_KEY);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      // Ưu tiên đọc key chuẩn, dọn dẹp key cũ nếu có
      const savedUser = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && typeof parsed === "object") {
          // Xóa key hoa cũ để tránh rác
          localStorage.removeItem(OLD_STORAGE_KEY);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return {};
  });

  // Hàm cập nhật state + localStorage (hỗ trợ partial & full update)
  const updateUser = useCallback((newUser) => {
    if (newUser && Object.keys(newUser).length > 0) {
      setUser((prevUser) => {
        const merged = {
          ...(prevUser || {}),
          ...newUser,
        };
        localStorage.removeItem(OLD_STORAGE_KEY); // Xóa key hoa cũ
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return merged;
      });
    } else {
      clearUserStorage();
      setUser({});
    }
  }, []);

  // Hàm bắt buộc lấy dữ liệu mới nhất từ server (Get Me Fresh Data)
  const refreshUser = useCallback(async () => {
    try {
      const freshUser = await authService.getMe();
      if (freshUser && (freshUser.id || freshUser._id || freshUser.email || freshUser.name || freshUser.username)) {
        updateUser(freshUser);
        return freshUser;
      }
    } catch (err) {
      console.warn("Lỗi khi refresh user data từ server:", err);
    }
    return null;
  }, [updateUser]);

  // Hàm lấy user (Ưu tiên fetch mới nếu forceFetch = true, hoặc tự động sync nếu chưa có)
  const getUser = useCallback(async (forceFetch = false) => {
    if (forceFetch) {
      return await refreshUser();
    }

    // Nếu đã có thông tin trong state thì trả về luôn
    if (user && Object.keys(user).length > 0) {
      return user;
    }

    // Nếu chưa có thì thử fetch từ backend (session / OAuth)
    return await refreshUser();
  }, [user, refreshUser]);

  const deleteUser = useCallback(async () => {
    try {
      await authService.signOut();
    } catch (err) {
      console.warn("Sign out request error:", err);
    } finally {
      clearUserStorage();
      sessionStorage.removeItem("fyset_temp_token");
      setUser({});
    }
  }, []);

  // Khi app mount, xóa sạch key cũ fySet_user nếu tồn tại
  useEffect(() => {
    if (localStorage.getItem(OLD_STORAGE_KEY)) {
      localStorage.removeItem(OLD_STORAGE_KEY);
    }
  }, []);

  const isAuthenticated = Boolean(
    user &&
      Object.keys(user).length > 0 &&
      (user.id || user._id || user.email || user.name || user.username || user.accessToken || user.token),
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        getUser,
        refreshUser, // Export thêm hàm này để gọi trực tiếp ở Setting
        deleteUser,
        updateUser,
        isAuthenticated,
      }}
    >
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
      refreshUser: async () => null,
      deleteUser: () => {},
      updateUser: () => {},
      isAuthenticated: false,
    };
  }
  return context;
}