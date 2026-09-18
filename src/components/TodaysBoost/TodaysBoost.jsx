import { Zap } from "lucide-react";
import star3d from "../../assets/star-3d.png";
import taskChecklist3d from "../../assets/task-checklist-3d.png";
import styles from "./TodaysBoost.module.css";

/** Inline 3D-style flame icon (no external asset — avoids stock-image licensing). */
function FlameIcon3D({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="flameOuterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffc266" />
          <stop offset="45%" stopColor="#ff7a2e" />
          <stop offset="100%" stopColor="#e6431c" />
        </linearGradient>
        <linearGradient id="flameInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff6b0" />
          <stop offset="55%" stopColor="#ffca28" />
          <stop offset="100%" stopColor="#ff9500" />
        </linearGradient>
      </defs>
      <path
        d="M50,4 C34,24 19,39 19,60 C19,81 33,96 50,96 C67,96 81,81 81,60 C81,39 66,24 50,4 Z"
        fill="url(#flameOuterGrad)"
      />
      <path
        d="M49,38 C41,49 36,59 36,71 C36,84 42,92 50,92 C58,92 64,84 64,71 C64,59 58,49 49,38 Z"
        fill="url(#flameInnerGrad)"
      />
      <path
        d="M70,22 C65,28 62,33 63,39 C64,45 69,47 72,44 C75,41 75,35 73,29 C72,26 71,24 70,22 Z"
        fill="url(#flameOuterGrad)"
        opacity="0.85"
      />
    </svg>
  );
}

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
          <img src={star3d} alt="" className={`${styles.icon3d} ${styles.starIcon}`} />
        </span>
        <div className={styles.textWrap}>
          <div className={styles.value}>{xpEarned} XP</div>
          <div className={styles.label}>XP Earned</div>
        </div>
      </div>

      <div className={styles.stat}>
        <span className={`${styles.iconWrap} ${styles.blue}`}>
          <img
            src={taskChecklist3d}
            alt=""
            className={`${styles.icon3d} ${styles.taskIcon}`}
          />
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
          <FlameIcon3D className={`${styles.icon3d} ${styles.flameIcon}`} />
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
