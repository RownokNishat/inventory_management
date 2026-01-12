"use client";

import Sidebar from "../../components/Sidebar";
import { LayoutProvider, useLayout } from "../../context/LayoutContext";

function LayoutContent({ children }) {
  const { isSidebarOpen, closeSidebar } = useLayout();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
      suppressHydrationWarning
    >
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <main style={{ flex: 1, position: "relative", minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}

export default function InventoryLayout({ children }) {
  return (
    <LayoutProvider>
      <LayoutContent>{children}</LayoutContent>
    </LayoutProvider>
  );
}
