import React, { useState, useRef } from "react";
import Icon from "~/components/Icon/Icon";
import useDropdownKeyboard from "~/hooks/useDropdownKeyboard";
import styles from "./SubmissionsFilter.module.css";

const STATUS_OPTIONS = [
  { id: "ALL", label: "Trạng thái: Tất cả" },
  { id: "AC", label: "Accepted (AC)" },
  { id: "WA", label: "Wrong Answer (WA)" },
  { id: "TLE", label: "Time Limit Exceeded (TLE)" },
  { id: "RE", label: "Runtime Error (RE)" },
  { id: "CE", label: "Compilation Error (CE)" },
];

const LANGUAGE_OPTIONS = [
  { id: "ALL", label: "Ngôn ngữ: Tất cả" },
  { id: "C++", label: "C++" },
  { id: "Python 3", label: "Python 3" },
  { id: "Java 11", label: "Java 11" },
  { id: "JavaScript", label: "JavaScript" },
];

export function SubmissionsFilter({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedLanguage,
  onLanguageChange,
}) {
  // Custom Dropdown State
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef(null);

  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  const selectedStatusObj =
    STATUS_OPTIONS.find((opt) => opt.id === selectedStatus) || STATUS_OPTIONS[0];
  const selectedLangObj =
    LANGUAGE_OPTIONS.find((opt) => opt.id === selectedLanguage) || LANGUAGE_OPTIONS[0];

  const statusKeyboard = useDropdownKeyboard({
    isOpen: isStatusOpen,
    setIsOpen: setIsStatusOpen,
    options: STATUS_OPTIONS,
    selectedOption: selectedStatusObj,
    onSelect: (opt) => onStatusChange(opt.id),
    containerRef: statusRef,
  });

  const langKeyboard = useDropdownKeyboard({
    isOpen: isLangOpen,
    setIsOpen: setIsLangOpen,
    options: LANGUAGE_OPTIONS,
    selectedOption: selectedLangObj,
    onSelect: (opt) => onLanguageChange(opt.id),
    containerRef: langRef,
  });

  return (
    <div className={styles.filter_bar}>
      {/* Search Input */}
      <div className={styles.search_wrap}>
        <Icon name="Search" size={16} className={styles.search_icon} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm theo ID hoặc Tên bài tập..."
          className={styles.search_input}
        />
      </div>

      {/* Custom Status Dropdown */}
      <div className={styles.select_wrap} ref={statusRef}>
        <button
          type="button"
          onClick={() => {
            setIsStatusOpen(!isStatusOpen);
            setIsLangOpen(false);
          }}
          onKeyDown={statusKeyboard.handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isStatusOpen}
          aria-label="Lọc theo trạng thái"
          className={`${styles.filter_select_btn} ${isStatusOpen ? styles.filter_select_btn_open : ""}`}
        >
          <span>{selectedStatusObj.label}</span>
          <Icon name="ChevronDown" size={14} className={styles.select_arrow} />
        </button>

        {isStatusOpen && (
          <div className={styles.dropdown_menu} role="listbox">
            {STATUS_OPTIONS.map((option, index) => (
              <div
                key={option.id}
                role="option"
                aria-selected={selectedStatus === option.id}
                onClick={() => {
                  onStatusChange(option.id);
                  setIsStatusOpen(false);
                }}
                onMouseEnter={() => statusKeyboard.setFocusedIndex(index)}
                className={`${styles.dropdown_item} ${
                  selectedStatus === option.id ? styles.dropdown_item_selected : ""
                } ${
                  statusKeyboard.focusedIndex === index ? styles.dropdown_item_focused : ""
                }`}
              >
                <span>{option.label}</span>
                {selectedStatus === option.id && <Icon name="Check" size={14} />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Language Dropdown */}
      <div className={styles.select_wrap} ref={langRef}>
        <button
          type="button"
          onClick={() => {
            setIsLangOpen(!isLangOpen);
            setIsStatusOpen(false);
          }}
          onKeyDown={langKeyboard.handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isLangOpen}
          aria-label="Lọc theo ngôn ngữ"
          className={`${styles.filter_select_btn} ${isLangOpen ? styles.filter_select_btn_open : ""}`}
        >
          <span>{selectedLangObj.label}</span>
          <Icon name="ChevronDown" size={14} className={styles.select_arrow} />
        </button>

        {isLangOpen && (
          <div className={styles.dropdown_menu} role="listbox">
            {LANGUAGE_OPTIONS.map((option, index) => (
              <div
                key={option.id}
                role="option"
                aria-selected={selectedLanguage === option.id}
                onClick={() => {
                  onLanguageChange(option.id);
                  setIsLangOpen(false);
                }}
                onMouseEnter={() => langKeyboard.setFocusedIndex(index)}
                className={`${styles.dropdown_item} ${
                  selectedLanguage === option.id ? styles.dropdown_item_selected : ""
                } ${
                  langKeyboard.focusedIndex === index ? styles.dropdown_item_focused : ""
                }`}
              >
                <span>{option.label}</span>
                {selectedLanguage === option.id && <Icon name="Check" size={14} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SubmissionsFilter;
