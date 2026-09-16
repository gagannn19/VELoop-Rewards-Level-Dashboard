import { CheckCircle2, Flame, Zap } from "lucide-react";
import star3d from "../../assets/star-3d.png";
import styles from "./TodaysBoost.module.css";

/** Quick-glance stat row: XP earned today, tasks done, current streak. */
function TodaysBoost({ xpEarned, tasksDone, tasksTotal, streakDays }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <Zap size={14} />
        Today&apos;s Boost
      </div>
      <div className={styles.row}>
      <div className={styles.stat}>
        <span className={`${styles.iconWrap} ${styles.purple}`}>
          <img src={star3d} alt="" className={styles.starIcon} />
        </span>
        <div className={styles.textWrap}>
          <div className={styles.value}>{xpEarned} XP</div>
          <div className={styles.label}>XP Earned</div>
        </div>
      </div>

      <div className={styles.stat}>
        <span className={`${styles.iconWrap} ${styles.blue}`}>
          <CheckCircle2 size={16} />
        </span>
        <div className={styles.textWrap}>
          <div className={styles.value}>
            {tasksDone}/{tasksTotal}
          </div>
          <div className={styles.label}>Tasks Done</div>
        </div>
      </div>

      <div className={styles.stat}>
        <span className={`${styles.iconWrap} ${styles.orange}`}>
          <Flame size={16} />
        </span>
        <div className={styles.textWrap}>
          <div className={styles.value}>{streakDays} Days</div>
          <div className={styles.label}>Streak</div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default TodaysBoost;
