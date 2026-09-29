import api from "./api";

export const authService = {
  signIn: async ({ email, password }) => {
    const payload = {
      email,
      password,
    };

    const data = await api.post("/auth/sign-in", payload);

    const formattedData = {
      ...data,
      name: data.username,
      avatar: data.avatar.url,
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

    const formattedData = {
      ...data,
      name: data.username,
      avatar: data.avatar.url,
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

      const formattedData = {
        ...data,
        name: data.name || data.username,
        avatar: typeof data.avatar === "object" ? data.avatar?.url : data.avatar,
      };

      return formattedData;
    } catch {
      return null;
    }
  },
};

export default authService;

