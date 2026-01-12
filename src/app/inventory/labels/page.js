"use client";

import { useState } from "react";
import Topbar from "../../../components/Header/Topbar";
import { useLabels } from "../../../lib/hooks";

export default function LabelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useLabels();

  const labels = (data || []).filter(
    (label) =>
      label.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (label.description &&
        label.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Topbar
        onSearch={setSearchQuery}
        title="Labels"
        addButtonText="+ Add Label"
      />
      <div
        style={{
          padding: "24px",
          flex: 1,
          overflowY: "auto",
        }}
        suppressHydrationWarning
      >
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#111827" }}>
            Labels
          </h1>
          <span style={{ color: "#6b7280", fontSize: "14px" }}>
            {labels.length} labels total
          </span>
        </div>

        {isLoading ? (
          <div
            style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}
          >
            Loading labels...
          </div>
        ) : error ? (
          <div
            style={{ padding: "40px", textAlign: "center", color: "#ef4444" }}
          >
            Error loading labels: {error.message}
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead
                style={{
                  backgroundColor: "#f9fafb",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <tr>
                  <th
                    style={{
                      padding: "12px 16px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#374151",
                      textTransform: "uppercase",
                    }}
                  >
                    Label
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#374151",
                      textTransform: "uppercase",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#374151",
                      textTransform: "uppercase",
                    }}
                  >
                    Color Code
                  </th>
                </tr>
              </thead>
              <tbody style={{ divide: "y", divideColor: "#e5e7eb" }}>
                {labels.map((label) => (
                  <tr
                    key={label.id}
                    style={{ borderBottom: "1px solid #f3f4f6" }}
                  >
                    <td style={{ padding: "16px" }}>
                      <span
                        style={{
                          backgroundColor: label.color || "#eff6ff",
                          color: "#1e3a8a",
                          padding: "4px 12px",
                          borderRadius: "9999px",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        {label.name}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        fontSize: "14px",
                        color: "#6b7280",
                      }}
                    >
                      {label.description || "No description"}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        fontSize: "14px",
                        color: "#6b7280",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "4px",
                            backgroundColor: label.color || "#eff6ff",
                            border: "1px solid #e5e7eb",
                          }}
                        ></div>
                        {label.color || "Default"}
                      </div>
                    </td>
                  </tr>
                ))}
                {labels.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      style={{
                        padding: "40px",
                        textAlign: "center",
                        color: "#9ca3af",
                      }}
                    >
                      No labels found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
