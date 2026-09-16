import CurrentLevel from "../CurrentLevel/CurrentLevel.jsx";
import XPProgress from "../XPProgress/XPProgress.jsx";
import TodaysBoost from "../TodaysBoost/TodaysBoost.jsx";
import SparkleField from "../SparkleField/SparkleField.jsx";
import styles from "./LevelHero.module.css";

function LevelHero({ level, levelName, currentXP, requiredXP, boost }) {
  return (
    <section className={styles.hero}>
      <div className={`${styles.card} premiumCard`}>
        <SparkleField count={22} />
        <CurrentLevel level={level} name={levelName} />
        <div className={styles.progressRow}>
          <XPProgress currentXP={currentXP} requiredXP={requiredXP} />
        </div>
        {boost && <TodaysBoost {...boost} />}
      </div>
    </section>
  );
}

export default LevelHero;
