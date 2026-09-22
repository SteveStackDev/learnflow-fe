import React, { useRef, useImperativeHandle, forwardRef } from "react";
import ReactPlayer from "react-player";
import styles from "./CourseVideoPlayer.module.css";

export const CourseVideoPlayer = forwardRef(({ lesson, onVideoEnded }, ref) => {
  const playerRef = useRef(null);

  // Expose hàm lấy thời gian hiện tại & hàm tua video ra bên ngoài component cha
  useImperativeHandle(ref, () => ({
    getCurrentTime: () => {
      if (playerRef.current) {
        return playerRef.current.getCurrentTime(); // Trả về số giây (seconds)
      }
      return 0;
    },
    seekTo: (seconds) => {
      if (playerRef.current) {
        playerRef.current.seekTo(seconds, "seconds");
      }
    },
  }));

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11
      ? `https://www.youtube-nocookie.com/embed/${match[2]}`
      : url;
  };

  const videoSrc = lesson?.videoUrl || lesson?.promoVideoUrl || lesson?.url || "";

  return (
    <div className={styles.video_card}>
      <div className={styles.video_screen}>
        {videoSrc ? (
          <ReactPlayer
            ref={playerRef}
            src={getEmbedUrl(videoSrc)}
            width="100%"
            height="100%"
            controls={true}
            config={{
              youtube: {
                playerVars: {
                  host: "https://www.youtube-nocookie.com",
                },
              },
            }}
            onEnded={() => {
              if (onVideoEnded) {
                onVideoEnded();
              }
            }}
          />
        ) : (
          <div className={styles.no_video}>Không tìm thấy đường dẫn video</div>
        )}
      </div>
    </div>
  );
});

export default CourseVideoPlayer;
