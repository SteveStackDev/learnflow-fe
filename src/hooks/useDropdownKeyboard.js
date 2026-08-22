import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to handle keyboard navigation (Arrow Up, Arrow Down, Enter, Space, Escape)
 * for custom dropdown select components.
 */
export default function useDropdownKeyboard({
  isOpen,
  setIsOpen,
  options = [],
  selectedOption,
  onSelect,
  containerRef,
}) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const focusedIndexRef = useRef(-1);

  // Sync focused index ref safely inside effect
  useEffect(() => {
    focusedIndexRef.current = focusedIndex;
  }, [focusedIndex]);

  // Set initial focused index ONLY when dropdown opens
  useEffect(() => {
    if (isOpen && options.length > 0) {
      const currentVal = selectedOption?.value ?? selectedOption?.id ?? selectedOption;
      const selectedIdx = options.findIndex((opt) => {
        const val = opt?.value ?? opt?.id ?? opt;
        return val === currentVal;
      });
      const initialIdx = selectedIdx >= 0 ? selectedIdx : 0;
      setFocusedIndex(initialIdx);
    } else {
      setFocusedIndex(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Auto scroll focused item into view when navigating with Keyboard keys
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && containerRef?.current) {
      const popover = containerRef.current.querySelector('[role="listbox"]');
      const items = popover?.querySelectorAll('[role="option"]');
      if (items && items[focusedIndex]) {
        items[focusedIndex].scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen, focusedIndex, containerRef]);

  // Global keydown event listener when dropdown is OPEN
  useEffect(() => {
    if (!isOpen || !options || options.length === 0) return;

    const handleGlobalKeyDown = (e) => {
      // Don't intercept if user is actively typing in an input or textarea outside
      const targetTag = e.target?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea") return;

      const key = e.key;
      const isDown = key === "ArrowDown";
      const isUp = key === "ArrowUp";

      if (isDown) {
        e.preventDefault();
        e.stopPropagation();
        setFocusedIndex((prev) => (prev < 0 ? 0 : (prev + 1) % options.length));
      } else if (isUp) {
        e.preventDefault();
        e.stopPropagation();
        setFocusedIndex((prev) =>
          prev < 0 ? options.length - 1 : (prev - 1 + options.length) % options.length
        );
      } else if (key === "Enter" || key === " ") {
        e.preventDefault();
        e.stopPropagation();
        const currentIdx = focusedIndexRef.current >= 0 ? focusedIndexRef.current : 0;
        if (options[currentIdx]) {
          const opt = options[currentIdx];
          const val = opt?.value !== undefined ? opt.value : opt;
          if (onSelect) onSelect(val);
        }
        setIsOpen(false);
      } else if (key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown, true);
    };
  }, [isOpen, options, onSelect, setIsOpen]);

  const handleKeyDown = (e) => {
    if (!options || options.length === 0) return;

    const key = e.key;
    const isDown = key === "ArrowDown";
    const isUp = key === "ArrowUp";

    if (!isOpen && (isDown || isUp)) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
  };
}
