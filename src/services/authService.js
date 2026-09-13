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
    await api.post("/auth/sign-out");

    return;
  },

  signInWithGoogle: async () => {
    window.location.href = "http://localhost:3000/api/v1/auth/google";

    const data = await api.get("/auth/get-me");

    return data;
  },

  getMe: async () => {
    const data = await api.get("/auth/get-me");

    return data;
  },
};

export default authService;
