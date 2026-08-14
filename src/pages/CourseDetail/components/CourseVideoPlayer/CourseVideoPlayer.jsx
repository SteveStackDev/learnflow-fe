import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./CourseVideoPlayer.module.css";

export function CourseVideoPlayer({ lesson, onTogglePlay }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState("1.25x");
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    if (onTogglePlay) onTogglePlay(!isPlaying);
  };

  return (
    <div className={styles.video_card}>
      {/* Video Display Screen */}
      <div className={styles.video_screen}>
        <img
          src={lesson.videoPosterUrl}
          alt={lesson.lessonTitle}
          className={styles.video_poster}
        />
        <div className={styles.screen_overlay} />

        {/* Center Big Play Button */}
        <button
          type="button"
          onClick={togglePlay}
          className={styles.center_play_btn}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={36} />
        </button>

        {/* Top Header Overlay info */}
        <div className={styles.video_top_info}>
          <span className={styles.badge_tag}>FySet Space</span>
          <span className={styles.lesson_code_tag}>{lesson.lessonTitle}</span>
        </div>
      </div>

      {/* Video Control Bar */}
      <div className={styles.control_bar}>
        <div className={styles.control_left}>
          <button
            type="button"
            onClick={togglePlay}
            className={styles.ctrl_btn}
            title={isPlaying ? "Tạm dừng" : "Phát"}
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={18} />
          </button>

          <button type="button" className={styles.ctrl_btn} title="Tua lùi 10s">
            <Icon name="RotateCcw" size={16} />
          </button>

          <span className={styles.time_display}>
            {lesson.currentTime} / {lesson.videoDuration}
          </span>
        </div>

        {/* Progress Slider Track */}
        <div className={styles.progress_track}>
          <div className={styles.progress_fill} style={{ width: "44%" }} />
          <div className={styles.progress_handle} style={{ left: "44%" }} />
        </div>

        <div className={styles.control_right}>
          {/* Playback Speed selector */}
          <div className={styles.speed_wrapper}>
            <button
              type="button"
              onClick={() => setIsSpeedOpen((prev) => !prev)}
              className={styles.speed_btn}
            >
              <span>{speed}</span>
            </button>

            {isSpeedOpen && (
              <div className={styles.speed_dropdown}>
                {["0.75x", "1.0x", "1.25x", "1.5x", "2.0x"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setSpeed(val);
                      setIsSpeedOpen(false);
                    }}
                    className={`${styles.speed_option} ${
                      speed === val ? styles["speed_option--active"] : ""
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="button" className={styles.ctrl_btn} title="Cài đặt">
            <Icon name="Settings" size={18} />
          </button>

          <button type="button" className={styles.ctrl_btn} title="Toàn màn hình">
            <Icon name="Maximize" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseVideoPlayer;
