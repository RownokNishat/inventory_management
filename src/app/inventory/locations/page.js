"use client";

import { useState, useMemo } from "react";
import Topbar from "../../../components/Header/Topbar";
import { useLocations, useItems, useLocationsTree } from "../../../lib/hooks";
import styles from "./Locations.module.css";
import Link from "next/link";

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [viewMode, setViewMode] = useState("tree"); // "tree" or "list"
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const { data: locationsData, isLoading: isLocLoading } = useLocations();
  const { data: treeData, isLoading: isTreeLoading } = useLocationsTree();

  // Selected location details
  const selectedLocation = useMemo(() => {
    return (locationsData || []).find((loc) => loc.id === selectedId);
  }, [locationsData, selectedId]);

  // Fetch items for the selected location
  const { data: itemsData, isLoading: isItemsLoading } = useItems(
    1,
    10,
    "",
    selectedId || "SKIP"
  );

  const toggleExpand = (id, e) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  // Search logic: If searching, we show a flat list of matching locations
  const isSearching = searchQuery.length > 0;
  const filteredLocations = useMemo(() => {
    if (!locationsData) return [];
    return locationsData.filter(
      (loc) =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (loc.description &&
          loc.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [locationsData, searchQuery]);

  // Recursive Tree Node Renderer
  const renderTree = (nodes, level = 0) => {
    if (!nodes) return null;
    const sortedNodes = [...nodes].sort((a, b) => a.name.localeCompare(b.name));

    return sortedNodes.map((node) => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = expandedIds.has(node.id);
      const isSelected = selectedId === node.id;

      return (
        <div key={node.id}>
          <div
            className={`${styles.locationItem} ${
              isSelected ? styles.activeItem : ""
            }`}
            style={{ paddingLeft: `${12 + level * 16}px` }}
            onClick={() => {
              setSelectedId(node.id);
              setIsSelectorOpen(false);
            }}
          >
            <span className={styles.itemIcon}>
              {hasChildren ? (
                <div
                  onClick={(e) => toggleExpand(node.id, e)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "4px",
                  }}
                >
                  {isExpanded ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </div>
              ) : (
                <div style={{ width: 14, marginRight: "4px" }} />
              )}
              <HomeIcon size={18} />
            </span>
            <span className={styles.itemName}>{node.name}</span>
            <span className={styles.itemCount}>
              {locationsData?.find((l) => l.id === node.id)?.itemCount || 0}
            </span>
          </div>
          {hasChildren && isExpanded && (
            <div className={styles.treeChildren}>
              {renderTree(node.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Topbar
        onSearch={() => {}}
        title="Locations"
        addButtonText="+ Add Location"
      />

      <div className={styles.container}>
        {/* Mobile Selection Button */}
        <button
          className={styles.mobileSelectBtn}
          onClick={() => setIsSelectorOpen(true)}
        >
          <HomeIcon size={18} />
          <span>
            {selectedLocation ? selectedLocation.name : "Select Location"}
          </span>
          <ChevronDown size={16} />
        </button>

        {/* Left Sidebar */}
        <div
          className={`${styles.sidebar} ${
            isSelectorOpen ? styles.sidebarOpen : ""
          }`}
        >
          <div className={styles.sidebarHeader}>
            <h3>Locations</h3>
            <button onClick={() => setIsSelectorOpen(false)}>×</button>
          </div>
          <div className={styles.scrollArea}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search locations..."
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "14px",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className={styles.newButton}>+ New Location</button>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                }}
              >
                {isSearching ? "Search Results" : "Hierarchy"}
              </span>
              {!isSearching && (
                <button
                  onClick={() =>
                    setViewMode(viewMode === "tree" ? "list" : "tree")
                  }
                  style={{
                    background: "none",
                    border: "none",
                    color: "#3b82f6",
                    fontSize: "11px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {viewMode === "tree" ? "SWITCH TO LIST" : "SWITCH TO TREE"}
                </button>
              )}
            </div>

            <div className={styles.locationList}>
              {isLocLoading || isTreeLoading ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#9ca3af",
                  }}
                >
                  Loading...
                </div>
              ) : isSearching ? (
                filteredLocations.map((loc) => (
                  <div
                    key={loc.id}
                    className={`${styles.locationItem} ${
                      selectedId === loc.id ? styles.activeItem : ""
                    }`}
                    onClick={() => {
                      setSelectedId(loc.id);
                      setIsSelectorOpen(false);
                    }}
                  >
                    <span className={styles.itemIcon}>
                      <HomeIcon size={18} />
                    </span>
                    <span className={styles.itemName}>{loc.name}</span>
                    <span className={styles.itemCount}>
                      {loc.itemCount || 0}
                    </span>
                  </div>
                ))
              ) : viewMode === "tree" ? (
                renderTree(treeData || [])
              ) : (
                (locationsData || []).map((loc) => (
                  <div
                    key={loc.id}
                    className={`${styles.locationItem} ${
                      selectedId === loc.id ? styles.activeItem : ""
                    }`}
                    onClick={() => {
                      setSelectedId(loc.id);
                      setIsSelectorOpen(false);
                    }}
                  >
                    <span className={styles.itemIcon}>
                      <HomeIcon size={18} />
                    </span>
                    <span className={styles.itemName}>{loc.name}</span>
                    <span className={styles.itemCount}>
                      {loc.itemCount || 0}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Selected Location Details */}
        <div className={styles.detailsPanel}>
          {selectedLocation ? (
            <div className={styles.card}>
              <div className={styles.header}>
                <div className={styles.headerLeft}>
                  <div className={styles.bigIcon}>
                    <LocationBoxIcon />
                  </div>
                  <div className={styles.titleSection}>
                    <h1>{selectedLocation.name}</h1>
                    <div className={styles.breadcrumb}>
                      <HomeIcon size={14} /> Locations{" "}
                      <ChevronRight size={12} /> {selectedLocation.name}
                    </div>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button className={`${styles.btn} ${styles.btnEdit}`}>
                    <EditIcon size={14} /> Edit
                  </button>
                  <button className={`${styles.btn} ${styles.btnAddChild}`}>
                    <PlusIcon size={14} /> Add Child
                  </button>
                  <button className={`${styles.btn} ${styles.btnDelete}`}>
                    <TrashIcon size={14} /> Delete
                  </button>
                </div>
              </div>

              <div className={styles.descriptionSection}>
                <span className={styles.sectionLabel}>Description</span>
                <p className={styles.description}>
                  {selectedLocation.description ||
                    "No description provided for this location."}
                </p>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span>Items</span>
                  <div className={styles.statValue}>
                    {selectedLocation.itemCount || 0}
                  </div>
                </div>
                <div className={styles.statItem}>
                  <span>Total Value</span>
                  <div className={styles.statValue}>$0</div>
                </div>
                <div className={styles.statItem}>
                  <span>Created</span>
                  <div className={styles.statValue}>
                    {new Date(selectedLocation.createdAt).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "40px" }}>
                <div className={styles.itemsSectionHeader}>
                  <h2>Items in this Location</h2>
                  <Link href="/inventory" className={styles.viewAll}>
                    View All <ArrowRight size={14} />
                  </Link>
                </div>

                <div className={styles.itemList}>
                  {isItemsLoading ? (
                    <div
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "#9ca3af",
                      }}
                    >
                      Loading items...
                    </div>
                  ) : itemsData?.items?.length > 0 ? (
                    itemsData.items.map((item) => (
                      <div key={item.id} className={styles.itemCard}>
                        <div className={styles.itemThumb}>
                          <PackageIcon />
                        </div>
                        <div className={styles.itemInfo}>
                          <div className={styles.itemNameMain}>
                            {item.name || item.assetId}
                          </div>
                          <div className={styles.itemSubInfo}>
                            {item.labels?.[0]?.text || "No Category"} • Added{" "}
                            {item.updated}
                          </div>
                        </div>
                        <div className={styles.itemPrice}>
                          <span className={styles.priceValue}>$0</span>
                          <span className={styles.status}>Good</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: "24px",
                        textAlign: "center",
                        color: "#9ca3af",
                        border: "1px dashed #e5e7eb",
                        borderRadius: "12px",
                      }}
                    >
                      No items found in this location
                    </div>
                  )}
                </div>

                <div className={styles.addItemRow}>
                  <button className={styles.addItemBtn}>
                    <PlusIcon size={16} /> Add Item to this Location
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.noSelection}>
              <div className={styles.emptyIcon}>📍</div>
              <p>Select a location from the sidebar to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Icons
const HomeIcon = ({ size = 20, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const LocationBoxIcon = () => (
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
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const EditIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const PlusIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ChevronRight = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ChevronDown = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ArrowRight = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const PackageIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
  </svg>
);
