import React from "react";
import { Pagination } from "~/components/ui";
import styles from "./SubmissionsPagination.module.css";

export function SubmissionsPagination({
  currentPage = 1,
  totalPages = 5,
  totalItems = 1248,
  pageSize = 5,
  onPageChange,
}) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={styles.pagination_wrapper}>
      <span className={styles.info_text}>
        Hiển thị {startItem} - {endItem} của {totalItems} kết quả
      </span>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default SubmissionsPagination;
