import api from "./api";

export const authService = {
  changePassword: async ({ oldPassword, newPassword, confirmPassword }) => {
    const payload = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    console.log(payload);

    const data = await api.post("/user/reset-password", payload);


    return data;
  },
};

export default authService;

