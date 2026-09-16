import { NAV_ITEMS } from "../navConfig.js";
import styles from "./BottomNav.module.css";

/**
 * Fixed bottom tab bar. This stays a single-page app — "Earn" and
 * "Rewards" smooth-scroll to their existing sections, "Wallet" and
 * "Profile" surface a short "coming soon" notice rather than pretending
 * to be real screens. No new routes are introduced anywhere.
 */
function BottomNav({ activeKey = "home", onNavigate }) {
  return (
    <nav className={styles.nav} aria-label="Primary">
      {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
        const active = key === activeKey;
        return (
          <button
            key={key}
            type="button"
            className={`${styles.item} ${active ? styles.active : ""}`}
            aria-current={active ? "page" : undefined}
            onClick={() => onNavigate?.(key)}
          >
            <Icon size={20} strokeWidth={active ? 2.4 : 2} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
