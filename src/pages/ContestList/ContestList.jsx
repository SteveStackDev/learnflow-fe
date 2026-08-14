import React, { useState, useMemo } from "react";
import { mockContestListData } from "../../constants/mockContestList";
import ContestHeaderSearch from "./components/ContestHeaderSearch/ContestHeaderSearch";
import ContestTable from "./components/ContestTable/ContestTable";
import ContestPreviewModal from "./components/ContestPreviewModal/ContestPreviewModal";
import styles from "./ContestList.module.css";

export function ContestList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [selectedPreviewContest, setSelectedPreviewContest] = useState(null);

  const tabs = mockContestListData.tabs;

  const filteredContests = useMemo(() => {
    return mockContestListData.contests.filter((item) => {
      const selectedTab = tabs[activeTabIdx];
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.writers.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTabIdx === 0 || selectedTab === "Tất cả") return true;
      if (selectedTab === "Đang diễn ra") return item.status === "LIVE";
      if (selectedTab === "Sắp tới") return item.status === "UPCOMING";
      if (selectedTab === "Đã kết thúc") return item.status === "FINISHED";

      return true;
    });
  }, [searchQuery, activeTabIdx, tabs]);

  return (
    <div className={styles.contest_list_page}>
      {/* Search Bar & Filter Tabs Header */}
      <ContestHeaderSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        tabs={tabs}
        activeTabIdx={activeTabIdx}
        onTabChange={setActiveTabIdx}
      />

      {/* Main Contests Table Section */}
      <ContestTable
        contests={filteredContests}
        onOpenPreview={(contest) => setSelectedPreviewContest(contest)}
      />

      {/* Preview Problems Modal */}
      {selectedPreviewContest && (
        <ContestPreviewModal
          contest={selectedPreviewContest}
          onClose={() => setSelectedPreviewContest(null)}
        />
      )}
    </div>
  );
}

export default ContestList;
