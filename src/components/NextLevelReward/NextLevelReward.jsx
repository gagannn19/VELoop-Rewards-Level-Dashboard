import { Lock } from "lucide-react";
import LevelRewardCard from "../LevelRewardCard/LevelRewardCard.jsx";
import LevelInfo from "../LevelInfo/LevelInfo.jsx";
import styles from "./NextLevelReward.module.css";

function NextLevelReward({ nextLevel, reward, progressPct }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>
          Next Level Reward
          <LevelInfo text="The displayed reward is associated with the next level according to the current reward configuration." />
        </span>
      </div>

      <div className={styles.rewardBlock}>
        <div className={styles.iconWrap}>
          <Lock size={22} />
        </div>
        <LevelRewardCard reward={reward} size="lg" locked />
      </div>

      <p className={styles.unlockText}>
        Reach Level {String(nextLevel).padStart(2, "0")} to unlock
      </p>

      <div className={styles.miniTrack}>
        <div className={styles.miniFill} style={{ width: `${progressPct}%` }} />
      </div>
      <div className={styles.miniPct}>{progressPct}%</div>
    </div>
  );
}

export default NextLevelReward;
