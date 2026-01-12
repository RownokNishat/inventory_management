"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import itemsMock from "../../../../mockData/items.json";

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");

  // Find the item from mock data
  const item = itemsMock.items.find((i) => i.id === params.id);

  if (!item) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Item not found</div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <button onClick={() => router.push("/inventory")} className={styles.breadcrumbLink}>
            Inventory
          </button>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{item.name}</span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
          <button className={styles.btnSecondary}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
            Add Attachment
          </button>
          <button className={styles.btnDanger}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{item.name}</h1>
          <div className={styles.badges}>
            {item.labels && item.labels.length > 0 && item.labels.map((label) => (
              <span
                key={label.id}
                className={styles.badge}
                style={{ backgroundColor: label.color + "20", color: label.color }}
              >
                {label.name}
              </span>
            ))}
            {item.archived && (
              <span className={styles.badgeWarning}>Archived</span>
            )}
            {!item.archived && (
              <span className={styles.badgeSuccess}>Active Warranty</span>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Left Column - Image */}
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <div className={styles.imagePlaceholder}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            </div>
            <div className={styles.thumbnails}>
              <button className={styles.thumbnail}>
                <div className={styles.thumbnailPlaceholder}></div>
              </button>
              <button className={styles.addImageBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className={styles.detailsSection}>
            <div className={styles.detailsCard}>
              <h3 className={styles.cardTitle}>Key Details</h3>

              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Location</div>
                <div className={styles.detailValue}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {item.location?.name || "Unknown"}
                </div>
              </div>

              {item.labels && item.labels.length > 0 && (
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Labels</div>
                  <div className={styles.detailValue}>
                    <div className={styles.labelsList}>
                      {item.labels.map((label) => (
                        <span
                          key={label.id}
                          className={styles.labelBadge}
                          style={{ backgroundColor: label.color + "20", color: label.color }}
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Quantity</div>
                <div className={styles.detailValue}>{item.quantity}</div>
              </div>

              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Purchase Date</div>
                <div className={styles.detailValue}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {formatDate(item.createdAt)}
                </div>
              </div>

              {item.purchasePrice > 0 && (
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Purchase Price</div>
                  <div className={styles.detailValue}>${item.purchasePrice.toFixed(2)}</div>
                </div>
              )}

              {!item.archived && (
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Warranty</div>
                  <div className={styles.detailValue}>
                    <span className={styles.warrantyBadge}>Active until March 15, 2026</span>
                  </div>
                </div>
              )}

              {item.description && (
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Notes</div>
                  <div className={styles.detailValue}>{item.description}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className={styles.tabsSection}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "details" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <button
              className={`${styles.tab} ${activeTab === "attachments" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("attachments")}
            >
              Attachments
              <span className={styles.tabBadge}>3</span>
            </button>
            <button
              className={`${styles.tab} ${activeTab === "activity" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("activity")}
            >
              Activity
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "details" && (
              <div className={styles.tabPanel}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoSection}>
                    <h4 className={styles.infoTitle}>Product Information</h4>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Brand</span>
                      <span className={styles.infoValue}>Sony</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Model</span>
                      <span className={styles.infoValue}>{item.assetId}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Color</span>
                      <span className={styles.infoValue}>Black</span>
                    </div>
                  </div>

                  <div className={styles.infoSection}>
                    <h4 className={styles.infoTitle}>Additional Details</h4>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Serial Number</span>
                      <span className={styles.infoValue}>123456789</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Purchased From</span>
                      <span className={styles.infoValue}>Best Buy</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Last Updated</span>
                      <span className={styles.infoValue}>
                        {formatDate(item.updatedAt)}, {formatTime(item.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "attachments" && (
              <div className={styles.tabPanel}>
                <p className={styles.emptyState}>No attachments yet</p>
              </div>
            )}

            {activeTab === "activity" && (
              <div className={styles.tabPanel}>
                <p className={styles.emptyState}>No activity recorded</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
