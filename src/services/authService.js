import api from "./api";

export const authService = {
  signIn: async ({ email, password }) => {
    const payload = {
      email,
      password,
    };

    const data = await api.post("/auth/sign-in", payload);
    const raw = data?.data !== undefined ? data.data : data;

    const formattedData = {
      ...raw,
      username: raw?.username || raw?.name,
      name: raw?.username || raw?.name,
      avatar: typeof raw?.avatar === "object" ? raw?.avatar?.url : raw?.avatar,
    };

    return formattedData;
  },

  signUp: async ({ username, email, password, confirmPassword }) => {
    const payload = {
      username,
      email,
      password,
      confirmPassword,
    };

    const data = await api.post("/auth/sign-up", payload);
    const raw = data?.data !== undefined ? data.data : data;

    const formattedData = {
      ...raw,
      username: raw?.username || username,
      name: raw?.username || username,
      avatar: typeof raw?.avatar === "object" ? raw?.avatar?.url : raw?.avatar,
    };

    return formattedData;
  },

  signOut: async () => {
    try {
      await api.post("/auth/sign-out");
    } catch (err) {
      console.warn("Sign out request error:", err);
    }
    return;
  },

  signInWithGoogle: async () => {
    window.location.href = "https://fyset-be.onrender.com/api/v1/auth/google";

    const data = await api.get("/auth/get-me");

    return data;
  },

  getMe: async () => {
    try {
      const data = await api.get("/auth/get-me");
      if (!data || Object.keys(data).length === 0) return null;

      const raw = data?.data !== undefined ? data.data : data;
      const formattedData = {
        ...raw,
        username: raw?.username || raw?.name,
        name: raw?.name || raw?.username,
        avatar: typeof raw?.avatar === "object" ? raw?.avatar?.url : (raw?.avatar || ""),
      };

      return formattedData;
    } catch {
      return null;
    }
  },
};

export default authService;

