import React from "react";
import Icon from "~/components/Icon/Icon";
import { Badge } from "~/components/ui";

export default function AdminUserTransactionsTab({ userState }) {
  const transactions = userState.transactions || [];

  return (
    <div style={{
      backgroundColor: "var(--theme-card-bg, #ffffff)",
      border: "1px solid var(--theme-border-color, rgba(169, 183, 203, 0.3))",
      borderRadius: 20,
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }}>
      <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: 10 }}>
        <Icon name="CreditCard" size={18} /> Payment & Transaction History ({transactions.length})
      </h3>

      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(169, 183, 203, 0.2)" }}>
            <th style={{ padding: "12px 16px" }}>Transaction ID</th>
            <th style={{ padding: "12px 16px" }}>Date</th>
            <th style={{ padding: "12px 16px" }}>Item Description</th>
            <th style={{ padding: "12px 16px" }}>Amount</th>
            <th style={{ padding: "12px 16px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr><td colSpan={5} style={{ padding: 20, textAlign: "center", opacity: 0.7 }}>Chưa có giao dịch thanh toán nào.</td></tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: "1px solid rgba(169, 183, 203, 0.15)" }}>
                <td style={{ padding: "14px 16px", fontFamily: "monospace", fontWeight: 700 }}>{tx.id}</td>
                <td style={{ padding: "14px 16px", opacity: 0.8 }}>{tx.date}</td>
                <td style={{ padding: "14px 16px", fontWeight: 700 }}>{tx.item}</td>
                <td style={{ padding: "14px 16px", fontWeight: 800, color: "#10b981" }}>{tx.amount}</td>
                <td style={{ padding: "14px 16px" }}>
                  <Badge variant="success" size="sm">{tx.status}</Badge>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
