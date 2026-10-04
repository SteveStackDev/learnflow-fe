import api from "./api";

export const userService = {
  changePassword: async ({ oldPassword, newPassword, confirmPassword }) => {
    const payload = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    const data = await api.post("/user/reset-password", payload);
    return data;
  },

  updateAvatar: async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const data = await api.post("/user/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  changeUsername: async (username) => {
    const data = await api.post("/user/change-username", { username });
    return data;
  },
};

export default userService;