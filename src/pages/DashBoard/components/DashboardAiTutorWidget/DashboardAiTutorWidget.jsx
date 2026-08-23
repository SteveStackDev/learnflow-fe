import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./DashboardAiTutorWidget.module.css";

export default function DashboardAiTutorWidget({ presets = [] }) {
  const { toast } = useToast();
  const [inputMsg, setInputMsg] = useState("");
  const [chatLogs, setChatLogs] = useState([
    {
      id: "ai-1",
      sender: "ai",
      text: "Xin chào Alex! Tôi là FySet AI Tutor. Bạn cần giải thích syntax hay debug lỗi code nào hôm nay?",
      time: "Vừa xong",
    },
  ]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputMsg;
    if (!text || !text.trim()) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatLogs((prev) => [...prev, userMsg]);
    setInputMsg("");

    // Simulated AI Quick Answer Reply
    setTimeout(() => {
      let aiText = "FySet AI Tutor: Để tối ưu độ phức tạp thuật toán O(n), bạn có thể dùng Hash Map hoặc Two Pointers thay cho 2 vòng lặp lồng nhau!";
      if (text.includes("Syntax")) {
        aiText = "Lỗi Syntax thường gặp khi thiếu dấu ngoặc nhọn `{}` hoặc quên khai báo kiểu dữ liệu. Hãy dán đoạn mã bị lỗi để tôi kiểm tra giúp bạn!";
      } else if (text.includes("C++")) {
        aiText = "Trong C++, hãy ưu tiên dùng `std::vector` thay vì mảng tĩnh, và dùng `std::cin.tie(NULL)` để tăng tốc độ I/O!";
      } else if (text.includes("useMemo")) {
        aiText = "`useMemo` giúp ghi nhớ kết quả tính toán phức tạp giữa các lần re-render, chỉ tính toán lại khi dependency array thay đổi.";
      }

      setChatLogs((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: aiText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      toast.success("AI Tutor đã trả lời thắc mắc của bạn!", "AI Assistant");
    }, 600);
  };

  return (
    <div className={`${styles.tutor_widget} reveal-card`}>
      <div className={styles.widget_header}>
        <div className={styles.header_left}>
          <div className={styles.ai_avatar_box}>
            <Icon name="Bot" size={18} />
          </div>
          <div>
            <h4 className={styles.widget_title}>AI Tutor Assistant</h4>
            <span className={styles.widget_status}>● Sẵn sàng 24/7</span>
          </div>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className={styles.chat_body}>
        {chatLogs.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.msg_row} ${
              msg.sender === "user" ? styles["msg_row--user"] : styles["msg_row--ai"]
            }`}
          >
            <div className={styles.msg_bubble}>
              <p className={styles.msg_text}>{msg.text}</p>
              <span className={styles.msg_time}>{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Preset Chips */}
      <div className={styles.presets_row}>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            className={styles.preset_chip}
            onClick={() => handleSend(preset)}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Quick Input Bar */}
      <form
        className={styles.input_bar}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Hỏi AI về syntax, bug..."
          className={styles.input_field}
        />
        <button type="submit" className={styles.send_btn} title="Gửi câu hỏi">
          <Icon name="Send" size={15} />
        </button>
      </form>
    </div>
  );
}
