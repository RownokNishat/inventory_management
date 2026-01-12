import styles from "./Row.module.css";
import Checkbox from "../Checkbox";

const Row = ({ item }) => {
  return (
    <div className={styles.row}>
      <div className={styles.colCheck}>
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
        {item.location}
        {item.subLocation && (
          <>
            {" "}
            <span className={styles.separator}>&gt;</span> {item.subLocation}
          </>
        )}
      </div>
      <div className={styles.colLabels}>
        {item.labels.map((label) => (
          <span
            key={label.text}
            className={styles.labelBadge}
            style={{ backgroundColor: label.bg, color: label.textCol }}
          >
            {label.text}
          </span>
        ))}
      </div>
      <div className={styles.colQty}>{item.quantity}</div>
      <div className={styles.colUpdated}>{item.updated}</div>
      <div className={styles.colActions}>
        <button className={styles.actionBtn}>⋮</button>
      </div>
    </div>
  );
};

export default Row;
