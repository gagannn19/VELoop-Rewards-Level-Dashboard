import { Info } from "lucide-react";
import CurrentLevel from "../CurrentLevel/CurrentLevel.jsx";
import XPProgress from "../XPProgress/XPProgress.jsx";
import TodaysBoost from "../TodaysBoost/TodaysBoost.jsx";
import styles from "./LevelHero.module.css";

function LevelHero({ level, levelName, currentXP, requiredXP, nextLevel, boost, onViewActivity }) {
  return (
    <section className={styles.hero}>
      <div className={styles.rewardCard}>
        <div className={styles.eyebrowRow}>
          <img className={styles.logo} src="/favicon.svg" alt="" aria-hidden="true" />
          <span className={styles.eyebrow}>Level Up Your Rewards</span>
          <Info size={14} className={styles.infoIcon} aria-hidden="true" />
        </div>

        <CurrentLevel level={level} name={levelName} currentXP={currentXP} />
        <div className={styles.progressRow}>
          <XPProgress
            currentXP={currentXP}
            requiredXP={requiredXP}
            nextLevel={nextLevel}
            onViewActivity={onViewActivity}
          />
        </div>
      </div>

      {boost && (
        <div className={`${styles.boostCard} premiumCard`}>
          <TodaysBoost {...boost} />
        </div>
      )}
    </section>
  );
}

export default LevelHero;
