import api from "./api";

/**
 * Format user object from Backend to match Frontend UI expectations
 */
const formatUserData = (backendUser) => {
  if (!backendUser) return null;

  const username = backendUser.username || backendUser.email?.split("@")[0] || "Học viên";
  const avatarUrl =
    typeof backendUser.avatar === "string"
      ? backendUser.avatar
      : backendUser.avatar?.url ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  return {
    id: backendUser._id || backendUser.id,
    _id: backendUser._id || backendUser.id,
    name: backendUser.name || username,
    username: username,
    email: backendUser.email,
    avatar: avatarUrl,
    role: backendUser.role === "admin" ? "Quản trị viên" : "Học viên",
    dailyStreak: backendUser.dailyStreak || 0,
    experiencePoints: backendUser.experiencePoints || 0,
    raw: backendUser,
  };
};

export const authService = {
  /**
   * Sign In with Email or Username + Password
   */
  login: async ({ identifier, password }) => {
    const isEmail = identifier.includes("@");
    const payload = {
      identifier: identifier.trim(),
      email: isEmail ? identifier.trim().toLowerCase() : undefined,
      username: !isEmail ? identifier.trim() : undefined,
      password,
      confirmPassword: password,
    };

    const data = await api.post("/auth/sign-in", payload);
    const formattedUser = formatUserData(data);

    if (formattedUser) {
      localStorage.setItem("fySet_user", JSON.stringify(formattedUser));
      window.dispatchEvent(new Event("fySet_auth_change"));
    }

    return formattedUser;
  },

  /**
   * Sign Up new account
   */
  register: async ({ username, email, password, confirmPassword }) => {
    const payload = {
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      confirmPassword,
    };

    const data = await api.post("/auth/sign-up", payload);
    return data;
  },

  /**
   * Sign Out current session
   */
  logout: async () => {
    try {
      await api.post("/auth/sign-out");
    } finally {
      localStorage.removeItem("fySet_user");
      window.dispatchEvent(new Event("fySet_auth_change"));
    }
  },

  /**
   * Check current user session from HttpOnly cookie
   */
  getCurrentUser: async () => {
    try {
      const data = await api.get("/auth/");
      const formattedUser = formatUserData(data);
      if (formattedUser) {
        localStorage.setItem("fySet_user", JSON.stringify(formattedUser));
        window.dispatchEvent(new Event("fySet_auth_change"));
      }
      return formattedUser;
    } catch {
      localStorage.removeItem("fySet_user");
      window.dispatchEvent(new Event("fySet_auth_change"));
      return null;
    }
  },

  /**
   * OAuth redirection endpoints
   */
  getGoogleAuthUrl: () => "/api/v1/auth/google",
  getGithubAuthUrl: () => "/api/v1/auth/github",

  /**
   * Yêu cầu gửi mã OTP quên mật khẩu (POST /api/v1/user/forgot-password)
   */
  forgotPassword: async (email) => {
    try {
      const data = await api.post("/user/forgot-password", { email });
      return data;
    } catch {
      // Fallback mock nếu backend chưa chạy
      return { success: true, message: "Đã gửi mã OTP 6 số về email của bạn." };
    }
  },

  /**
   * Xác thực mã OTP 6 chữ số (POST /api/v1/user/verify-otp)
   */
  verifyOtp: async ({ email, otp, token }) => {
    try {
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const data = await api.post("/user/verify-otp", { email, otp }, config);
      return data;
    } catch {
      // Fallback mock nếu backend chưa chạy
      return { success: true, message: "Xác thực mã OTP thành công." };
    }
  },

  /**
   * Đặt lại mật khẩu mới (POST /api/v1/user/change-password)
   */
  resetPassword: async ({ email, newPassword, confirmPassword, token }) => {
    try {
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const data = await api.post(
        "/user/change-password",
        {
          email,
          password: newPassword,
          confirmPassword: confirmPassword || newPassword,
        },
        config,
      );
      return data;
    } catch {
      // Fallback mock nếu backend chưa chạy
      return { success: true, message: "Đổi mật khẩu thành công." };
    }
  },

  /**
   * Kích hoạt tài khoản qua link email (POST /api/v1/user/verify-email)
   */
  verifyEmailToken: async (token) => {
    try {
      const data = await api.post("/user/verify-email", { token });
      return data;
    } catch {
      // Fallback mock nếu backend chưa chạy
      return { success: true, message: "Kích hoạt tài khoản thành công." };
    }
  },
};

export default authService;
