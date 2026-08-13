/**
 * [NEW COMPONENT] - Component hiển thị thông tin tài khoản dùng thử
 */
import Icon from "~/components/Icon/Icon";
import { testAccount } from "./testAccountData";
import styles from "./TestAccount.module.css";

function TestAccount() {
  return (
    <div className={styles.test_account_box}>
      <div className={styles.test_account_icon}>
        <Icon name="Key" size={16} />
      </div>
      <div className={styles.test_account_info}>
        <span className={styles.test_account_tag}>Tài khoản dùng thử</span>
        <span className={styles.test_account_credentials}>
          {testAccount.email} / {testAccount.password}
        </span>
      </div>
    </div>
  );
}

export default TestAccount;
