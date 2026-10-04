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
};

export default userService;

