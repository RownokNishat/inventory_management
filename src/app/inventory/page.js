"use client";

import { useState } from "react";
import Topbar from "../../components/Header/Topbar";
import FilterBar from "../../components/Header/FilterBar";
import Table from "../../components/InventoryTable/Table";
import Pagination from "../../components/InventoryTable/Pagination";
import { useItems } from "../../lib/hooks";

const ITEMS_PER_PAGE = 10;

export default function InventoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useItems(
    currentPage,
    ITEMS_PER_PAGE,
    searchQuery
  );

  // API returns { items: [...], total: ..., page: ..., pageSize: ... }
  // Provide fallback for initial load or error
  const items = data?.items || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleExport = () => {
    const headers = [
      "ID",
      "Name",
      "Asset ID",
      "Location",
      "Quantity",
      "Created At",
    ];
    const csvRows = [headers.join(",")];

    items.forEach((item) => {
      const row = [
        item.id,
        `"${item.name}"`,
        item.assetId,
        `"${item.location?.name || ""}"`,
        item.quantity,
        item.createdAt,
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `inventory_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Topbar onSearch={handleSearch} onExport={handleExport} />
      <FilterBar itemCount={totalItems} />
      <div
        style={{
          padding: "0",
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        suppressHydrationWarning
      >
        {isLoading ? (
          <div
            style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}
            suppressHydrationWarning
          >
            Loading inventory...
          </div>
        ) : error ? (
          <div
            style={{ padding: "40px", textAlign: "center", color: "#ef4444" }}
            suppressHydrationWarning
          >
            Error loading inventory: {error.message}
          </div>
        ) : (
          <>
            <Table items={items} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
