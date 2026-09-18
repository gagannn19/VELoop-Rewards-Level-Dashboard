import { useEffect, useRef, useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../navConfig.js";
import styles from "./TopBar.module.css";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

/**
 * Splits text into per-letter spans that inflate in on a stagger (each
 * letter balloons up past full size, then settles) — used for "VELooper"
 * only.
 */
function InflateLetters({ text }) {
  return Array.from(text).map((char, i) => (
    <span
      key={i}
      className={styles.inflateLetter}
      style={{ animationDelay: `${i * 0.06}s` }}
    >
      {char === " " ? " " : char}
    </span>
  ));
}

/**
 * App chrome: a hamburger that opens a lightweight nav drawer (mirroring
 * BottomNav), a time-of-day greeting, and a notification bell surfacing
 * the most recent activity. This is presentational navigation only —
 * everything still lives on the one dashboard route.
 */
function TopBar({ activity = [], onNavigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const wrapRef = useRef(null);

  const recent = activity.filter((a) => a.time === "Just now");
  const unread = recent.length;

  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setBellOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setBellOpen(false);
        setDrawerOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleNav = (key) => {
    setDrawerOpen(false);
    onNavigate?.(key);
  };

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((o) => !o)}
        >
          <Menu size={20} />
        </button>

        <div className={styles.greeting}>
          <h1 className={styles.greetingTitle} aria-label={`${getGreeting()}, VELooper! 👋`}>
            <span aria-hidden="true">
              <span className={styles.greetingWord}>{getGreeting()}, </span>
              <span className={styles.velooperWord}>
                <InflateLetters text="VELooper!" />
              </span>
            </span>{" "}
            <span className={styles.wave} aria-hidden="true">
              👋
            </span>
          </h1>
          <p className={styles.greetingSub}>
            Level up your journey and unlock epic rewards every day.
          </p>
        </div>

        <div className={styles.bellWrap}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={`Notifications${unread ? `, ${unread} new` : ""}`}
            aria-expanded={bellOpen}
            onClick={() => setBellOpen((o) => !o)}
          >
            <Bell size={20} />
            {unread > 0 && <span className={styles.badge}>{unread > 9 ? "9+" : unread}</span>}
          </button>

          {bellOpen && (
            <div className={styles.bellPanel} role="dialog" aria-label="Recent notifications">
              <div className={styles.bellPanelHeader}>Notifications</div>
              {recent.length === 0 ? (
                <p className={styles.bellEmpty}>You&apos;re all caught up.</p>
              ) : (
                <ul className={styles.bellList}>
                  {recent.map((item) => (
                    <li key={item.id}>
                      <span className={styles.bellLabel}>{item.label}</span>
                      <span className={styles.bellMeta}>
                        {item.meta || (item.ves ? `+${item.ves} VEs` : `+${item.xp} XP`)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {drawerOpen && (
        <>
          <button
            type="button"
            className={styles.overlay}
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          />
          <nav className={styles.drawer} aria-label="Main navigation">
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>VeLoop Rewards</span>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <ul className={styles.drawerList}>
              {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                <li key={key}>
                  <button
                    type="button"
                    className={styles.drawerItem}
                    onClick={() => handleNav(key)}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default TopBar;
