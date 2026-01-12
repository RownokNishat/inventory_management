"use client";

import { useRouter } from "next/navigation";
import styles from "./Row.module.css";
import Checkbox from "../Checkbox";

// Helper function to get contrasting text color
const getContrastColor = (hexColor) => {
  if (!hexColor) return "#000000";

  // Remove # if present
  const hex = hexColor.replace("#", "");

  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white based on luminance
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

const Row = ({ item }) => {
  const router = useRouter();

  const handleRowClick = (e) => {
    // Don't navigate if clicking on checkbox or action button
    if (
      e.target.closest(`.${styles.colCheck}`) ||
      e.target.closest(`.${styles.actionBtn}`)
    ) {
      return;
    }
    router.push(`/inventory/items/${item.id}`);
  };

  return (
    <div className={styles.row} onClick={handleRowClick}>
      <div className={styles.colCheck} onClick={(e) => e.stopPropagation()}>
        <Checkbox />
      </div>
      <div className={styles.colItem}>
        <div className={styles.imageWrapper}>
          {/* Placeholder for item image */}
          <div
            className={styles.imagePlaceholder}
            style={{ backgroundColor: item.color || "#e0e7ff" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.5 }}
            >
              <image width="24" height="24" />
            </svg>
          </div>
        </div>
        <div>
          <div className={styles.itemName}>{item.name}</div>
          <div className={styles.itemMeta}>Model: {item.model}</div>
        </div>
      </div>
      <div className={styles.colLocation}>
        {item.locationTree || item.location}
        {item.subLocation && !item.locationTree && (
          <>
            {" "}
            <span className={styles.separator}>&gt;</span> {item.subLocation}
          </>
        )}
      </div>
      <div className={styles.colLabels}>
        {item.labels.map((label) => {
          const bgColor = label.bg || "#eff6ff";
          const textColor = getContrastColor(bgColor);

          return (
            <span
              key={label.text}
              className={styles.labelBadge}
              style={{
                backgroundColor: bgColor,
                color: textColor,
              }}
            >
              {label.text}
            </span>
          );
        })}
      </div>
      <div className={styles.colQty}>{item.quantity}</div>
      <div className={styles.colUpdated}>{item.updated}</div>
      <div className={styles.colActions} onClick={(e) => e.stopPropagation()}>
        <button className={styles.actionBtn}>⋮</button>
      </div>
    </div>
  );
};

export default Row;
