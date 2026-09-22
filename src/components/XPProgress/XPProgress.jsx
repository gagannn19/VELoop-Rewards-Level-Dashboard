import { useEffect, useState } from "react";
import { playClick } from "../../utils/audio.js";
import styles from "./XPProgress.module.css";

/** Animated XP bar: fills from 0 to the real percentage on mount/update. */
function XPProgress({ currentXP, requiredXP, nextLevel, onViewActivity }) {
  const targetPct = Math.min(100, Math.round((currentXP / requiredXP) * 100));
  const [pct, setPct] = useState(0);
  const remaining = Math.max(0, requiredXP - currentXP);

  useEffect(() => {
    const id = requestAnimationFrame(() => setPct(targetPct));
    return () => cancelAnimationFrame(id);
  }, [targetPct]);

  return (
    <div className={styles.wrap}>
      <div
        className={styles.tick}
        style={{ left: `clamp(18px, ${pct}%, calc(100% - 18px))` }}
      >
        <span>{pct}%</span>
        <div className={styles.tickArrow} />
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

      <div className={styles.footerRow}>
        <span className={styles.remaining}>
          {remaining > 0
            ? `${remaining.toLocaleString()} XP needed for level ${String(nextLevel).padStart(2, "0")}`
            : "Ready to level up!"}
        </span>
        {onViewActivity && (
          <button
            type="button"
            className={styles.activityLink}
            onClick={() => {
              playClick();
              onViewActivity();
            }}
          >
            View Activity ›
          </button>
        )}
      </div>
    </div>
  );
}

export default XPProgress;
