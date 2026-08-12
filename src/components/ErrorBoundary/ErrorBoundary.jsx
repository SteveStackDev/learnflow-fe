import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("FySet ErrorBoundary caught an unhandled runtime error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles["error-boundary"]}>
          <div className={styles["error-boundary__card"]}>
            <div className={styles["error-boundary__icon-box"]}>
              <Icon name="Shield" size={32} />
            </div>
            <h2 className={styles["error-boundary__title"]}>Đã xảy ra lỗi không mong muốn</h2>
            <p className={styles["error-boundary__desc"]}>
              Hệ thống đã ghi nhận sự cố runtime. Vui lòng thử tải lại trang hoặc quay về trang chủ
              để tiếp tục trải nghiệm.
            </p>
            {this.state.error && (
              <div className={styles["error-boundary__details"]}>{this.state.error.toString()}</div>
            )}
            <div className={styles["error-boundary__actions"]}>
              <button
                type="button"
                onClick={this.handleReset}
                className={`${styles["error-boundary__btn"]} ${styles["error-boundary__btn--primary"]}`}
              >
                <span>Tải lại trang</span>
              </button>
              <a
                href="/"
                className={`${styles["error-boundary__btn"]} ${styles["error-boundary__btn--secondary"]}`}
              >
                <span>Về trang chủ</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
