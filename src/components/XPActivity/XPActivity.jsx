import { Zap } from "lucide-react";
import styles from "./XPActivity.module.css";

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
            <span className={styles.xp}>+{item.xp} XP</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default XPActivity;
