"use client";

import Topbar from "../../../components/Header/Topbar";

export default function ReportsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Topbar
        onSearch={() => {}}
        title="Reports"
        addButtonText="Export Report"
      />
      <div
        style={{
          padding: "32px",
          flex: 1,
          backgroundColor: "#f9fafb",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            padding: "40px",
            textAlign: "center",
            maxWidth: "600px",
            margin: "40px auto",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>📊</div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "12px",
            }}
          >
            Reports Dashboard
          </h1>
          <p
            style={{
              color: "#6b7280",
              lineHeight: "1.6",
              marginBottom: "24px",
            }}
          >
            Analyze your inventory with detailed insights. This page will soon
            feature valuation summaries, item category distribution, and
            location-based reports.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            <div
              style={{
                padding: "16px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                Total Valuation
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                $12,450.00
              </div>
            </div>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                Active Items
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                156
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
