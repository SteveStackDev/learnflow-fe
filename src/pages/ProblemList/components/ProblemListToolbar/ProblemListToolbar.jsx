import styles from "./ProblemListToolbar.module.css";
import Icon from "~/components/Icon/Icon";
import { DropdownMenu } from "~/components/ui";

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
  toolbarRef,
  onResetFilters,
}) {
  const isFiltered =
    selectedDifficulty.id !== "all" ||
    selectedTopic.id !== "all" ||
    selectedLanguage.id !== "all" ||
    selectedStatus.id !== "all";

  return (
    <section className={`${styles.toolbar} reveal-card`} ref={toolbarRef}>
      <div className={styles["toolbar__filter-group"]}>
        <span className={styles["toolbar__filter-label"]}>
          <Icon name="Filter" size={15} /> BỘ LỌC
        </span>

        {/* Difficulty Dropdown */}
        <DropdownMenu
          options={filtersData.difficulties.map((opt) => ({ value: opt.id, label: opt.label }))}
          value={selectedDifficulty.id}
          onChange={(val) => {
            const target = filtersData.difficulties.find((d) => d.id === val);
            if (target) setSelectedDifficulty(target);
          }}
          size="sm"
        />

        {/* Topic Dropdown */}
        <DropdownMenu
          options={filtersData.topics.map((opt) => ({ value: opt.id, label: opt.label }))}
          value={selectedTopic.id}
          onChange={(val) => {
            const target = filtersData.topics.find((t) => t.id === val);
            if (target) setSelectedTopic(target);
          }}
          size="sm"
        />

        {/* Language Dropdown */}
        <DropdownMenu
          options={filtersData.languages.map((opt) => ({ value: opt.id, label: opt.label }))}
          value={selectedLanguage.id}
          onChange={(val) => {
            const target = filtersData.languages.find((l) => l.id === val);
            if (target) setSelectedLanguage(target);
          }}
          size="sm"
        />

        {/* Status Dropdown */}
        <DropdownMenu
          options={filtersData.statuses.map((opt) => ({ value: opt.id, label: opt.label }))}
          value={selectedStatus.id}
          onChange={(val) => {
            const target = filtersData.statuses.find((s) => s.id === val);
            if (target) setSelectedStatus(target);
          }}
          size="sm"
        />

        {/* Reset Filters Button */}
        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className={styles["toolbar__reset-btn"]}
            title="Xóa bộ lọc"
          >
            <Icon name="RotateCcw" size={13} />
            <span>Đặt lại</span>
          </button>
        )}
      </div>
    </section>
  );
}

export default ProblemListToolbar;
