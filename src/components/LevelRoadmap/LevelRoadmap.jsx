import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getBadgeSrc, lockBadgeSrc } from "../../assets/badges/index.js";
import LevelRewardCard from "../LevelRewardCard/LevelRewardCard.jsx";
import { playClick } from "../../utils/audio.js";
import styles from "./LevelRoadmap.module.css";

function statusFor(levelNumber, currentLevel) {
  if (levelNumber < currentLevel) return "completed";
  if (levelNumber === currentLevel) return "current";
  return "locked";
}

function LevelRoadmap({ roadmap, currentLevel }) {
  const trackRef = useRef(null);

  const slide = (dir) => {
    playClick();
    trackRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <div className={`${styles.card} premiumCard`}>
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>Level Progression</h2>
          <p className={styles.subtitle}>Current, upcoming, and future levels</p>
        </div>
        <div className={styles.arrowRow}>
          <button type="button" className={styles.arrowBtn} aria-label="Scroll left" onClick={() => slide(-1)}>
            <ChevronLeft size={16} />
          </button>
          <button type="button" className={styles.arrowBtn} aria-label="Scroll right" onClick={() => slide(1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {roadmap.map((item) => {
          const status = statusFor(item.level, currentLevel);
          const locked = status === "locked";
          return (
            <div key={item.level} className={styles.step}>
              {status === "current" && (
                <span className={styles.hereTag}>You are here</span>
              )}
              <div className={styles.badgeStage}>
                <img
                  className={`${styles.badge} badge3d`}
                  data-locked={locked}
                  src={getBadgeSrc(item.level)}
                  alt={`Level ${String(item.level).padStart(2, "0")}`}
                />
                {locked && (
                  <img className={styles.lock} src={lockBadgeSrc} alt="" aria-hidden="true" />
                )}
              </div>
              <div className={styles.levelLabel}>
                Level {String(item.level).padStart(2, "0")}
              </div>
              <div className={styles.levelName}>{item.name}</div>
              <LevelRewardCard reward={item.reward} size="sm" locked={locked} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LevelRoadmap;
