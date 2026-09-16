import { Check, Lock } from "lucide-react";
import LevelRewardCard from "../LevelRewardCard/LevelRewardCard.jsx";
import styles from "./LevelRoadmap.module.css";

function statusFor(levelNumber, currentLevel) {
  if (levelNumber < currentLevel) return "completed";
  if (levelNumber === currentLevel) return "current";
  return "locked";
}

function LevelRoadmap({ roadmap, currentLevel }) {
  return (
    <div className={`${styles.card} premiumCard`}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Level Progression Roadmap</h2>
        <p className={styles.subtitle}>Current, upcoming, and future levels</p>
      </div>

      <div className={styles.track}>
        {roadmap.map((item) => {
          const status = statusFor(item.level, currentLevel);
          return (
            <div key={item.level} className={styles.step}>
              <div className={`${styles.node} ${styles[status]}`}>
                {status === "completed" && <Check size={16} />}
                {status === "locked" && <Lock size={14} />}
                {status === "current" && item.level}
              </div>
              <div className={styles.levelLabel}>
                Level {String(item.level).padStart(2, "0")}
              </div>
              <div className={styles.levelName}>{item.name}</div>
              <LevelRewardCard
                reward={item.reward}
                size="sm"
                locked={status === "locked"}
              />
              {status === "current" && (
                <span className={styles.hereTag}>You are here</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LevelRoadmap;
