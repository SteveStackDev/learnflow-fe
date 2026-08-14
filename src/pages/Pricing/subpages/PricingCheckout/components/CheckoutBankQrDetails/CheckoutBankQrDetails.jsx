import React, { useMemo } from "react";
import { Card, Button, Badge } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./CheckoutBankQrDetails.module.css";

export function CheckoutBankQrDetails({ bankInfo, finalPriceFormatted }) {
  const { toast } = useToast();

  const transferNote = useMemo(
    () => `${bankInfo.transferNotePrefix}PREMIUM_888999`,
    [bankInfo.transferNotePrefix],
  );

  const handleCopy = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    toast.success(`Đã sao chép ${label}!`, "Chuyển khoản Ngân hàng");
  };

  return (
    <Card className={styles.card_container}>
      <div className={styles.section_header}>
        <div className={styles.icon_wrap}>
          <Icon name="Landmark" size={20} className={styles.header_icon} />
        </div>
        <div>
          <h2 className={styles.section_title}>Chuyển khoản Ngân hàng (VietQR)</h2>
          <span className={styles.section_subtitle}>
            Quét mã QR bằng ứng dụng ngân hàng bất kỳ để thanh toán tự động
          </span>
        </div>
      </div>

      <div className={styles.qr_content_grid}>
        {/* Left Column: QR Code Box */}
        <div className={styles.qr_box_wrapper}>
          <div className={styles.qr_frame}>
            <img
              src={bankInfo.qrPlaceholderUrl}
              alt="Mã QR Chuyển Khoản Ngân Hàng"
              className={styles.qr_image}
            />
            <div className={styles.qr_badge}>
              <Badge variant="primary" size="sm" icon="Check">
                VietQR FastPay
              </Badge>
            </div>
          </div>
          <span className={styles.qr_hint}>
            Hệ thống sẽ tự động xác nhận sau khi nhận được tiền
          </span>
        </div>

        {/* Right Column: Account Details */}
        <div className={styles.bank_details}>
          {/* Bank Name */}
          <div className={styles.detail_item}>
            <span className={styles.detail_label}>Ngân hàng thụ hưởng:</span>
            <strong className={styles.detail_val}>{bankInfo.bankName}</strong>
          </div>

          {/* Account Holder */}
          <div className={styles.detail_item}>
            <span className={styles.detail_label}>Chủ tài khoản:</span>
            <strong className={styles.detail_val}>{bankInfo.accountHolder}</strong>
          </div>

          {/* Account Number with Copy */}
          <div className={styles.detail_item_copy}>
            <div>
              <span className={styles.detail_label}>Số tài khoản:</span>
              <div className={styles.detail_val_highlight}>{bankInfo.accountNumber}</div>
            </div>
            <Button
              variant="outlined"
              size="sm"
              leftIcon="Copy"
              onClick={() => handleCopy(bankInfo.accountNumber, "Số tài khoản")}
            >
              Sao chép
            </Button>
          </div>

          {/* Amount */}
          <div className={styles.detail_item}>
            <span className={styles.detail_label}>Số tiền chuyển khoản:</span>
            <div className={styles.price_highlight}>{finalPriceFormatted}</div>
          </div>

          {/* Transfer Note with Copy */}
          <div className={styles.detail_item_copy}>
            <div>
              <span className={styles.detail_label}>Nội dung chuyển khoản (Bắt buộc):</span>
              <div className={styles.note_highlight}>{transferNote}</div>
            </div>
            <Button
              variant="outlined"
              size="sm"
              leftIcon="Copy"
              onClick={() => handleCopy(transferNote, "Nội dung chuyển khoản")}
            >
              Sao chép
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CheckoutBankQrDetails;
