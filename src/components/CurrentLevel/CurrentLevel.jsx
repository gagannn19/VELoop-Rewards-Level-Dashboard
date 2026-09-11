import { Award } from "lucide-react";
import styles from "./CurrentLevel.module.css";

/** The prominent "Level 04" badge shown at the top of the dashboard. */
function CurrentLevel({ level, name }) {
  return (
    <div className={styles.badge}>
      <div className={styles.iconRing}>
        <Award size={26} strokeWidth={2} />
      </div>
      <div>
        <div className={styles.label}>Current Level</div>
        <div className={styles.value}>
          Level {String(level).padStart(2, "0")}
        </div>
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  );
}

export default CurrentLevel;
