import React, { useState, useRef, useEffect, useMemo } from "react";
import Icon from "~/components/Icon/Icon";
import useDropdownKeyboard from "~/hooks/useDropdownKeyboard";
import styles from "./DropdownMenu.module.css";

export function DropdownMenu({
  options = [],
  value,
  onChange,
  prefix = "",
  placeholder = "Chọn tùy chọn...",
  className = "",
  disabled = false,
  size = "md",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Memoize normalized options array into [{ value, label }] format
  const normalizedOptions = useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === "object" && opt !== null) {
        return { value: opt.value ?? opt.id, label: opt.label ?? opt.name ?? opt.value };
      }
      return { value: opt, label: opt };
    });
  }, [options]);

  // Find currently selected option object
  const selectedOption = normalizedOptions.find((opt) => opt.value === value) || null;

  const handleSelectOption = (optVal) => {
    if (onChange) onChange(optVal);
    setIsOpen(false);
  };

  const { focusedIndex, setFocusedIndex, handleKeyDown } = useDropdownKeyboard({
    isOpen,
    setIsOpen,
    options: normalizedOptions,
    selectedOption,
    onSelect: handleSelectOption,
    containerRef,
  });

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optValue) => {
    if (onChange) onChange(optValue);
    setIsOpen(false);
  };

  const containerClasses = [
    styles.dropdown_container,
    styles[`dropdown--${size}`],
    isOpen ? styles.dropdown_open : "",
    disabled ? styles.dropdown_disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} ref={containerRef} onKeyDown={handleKeyDown}>
      {prefix && <span className={styles.prefix_label}>{prefix}</span>}

      <div className={styles.trigger_wrapper}>
        <button
          type="button"
          className={styles.trigger_btn}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
        >
          <span className={styles.trigger_text}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={`${styles.chevron_icon} ${isOpen ? styles.chevron_up : ""}`}>
            <Icon name="ChevronDown" size={16} strokeWidth={2.5} />
          </span>
        </button>

        {isOpen && (
          <div className={styles.menu_popover} role="listbox">
            {normalizedOptions.map((opt, idx) => {
              const isSelected = selectedOption && selectedOption.value === opt.value;
              const isFocused = focusedIndex === idx;
              return (
                <div
                  key={String(opt.value)}
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.menu_item} ${isSelected ? styles.menu_item_selected : ""} ${isFocused ? styles.menu_item_focused : ""}`}
                  onMouseEnter={() => setFocusedIndex(idx)}
                  onClick={() => handleSelect(opt.value)}
                >
                  <span className={styles.item_label}>{opt.label}</span>
                  {isSelected && (
                    <span className={styles.check_icon}>
                      <Icon name="Check" size={15} strokeWidth={3} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownMenu;
