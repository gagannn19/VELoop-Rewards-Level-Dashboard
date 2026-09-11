import CurrentLevel from "../CurrentLevel/CurrentLevel.jsx";
import XPProgress from "../XPProgress/XPProgress.jsx";
import styles from "./LevelHero.module.css";

function LevelHero({ level, levelName, currentXP, requiredXP }) {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.title}>Level Up Your Rewards</h1>
        <p className={styles.subtitle}>
          Keep earning XP, unlock new levels, and discover better rewards
          along the way.
        </p>
      </div>

      <div className={styles.card}>
        <CurrentLevel level={level} name={levelName} />
        <div className={styles.progressRow}>
          <XPProgress currentXP={currentXP} requiredXP={requiredXP} />
        </div>
      </div>
    </section>
  );
}

export default LevelHero;
