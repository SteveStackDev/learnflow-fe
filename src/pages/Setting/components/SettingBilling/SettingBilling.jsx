import { useState } from "react";
import { useToast } from "~/context/ToastContext.jsx";
import Icon from "~/components/Icon/Icon";
import styles from "./SettingBilling.module.css";

function SettingBilling({ userData = {} }) {
  const { toast } = useToast();
  const [currentPlan] = useState(userData.billing?.currentPlan || "FySet Pro");
  const [nextBillingDate] = useState(userData.billing?.nextBillingDate || "07/09/2026");

  const billingHistory = [
    {
      id: 1,
      date: "07/09/2026",
      desc: "FySet Pro - Gói Hàng Tháng",
      amount: "$9.99",
      status: "Đã thanh toán",
    },
    {
      id: 2,
      date: "07/08/2026",
      desc: "FySet Pro - Gói Hàng Tháng",
      amount: "$9.99",
      status: "Đã thanh toán",
    },
    {
      id: 3,
      date: "07/07/2026",
      desc: "FySet Pro - Gói Hàng Tháng",
      amount: "$9.99",
      status: "Đã thanh toán",
    },
  ];

  const handleChangePlan = () => {
    toast.info("Chuyển hướng đến trang chọn gói FySet Pro!", "Đổi gói");
  };

  const handleCancelSubscription = () => {
    toast.warning("Yêu cầu hủy đăng ký tự động gia hạn thành công!", "Hủy gói");
  };

  const handleAddPaymentMethod = () => {
    toast.info("Tính năng liên kết thẻ thanh toán mới đang được phát triển!", "Thanh toán");
  };

  const handleDownloadInvoice = (date) => {
    toast.success(`Đã tải xuống hóa đơn ngày ${date}!`, "Hóa đơn");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.section_title}>Thanh toán & Gói dịch vụ</h2>

      {/* SECTION 1: CURRENT PLAN */}
      <div className={styles.plan_card}>
        <div className={styles.plan_header}>
          <div>
            <span className={styles.plan_badge}>Gói hiện tại</span>
            <h3 className={styles.plan_title}>{currentPlan}</h3>
            <p className={styles.plan_price_text}>
              <strong>$9.99</strong> / tháng
            </p>
            <p className={styles.plan_meta}>
              Gia hạn tiếp theo: <strong>{nextBillingDate}</strong>
            </p>
          </div>

          <div className={styles.plan_actions}>
            <button type="button" onClick={handleChangePlan} className={styles.change_plan_btn}>
              <Icon name="RefreshCw" size={15} />
              <span>Đổi gói</span>
            </button>
            <button
              type="button"
              onClick={handleCancelSubscription}
              className={styles.cancel_plan_btn}
            >
              Hủy đăng ký
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: PAYMENT METHOD */}
      <div className={styles.card}>
        <div className={styles.card_header_row}>
          <h3 className={styles.card_title}>Phương thức thanh toán</h3>
          <button type="button" onClick={handleAddPaymentMethod} className={styles.add_payment_btn}>
            <Icon name="Plus" size={15} />
            <span>Thêm phương thức</span>
          </button>
        </div>

        <div className={styles.payment_row}>
          <div className={styles.payment_info}>
            <div className={styles.card_brand_box}>
              <Icon name="CreditCard" size={20} />
            </div>
            <div>
              <div className={styles.card_title_row}>
                <span className={styles.card_number}>Thẻ MasterCard •••• 4242</span>
                <span className={styles.default_badge}>Mặc định</span>
              </div>
              <span className={styles.card_exp}>Hết hạn 12/2028</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toast.info("Tính năng chỉnh sửa thẻ đang phát triển!", "Thanh toán")}
            className={styles.link_btn}
          >
            Chỉnh sửa
          </button>
        </div>
      </div>

      {/* SECTION 3: BILLING HISTORY */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>Lịch sử thanh toán</h3>

        <div className={styles.table_wrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Mô tả</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
                <th className={styles.text_right}>Hóa đơn</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((item) => (
                <tr key={item.id}>
                  <td className={styles.font_medium}>{item.date}</td>
                  <td>{item.desc}</td>
                  <td className={styles.font_bold}>{item.amount}</td>
                  <td>
                    <span className={styles.paid_badge}>
                      <Icon name="Check" size={12} />
                      {item.status}
                    </span>
                  </td>
                  <td className={styles.text_right}>
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoice(item.date)}
                      className={styles.download_btn}
                      title="Tải hóa đơn"
                    >
                      <Icon name="Download" size={14} />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: SUBSCRIPTION MANAGEMENT */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>Quản lý gói & Đăng ký</h3>

        <div className={styles.danger_item}>
          <div>
            <span className={styles.danger_title}>Đổi gói dịch vụ</span>
            <p className={styles.danger_desc}>
              Chuyển đổi giữa gói tháng và gói năm để nhận ưu đãi tiết kiệm chi phí học tập.
            </p>
          </div>
          <button type="button" onClick={handleChangePlan} className={styles.action_btn}>
            Đổi gói
          </button>
        </div>

        <hr className={styles.divider} />

        <div className={styles.danger_item}>
          <div>
            <span className={styles.danger_title}>Hủy đăng ký</span>
            <p className={styles.danger_desc}>
              Hủy tính năng tự động gia hạn. Bạn vẫn có thể tiếp tục sử dụng tất cả quyền lợi gói
              Pro cho đến hết ngày {nextBillingDate}.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCancelSubscription}
            className={styles.cancel_danger_btn}
          >
            Hủy gói
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingBilling;
