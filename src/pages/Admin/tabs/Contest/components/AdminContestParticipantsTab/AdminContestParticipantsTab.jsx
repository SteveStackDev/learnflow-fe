import React from "react";
import Icon from "~/components/Icon/Icon";
import { Badge } from "~/components/ui";
import { MOCK_CONTEST_PARTICIPANTS } from "~/constants/mockAdminContest";
import styles from "./AdminContestParticipantsTab.module.css";

export default function AdminContestParticipantsTab() {
  return (
    <div className={styles.card}>
      <h3 className={styles.card_title}>
        <Icon name="Users" size={18} /> Registered Participants ({MOCK_CONTEST_PARTICIPANTS.length})
      </h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Participant</th>
            <th>Email Address</th>
            <th>Joined Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_CONTEST_PARTICIPANTS.map((usr, idx) => (
            <tr key={usr.id}>
              <td>#{idx + 1}</td>
              <td>
                <div className={styles.user_info}>
                  <span className={styles.user_name}>{usr.name}</span>
                  <span className={styles.user_sub}>@{usr.username}</span>
                </div>
              </td>
              <td>{usr.email}</td>
              <td>{usr.joinedDate}</td>
              <td>
                <Badge variant="success" size="sm">
                  {usr.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
