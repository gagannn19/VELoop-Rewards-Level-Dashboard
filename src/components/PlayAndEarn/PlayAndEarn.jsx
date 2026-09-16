import GameContainer from "./GameContainer/GameContainer.jsx";
import styles from "./PlayAndEarn.module.css";

function PlayAndEarn({ onReward, onBack, progress, bestScore }) {
  return (
    <section className={`${styles.card} premiumCard`}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Level-Up Arcade</h2>
        <p className={styles.subtitle}>
          Something fun to do right now while you climb.
        </p>
      </div>
      <GameContainer onReward={onReward} onBack={onBack} progress={progress} bestScore={bestScore} />
    </section>
  );
}

export default PlayAndEarn;
