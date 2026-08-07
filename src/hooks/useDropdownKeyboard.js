import { useState, useEffect } from "react";

/**
 * Custom hook to handle keyboard navigation (Arrow Up, Arrow Down, Enter, Space, Escape, Tab)
 * for custom dropdown select components.
 */
export default function useDropdownKeyboard({
  isOpen,
  setIsOpen,
  options = [],
  selectedOption,
  onSelect,
}) {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Synchronize focused index when dropdown opens or selectedOption changes
  useEffect(() => {
    if (isOpen && options.length > 0) {
      const selectedIdx = options.findIndex(
        (opt) => (opt.id ?? opt) === (selectedOption?.id ?? selectedOption),
      );
      setFocusedIndex(selectedIdx >= 0 ? selectedIdx : 0);
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen, options, selectedOption]);

  const handleKeyDown = (e) => {
    if (!options || options.length === 0) return;

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) => (prev + 1) % options.length);
        }
        break;
      }

      case "ArrowUp": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
        }
        break;
      }

      case "Enter":
      case " ": {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex >= 0 && focusedIndex < options.length) {
          onSelect(options[focusedIndex]);
          setIsOpen(false);
        }
        break;
      }

      case "Escape": {
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
        break;
      }

      case "Tab": {
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      }

      default:
        break;
    }
  };

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
  };
}
