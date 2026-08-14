export const checkoutMockData = {
  planInfo: {
    id: "premium-yearly",
    title: "Gói FySet Premium",
    price: 1200000,
    formattedPrice: "1,200,000 ₫",
    durationBadge: "1 Năm",
    billingCycle: "Hàng năm",
  },
  paymentMethods: [
    {
      id: "card",
      title: "Thẻ tín dụng/ghi nợ",
      icon: "CreditCard",
      description: "Visa, Mastercard, JCB, Napas",
    },
    {
      id: "ewallet",
      title: "Ví điện tử",
      icon: "Wallet",
      description: "MoMo, ZaloPay, VNPay, ShopeePay",
    },
    {
      id: "bank_qr",
      title: "Chuyển khoản NH",
      icon: "Landmark",
      description: "Quét mã VietQR tiện lợi",
    },
  ],
  cardTypes: [
    { id: "visa", name: "Visa", icon: "CreditCard", color: "#1a1f71" },
    { id: "mastercard", name: "MasterCard", icon: "CreditCard", color: "#eb001b" },
    { id: "jcb", name: "JCB", icon: "CreditCard", color: "#0079c1" },
    { id: "napas", name: "Thẻ ATM Napas", icon: "CreditCard", color: "#00a651" },
  ],
  eWallets: [
    {
      id: "momo",
      name: "Ví MoMo",
      iconText: "MoMo",
      color: "#a50064",
      desc: "Thanh toán an toàn qua ứng dụng MoMo",
    },
    {
      id: "zalopay",
      name: "ZaloPay",
      iconText: "ZaloPay",
      color: "#0068ff",
      desc: "Thanh toán ngay bằng ví hoặc ứng dụng Zalo",
    },
    {
      id: "vnpay",
      name: "VNPay QR",
      iconText: "VNPay",
      color: "#ed1c24",
      desc: "Quét mã từ ứng dụng Ngân hàng hoặc VNPay",
    },
    {
      id: "shopeepay",
      name: "ShopeePay",
      iconText: "ShopeePay",
      color: "#ee4d2d",
      desc: "Thanh toán nhanh chóng qua ví ShopeePay",
    },
  ],
  bankQrInfo: {
    bankName: "Ngân hàng Techcombank (TCB)",
    accountNumber: "1903 8888 9999 01",
    accountHolder: "CÔNG TY CỔ PHẦN CÔNG NGHỆ FYSET",
    branch: "Chi nhánh Hội Sở Chính",
    qrPlaceholderUrl:
      "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=2024-FYSET-PREMIUM-PAYMENT-DEMO",
    transferNotePrefix: "FYSET ",
  },
  availablePromos: {
    PROMO20: { discountPercent: 20, code: "PROMO20", title: "Giảm 20% đơn hàng" },
    FYSETVIP: { discountPercent: 30, code: "FYSETVIP", title: "Ưu đãi VIP 30%" },
  },
};
