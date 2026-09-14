import { Zap } from "lucide-react";
import styles from "./XPActivity.module.css";

function isToday(time) {
  return typeof time === "string" && (time.startsWith("Today") || time === "Just now");
}

function XPActivity({ activity }) {
  if (!activity || activity.length === 0) {
    return (
      <section className={styles.card}>
        <h2 className={styles.title}>Recent XP Activity</h2>
        <div className={styles.empty}>
          <Zap size={22} />
          <p>Your XP journey starts here.</p>
        </div>
      </section>
    );
  }

  const todaysEntries = activity.filter((item) => isToday(item.time));
  const todaysXP = todaysEntries.reduce((sum, item) => sum + (item.xp || 0), 0);

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Recent XP Activity</h2>
      <ul className={styles.list}>
        {activity.map((item) => (
          <li key={item.id} className={styles.row}>
            <span className={styles.iconWrap}>
              <Zap size={15} />
            </span>
            <div className={styles.info}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.time}>{item.time}</span>
            </div>
            <span className={styles.xp}>{item.meta || `+${item.xp} XP`}</span>
          </li>
        ))}
      </ul>

      <div className={styles.summary}>
        <span>Today&apos;s Summary</span>
        <span className={styles.summaryValue}>
          {todaysEntries.length} {todaysEntries.length === 1 ? "activity" : "activities"} &middot; +{todaysXP} XP
        </span>
      </div>
    </section>
  );
}

export default XPActivity;
