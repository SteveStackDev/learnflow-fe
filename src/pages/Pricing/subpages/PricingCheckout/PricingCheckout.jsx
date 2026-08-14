import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import { checkoutMockData } from "./data";
import CheckoutHeader from "./components/CheckoutHeader/CheckoutHeader";
import CheckoutPaymentMethods from "./components/CheckoutPaymentMethods/CheckoutPaymentMethods";
import CheckoutCardDetails from "./components/CheckoutCardDetails/CheckoutCardDetails";
import CheckoutEWalletDetails from "./components/CheckoutEWalletDetails/CheckoutEWalletDetails";
import CheckoutBankQrDetails from "./components/CheckoutBankQrDetails/CheckoutBankQrDetails";
import CheckoutBillingInfo from "./components/CheckoutBillingInfo/CheckoutBillingInfo";
import CheckoutOrderSummary from "./components/CheckoutOrderSummary/CheckoutOrderSummary";
import CheckoutFooter from "./components/CheckoutFooter/CheckoutFooter";
import styles from "./PrincingCheckout.module.css";

export function PricingCheckout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  useScrollReveal();

  const [selectedMethodId, setSelectedMethodId] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmPayment = (finalAmount) => {
    setIsProcessing(true);
    toast.info("Đang xử lý giao dịch thanh toán an toàn...", "Thanh toán FySet");

    setTimeout(() => {
      setIsProcessing(false);
      const formattedAmount = new Intl.NumberFormat("vi-VN").format(finalAmount) + " ₫";
      toast.success(
        `Thanh toán thành công ${formattedAmount}! Tài khoản Premium của bạn đã được kích hoạt.`,
        "Giao dịch hoàn tất",
      );
      navigate("/dashboard");
    }, 2000);
  };

  const formatVND = (num) => new Intl.NumberFormat("vi-VN").format(num) + " ₫";

  return (
    <div className={styles.page_container}>
      {/* 1. Header Banner */}
      <CheckoutHeader />

      {/* 2. Main 2-Column Checkout Workspace */}
      <div className={styles.workspace_grid}>
        {/* Left Column: Payment Details Form (65%) */}
        <div className={styles.left_column}>
          {/* Method Selection Cards */}
          <CheckoutPaymentMethods
            methods={checkoutMockData.paymentMethods}
            selectedId={selectedMethodId}
            onSelectMethod={setSelectedMethodId}
          />

          {/* Conditional Detail Forms */}
          {selectedMethodId === "card" && (
            <CheckoutCardDetails cardTypes={checkoutMockData.cardTypes} />
          )}

          {selectedMethodId === "ewallet" && (
            <CheckoutEWalletDetails eWallets={checkoutMockData.eWallets} />
          )}

          {selectedMethodId === "bank_qr" && (
            <CheckoutBankQrDetails
              bankInfo={checkoutMockData.bankQrInfo}
              planTitle={checkoutMockData.planInfo.title}
              finalPriceFormatted={formatVND(checkoutMockData.planInfo.price * 0.8)}
            />
          )}

          {/* Billing Info Card */}
          <CheckoutBillingInfo />
        </div>

        {/* Right Column: Order Summary Sidebar (35%) */}
        <div className={styles.right_column}>
          <CheckoutOrderSummary
            planInfo={checkoutMockData.planInfo}
            availablePromos={checkoutMockData.availablePromos}
            onConfirmPayment={handleConfirmPayment}
            isProcessing={isProcessing}
          />
        </div>
      </div>

      {/* 3. Footer Section */}
      <CheckoutFooter />
    </div>
  );
}

export default PricingCheckout;
