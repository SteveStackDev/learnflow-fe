import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge } from "~/components/ui";
import styles from "./AdminProblemTestCasesTab.module.css";

export default function AdminProblemTestCasesTab({ problemState }) {
  const [testCases, setTestCases] = useState(
    problemState.testCases || [
      { id: 1, input: "[2,7,11,15], 9", expected: "[0,1]", isHidden: false, weight: 1 },
      { id: 2, input: "[3,2,4], 6", expected: "[1,2]", isHidden: false, weight: 1 },
      { id: 3, input: "[3,3], 6", expected: "[0,1]", isHidden: true, weight: 2 },
    ]
  );

  const handleAddTestCase = () => {
    const newTc = {
      id: Date.now(),
      input: "[1,5,9], 10",
      expected: "[0,2]",
      isHidden: true,
      weight: 1,
    };
    setTestCases([...testCases, newTc]);
  };

  return (
    <div className={styles.card}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 className={styles.card_title}>
          <Icon name="CheckSquare" size={18} /> Test Cases Management
        </h3>
        <Button variant="primary" size="sm" onClick={handleAddTestCase}>
          <Icon name="Plus" size={16} /> Add Test Case
        </Button>
      </div>

      <table className={styles.tc_table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Input Parameters</th>
            <th>Expected Output</th>
            <th>Hidden Test?</th>
            <th>Weight</th>
            <th style={{ textAlign: "right" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {testCases.map((tc, idx) => (
            <tr key={tc.id}>
              <td>#{idx + 1}</td>
              <td><span className={styles.code_box}>{tc.input}</span></td>
              <td><span className={styles.code_box}>{tc.expected}</span></td>
              <td>
                <Badge variant={tc.isHidden ? "warning" : "success"} size="sm">
                  {tc.isHidden ? "Hidden (Bảo mật)" : "Public (Công khai)"}
                </Badge>
              </td>
              <td>{tc.weight} point(s)</td>
              <td>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
                  <button type="button" className={styles.action_btn} title="Edit">
                    <Icon name="Edit" size={14} />
                  </button>
                  <button type="button" className={`${styles.action_btn} ${styles.danger_icon_btn}`} title="Delete">
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
