import styles from "./ProblemListToolbar.module.css";
import Icon from "~/components/Icon/Icon";

function ProblemListToolbar({
  filtersData,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedTopic,
  setSelectedTopic,
  selectedLanguage,
  setSelectedLanguage,
  selectedStatus,
  setSelectedStatus,
  openDropdown,
  setOpenDropdown,
  toolbarRef,
  onResetFilters,
}) {
  return (
    <section className={`${styles.toolbar} reveal-card`} ref={toolbarRef}>
      <div className={styles["toolbar__filter-group"]}>
        <span className={styles["toolbar__filter-label"]}>
          <Icon name="Filter" size={15} /> BỘ LỌC
        </span>

        {/* Difficulty Dropdown */}
        <div className={styles["toolbar__select-wrapper"]}>
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "diff" ? null : "diff")}
            className={`${styles["toolbar__select-btn"]} ${
              selectedDifficulty.id !== "all" ? styles["toolbar__select-btn--active"] : ""
            }`}
          >
            <span>{selectedDifficulty.label}</span>
            <Icon name="ChevronDown" size={14} />
          </button>

          {openDropdown === "diff" && (
            <div className={styles["toolbar__dropdown-menu"]}>
              {filtersData.difficulties.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => {
                    setSelectedDifficulty(opt);
                    setOpenDropdown(null);
                  }}
                  className={`${styles["toolbar__dropdown-item"]} ${
                    selectedDifficulty.id === opt.id
                      ? styles["toolbar__dropdown-item--selected"]
                      : ""
                  }`}
                >
                  <span>{opt.label}</span>
                  {selectedDifficulty.id === opt.id && <Icon name="Check" size={14} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Topic Dropdown */}
        <div className={styles["toolbar__select-wrapper"]}>
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "topic" ? null : "topic")}
            className={`${styles["toolbar__select-btn"]} ${
              selectedTopic.id !== "all" ? styles["toolbar__select-btn--active"] : ""
            }`}
          >
            <span>{selectedTopic.label}</span>
            <Icon name="ChevronDown" size={14} />
          </button>

          {openDropdown === "topic" && (
            <div className={styles["toolbar__dropdown-menu"]}>
              {filtersData.topics.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => {
                    setSelectedTopic(opt);
                    setOpenDropdown(null);
                  }}
                  className={`${styles["toolbar__dropdown-item"]} ${
                    selectedTopic.id === opt.id ? styles["toolbar__dropdown-item--selected"] : ""
                  }`}
                >
                  <span>{opt.label}</span>
                  {selectedTopic.id === opt.id && <Icon name="Check" size={14} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <div className={styles["toolbar__select-wrapper"]}>
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "lang" ? null : "lang")}
            className={`${styles["toolbar__select-btn"]} ${
              selectedLanguage.id !== "all" ? styles["toolbar__select-btn--active"] : ""
            }`}
          >
            <span>{selectedLanguage.label}</span>
            <Icon name="ChevronDown" size={14} />
          </button>

          {openDropdown === "lang" && (
            <div className={styles["toolbar__dropdown-menu"]}>
              {filtersData.languages.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => {
                    setSelectedLanguage(opt);
                    setOpenDropdown(null);
                  }}
                  className={`${styles["toolbar__dropdown-item"]} ${
                    selectedLanguage.id === opt.id ? styles["toolbar__dropdown-item--selected"] : ""
                  }`}
                >
                  <span>{opt.label}</span>
                  {selectedLanguage.id === opt.id && <Icon name="Check" size={14} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Dropdown */}
        <div className={styles["toolbar__select-wrapper"]}>
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === "status" ? null : "status")}
            className={`${styles["toolbar__select-btn"]} ${
              selectedStatus.id !== "all" ? styles["toolbar__select-btn--active"] : ""
            }`}
          >
            <span>{selectedStatus.label}</span>
            <Icon name="ChevronDown" size={14} />
          </button>

          {openDropdown === "status" && (
            <div className={styles["toolbar__dropdown-menu"]}>
              {filtersData.statuses.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => {
                    setSelectedStatus(opt);
                    setOpenDropdown(null);
                  }}
                  className={`${styles["toolbar__dropdown-item"]} ${
                    selectedStatus.id === opt.id ? styles["toolbar__dropdown-item--selected"] : ""
                  }`}
                >
                  <span>{opt.label}</span>
                  {selectedStatus.id === opt.id && <Icon name="Check" size={14} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button type="button" onClick={onResetFilters} className={styles["toolbar__reset-btn"]}>
        <Icon name="RotateCcw" size={14} /> Đặt lại
      </button>
    </section>
  );
}

export default ProblemListToolbar;
