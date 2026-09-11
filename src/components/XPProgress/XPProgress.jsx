import { useEffect, useState } from "react";
import styles from "./XPProgress.module.css";

/** Animated XP bar: fills from 0 to the real percentage on mount/update. */
function XPProgress({ currentXP, requiredXP }) {
  const targetPct = Math.min(100, Math.round((currentXP / requiredXP) * 100));
  const [pct, setPct] = useState(0);
  const remaining = Math.max(0, requiredXP - currentXP);

  useEffect(() => {
    const id = requestAnimationFrame(() => setPct(targetPct));
    return () => cancelAnimationFrame(id);
  }, [targetPct]);

  return (
    <div className={styles.wrap}>
      <div className={styles.numbers}>
        <span className={styles.current}>{currentXP.toLocaleString()}</span>
        <span className={styles.divider}>/</span>
        <span className={styles.required}>
          {requiredXP.toLocaleString()} XP
        </span>
      </div>

      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={targetPct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>

      <div className={styles.remaining}>
        {remaining > 0
          ? `${remaining.toLocaleString()} XP remaining`
          : "Ready to level up!"}
      </div>
    </div>
  );
}

export default XPProgress;
