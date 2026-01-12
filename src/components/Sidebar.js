'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const navItems = [
    { name: "Inventory", href: "/inventory", icon: <InventoryIcon /> },
    { name: "Locations", href: "/inventory/locations", icon: <LocationIcon /> },
    { name: "Labels", href: "/inventory/labels", icon: <TagIcon /> },
    { name: "Reports", href: "/inventory/reports", icon: <ChartIcon /> },
    { name: "Settings", href: "/inventory/settings", icon: <SettingsIcon /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
        suppressHydrationWarning
      >
        <div className={styles.logoContainer} suppressHydrationWarning>
          <div className={styles.logoIcon} suppressHydrationWarning>
            <InventoryIcon color="white" />
          </div>
          <div
            className={styles.logoText}
            suppressHydrationWarning
            style={{ flex: 1 }}
          >
            <h1 className={styles.brandName}>Home Inventory</h1>
            <span className={styles.brandSub}>Manage your items</span>
          </div>
          <button className={styles.closeSidebarBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <nav className={styles.nav} suppressHydrationWarning>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                onClick={onClose}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className={styles.profile} suppressHydrationWarning>
          <img
            src="/avatar.png"
            alt="Profile"
            className={styles.avatar}
            onError={(e) => (e.target.style.display = "none")}
          />
          <div className={styles.profileInfo} suppressHydrationWarning>
            <div className={styles.userName} suppressHydrationWarning>
              John Smith
            </div>
            <div className={styles.userEmail} suppressHydrationWarning>
              john@example.com
            </div>
          </div>
          <button className={styles.moreButton}>⋮</button>
        </div>
      </aside>
    </>
  );
};

// Simple Icons
const InventoryIcon = ({ color = "currentColor" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const TagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
);

const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);

export default Sidebar;
