"use client";

import styles from "./Table.module.css";
import Row from "./Row";
import Checkbox from "../Checkbox";

const Table = ({ items }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <div className={styles.colCheck}>
          <Checkbox />
        </div>
        <div className={styles.colItem}>ITEM</div>
        <div className={styles.colLocation}>LOCATION</div>
        <div className={styles.colLabels}>LABELS</div>
        <div className={styles.colQty}>QUANTITY</div>
        <div className={styles.colUpdated}>UPDATED</div>
        <div className={styles.colActions}>ACTIONS</div>
      </div>

      <div className={styles.body}>
        {items.map((item) => (
          <Row key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Table;
