import { useState, useEffect, useRef } from "react";

/**
 * AnimatedCounter component
 * Animates numbers from 0 to target value on page load / mount or scroll into view.
 * Handles strings like "45.2K", "12 Trận", "1,200+", "50.0%", "9"
 */
function AnimatedCounter({ value, duration = 1200 }) {
  const [displayValue, setDisplayValue] = useState(() => formatZero(value));
  const elementRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    let animationFrameId;
    let startTime = null;

    const parsed = parseValue(value);

    if (parsed.numericValue === 0) {
      setDisplayValue(String(value ?? "0"));
      return;
    }

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing: easeOutCubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentNumeric = parsed.numericValue * easeProgress;

        setDisplayValue(formatCurrentValue(currentNumeric, parsed));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setDisplayValue(String(value));
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    } else {
      startAnimation();
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [value, duration]);

  return <span ref={elementRef}>{displayValue}</span>;
}

/**
 * Helper to parse value like "45.2K", "1,200+", "50.0%", "12 Trận"
 */
function parseValue(rawVal) {
  const str = String(rawVal ?? "");
  const match = str.match(/([0-9.,]+)/);

  if (!match) {
    return { numericValue: 0, prefix: "", suffix: str, decimals: 0, hasCommas: false };
  }

  const numStr = match[1];
  const startIndex = match.index;
  const endIndex = startIndex + numStr.length;

  const prefix = str.substring(0, startIndex);
  const suffix = str.substring(endIndex);

  const hasCommas = numStr.includes(",");
  const cleanNumStr = numStr.replace(/,/g, "");
  const numericValue = parseFloat(cleanNumStr) || 0;

  const dotIndex = cleanNumStr.indexOf(".");
  const decimals = dotIndex !== -1 ? cleanNumStr.length - dotIndex - 1 : 0;

  return {
    numericValue,
    prefix,
    suffix,
    decimals,
    hasCommas,
  };
}

/**
 * Formats 0 placeholder matching the value pattern
 */
function formatZero(rawVal) {
  const parsed = parseValue(rawVal);
  const zeroStr = (0).toFixed(parsed.decimals);
  return `${parsed.prefix}${zeroStr}${parsed.suffix}`;
}

/**
 * Formats current numeric value during animation
 */
function formatCurrentValue(num, parsed) {
  let numStr = num.toFixed(parsed.decimals);
  if (parsed.hasCommas) {
    const parts = numStr.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    numStr = parts.join(".");
  }
  return `${parsed.prefix}${numStr}${parsed.suffix}`;
}

export default AnimatedCounter;
