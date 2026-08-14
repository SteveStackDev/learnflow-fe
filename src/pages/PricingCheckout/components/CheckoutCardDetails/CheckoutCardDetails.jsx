import React, { useState } from "react";
import { Card, FormField, Badge } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./CheckoutCardDetails.module.css";

export function CheckoutCardDetails({ cardTypes }) {
  const [selectedBrand, setSelectedBrand] = useState("visa");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, ""); // digits only
    val = val.substring(0, 16);
    // format as 0000 0000 0000 0000
    const formatted = val.match(/.{1,4}/g)?.join(" ") || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    val = val.substring(0, 4);
    if (val.length >= 3) {
      val = `${val.substring(0, 2)}/${val.substring(2)}`;
    }
    setExpiry(val);
  };

  const handleCvvChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    val = val.substring(0, 4);
    setCvv(val);
  };

  return (
    <Card className={styles.card_container}>
      <div className={styles.section_header}>
        <div className={styles.icon_wrap}>
          <Icon name="Lock" size={20} className={styles.header_icon} />
        </div>
        <h2 className={styles.section_title}>Chi tiết thẻ thanh toán</h2>
      </div>

      {/* 1. Select Card Brand/Type Grid */}
      <div className={styles.brand_section}>
        <label className={styles.brand_label}>Chọn nhà mạng / loại thẻ:</label>
        <div className={styles.brand_grid}>
          {cardTypes.map((brand) => {
            const isSelected = brand.id === selectedBrand;
            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => setSelectedBrand(brand.id)}
                className={`${styles.brand_chip} ${
                  isSelected ? styles["brand_chip--selected"] : ""
                }`}
              >
                <Icon name="CreditCard" size={16} style={{ color: brand.color }} />
                <span>{brand.name}</span>
                {isSelected && <Badge variant="primary" size="sm" icon="Check" style={{ marginLeft: "auto" }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Card Fields Form */}
      <div className={styles.form_grid}>
        {/* Name on Card */}
        <div className={styles.form_row}>
          <FormField
            label="Tên trên thẻ"
            placeholder="NGUYEN VAN A"
            leftIcon="User"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            required
          />
        </div>

        {/* Card Number */}
        <div className={styles.form_row}>
          <FormField
            label="Số thẻ"
            placeholder="0000 0000 0000 0000"
            leftIcon="CreditCard"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
          />
        </div>

        {/* Expiry & CVV Row */}
        <div className={styles.cols_row}>
          <FormField
            label="Ngày hết hạn"
            placeholder="MM/YY"
            leftIcon="Calendar"
            value={expiry}
            onChange={handleExpiryChange}
            required
          />

          <FormField
            label="Mã CVV / CVC"
            placeholder="123"
            leftIcon="Lock"
            type="password"
            value={cvv}
            onChange={handleCvvChange}
            required
          />
        </div>
      </div>
    </Card>
  );
}

export default CheckoutCardDetails;
