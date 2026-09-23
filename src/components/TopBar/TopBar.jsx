import { useEffect, useRef, useState } from "react";
import { Bell, Menu, Volume2, VolumeX, X } from "lucide-react";
import { NAV_ITEMS } from "../navConfig.js";
import { isSoundMuted, setSoundMuted, playClick } from "../../utils/audio.js";
import styles from "./TopBar.module.css";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
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
  const [muted, setMuted] = useState(() => isSoundMuted());
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
    playClick();
    setDrawerOpen(false);
    onNavigate?.(key);
  };

  const toggleMuted = () => {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
    if (!next) playClick();
  };

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          onClick={() => {
            playClick();
            setDrawerOpen((o) => !o);
          }}
        >
          <Menu size={19} />
        </button>

        <div className={styles.greeting}>
          <h1 className={styles.greetingTitle}>
            <span className={styles.greetingWord}>{getGreeting()},</span>{" "}
            <span className={styles.velooperWord}>VELooper</span>
          </h1>
          <p className={styles.greetingSub}>
            Level up your journey and unlock epic rewards every day.
          </p>
        </div>

        <button
          type="button"
          className={styles.iconBtn}
          aria-label={muted ? "Unmute sound" : "Mute sound"}
          onClick={toggleMuted}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>

        <div className={styles.bellWrap}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={`Notifications${unread ? `, ${unread} new` : ""}`}
            aria-expanded={bellOpen}
            onClick={() => {
              playClick();
              setBellOpen((o) => !o);
            }}
          >
            <Bell size={19} />
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
              <span className={styles.drawerTitle}>VELoop Rewards</span>
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
