import React, { useState } from "react";
import { Card, Badge } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./CheckoutEWalletDetails.module.css";

export function CheckoutEWalletDetails({ eWallets }) {
  const [selectedWalletId, setSelectedWalletId] = useState("momo");

  const selectedWallet =
    eWallets.find((w) => w.id === selectedWalletId) || eWallets[0];

  return (
    <Card className={styles.card_container}>
      <div className={styles.section_header}>
        <div className={styles.icon_wrap}>
          <Icon name="Wallet" size={20} className={styles.header_icon} />
        </div>
        <div>
          <h2 className={styles.section_title}>Chọn Ví điện tử thanh toán</h2>
          <span className={styles.section_subtitle}>
            Hỗ trợ các ví điện tử phổ biến tại Việt Nam
          </span>
        </div>
      </div>

      <div className={styles.wallets_grid}>
        {eWallets.map((wallet) => {
          const isSelected = wallet.id === selectedWalletId;

          return (
            <div
              key={wallet.id}
              onClick={() => setSelectedWalletId(wallet.id)}
              className={`${styles.wallet_card} ${
                isSelected ? styles["wallet_card--selected"] : ""
              }`}
            >
              <div
                className={styles.wallet_badge_logo}
                style={{ backgroundColor: wallet.color }}
              >
                {wallet.iconText}
              </div>
              <div className={styles.wallet_info}>
                <div className={styles.name_row}>
                  <span className={styles.wallet_name}>{wallet.name}</span>
                  {isSelected && <Badge variant="success" size="sm" icon="Check">Đã chọn</Badge>}
                </div>
                <span className={styles.wallet_desc}>{wallet.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.instructions_box}>
        <Icon name="Info" size={18} className={styles.info_icon} />
        <span>
          Sau khi nhấn <strong>Xác nhận thanh toán</strong>, hệ thống sẽ mở ứng dụng{" "}
          <strong>{selectedWallet.name}</strong> hoặc hiển thị mã QR quét ứng dụng để bạn hoàn tất giao dịch.
        </span>
      </div>
    </Card>
  );
}

export default CheckoutEWalletDetails;
