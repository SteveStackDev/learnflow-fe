import heroUrl from "~/assets/images/Home/hero.webp";

export const SETTING_TABS = [
  { id: "account", label: "Tài khoản", iconName: "User" },
  { id: "security", label: "Bảo mật", iconName: "Shield" },
  { id: "appearance", label: "Giao diện", iconName: "Sun" },
];

export const mockUserData = {
  fullname: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  username: "nguyenvana",
  avatarUrl: heroUrl,
  bio: "Chia sẻ một chút về bản thân bạn...",
  website: "https://nguyenvana.dev",
  location: "TP. Hồ Chí Minh, Việt Nam",
  phone: "+84 912 345 678",
  phoneVerified: true,
  joinedDate: "15/01/2026",
  accountId: "FYSET-89412",
  language: "vi",
  region: "vn",
  theme: "light",
  twoFactorEnabled: false,
  emailNotifications: {
    newCourse: true,
    contestReminders: true,
    weeklyReport: false,
    promotions: true,
  },
  privacy: {
    profileVisibility: "public",
    showStatus: true,
    allowSearch: true,
  },
  billing: {
    currentPlan: "FySet Pro",
    renewalDate: "15/11/2026",
    price: "199.000đ / tháng",
  },
};
