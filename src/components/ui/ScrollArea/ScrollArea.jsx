import React, { forwardRef } from "react";
import styles from "./ScrollArea.module.css";

export const ScrollArea = forwardRef(function ScrollArea(
  { children, className = "", height, maxHeight, style = {}, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={`${styles.scroll_area} ${className}`}
      style={{
        ...(height ? { height } : {}),
        ...(maxHeight ? { maxHeight } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});

export default ScrollArea;
