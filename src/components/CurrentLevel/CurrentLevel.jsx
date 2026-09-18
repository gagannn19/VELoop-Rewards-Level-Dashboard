import styles from "./CurrentLevel.module.css";

/** The prominent hexagonal "Level 04" badge shown at the top of the dashboard. */
function CurrentLevel({ level, name }) {
  return (
    <div className={styles.badge}>
      <div className={styles.hexStage}>
        <div className={styles.hex}>
          <div className={styles.hexInner}>
            <span className="lightSweep" aria-hidden="true" />
            <span className={styles.hexLabel}>LEVEL</span>
            <span className={styles.hexValue}>{String(level).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.label}>Current Level</div>
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  );
}

export default CurrentLevel;
