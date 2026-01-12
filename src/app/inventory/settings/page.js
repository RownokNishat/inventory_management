"use client";

import Topbar from "../../../components/Header/Topbar";

export default function SettingsPage() {
  const sections = [
    { title: "General", icon: "⚙️", desc: "Profile settings, language, and display preferences." },
    { title: "Notifications", icon: "🔔", desc: "Configure how and when you receive inventory alerts." },
    { title: "Security", icon: "🛡️", desc: "Password management and two-factor authentication." },
    { title: "Integrations", icon: "🔌", desc: "Connect Home Inventory with external APIs and services." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Topbar
        onSearch={() => {}}
        title="Settings"
        addButtonText="Save Changes"
      />
      <div
        style={{
          padding: "16px",
          flex: 1,
          backgroundColor: "#f9fafb",
          overflowY: "auto",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "16px 0" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "8px",
            }}
          >
            Settings
          </h1>
          <p style={{ color: "#6b7280", marginBottom: "32px" }}>
            Manage your account preferences and application configuration.
          </p>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {sections.map((section) => (
              <div
                key={section.title}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {section.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {section.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                    {section.desc}
                  </p>
                </div>
                <div style={{ color: "#d1d5db", fontSize: "20px" }}>›</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
