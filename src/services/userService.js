import api from "./api";

export const authService = {
  changePassword: async ({ oldPassword, newPassword, confirmPassword }) => {
    const payload = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    const data = await api.post("/user/reset-password", payload);


    return formattedData;
  },
};

export default authService;

