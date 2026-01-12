"use client";

import Button from "../Button";
import styles from "./Topbar.module.css";
import { useLayout } from "../../context/LayoutContext";

const Topbar = ({
  onSearch,
  onExport,
  title = "Inventory",
  addButtonText = "+ Add Item",
}) => {
  const { toggleSidebar } = useLayout();

  return (
    <div className={styles.topbar} suppressHydrationWarning>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button className={styles.menuBtn} onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.actions} suppressHydrationWarning>
        <div className={styles.searchWrapper} suppressHydrationWarning>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            className={styles.searchInput}
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
        <button className={styles.exportButton} onClick={onExport}>
          <span style={{ marginRight: "8px" }}>📥</span> Export
        </button>
        <Button onClick={() => {}}>{addButtonText}</Button>
      </div>
    </div>
  );
};

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export default Topbar;
