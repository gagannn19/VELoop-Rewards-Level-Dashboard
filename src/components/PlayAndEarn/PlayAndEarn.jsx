import GameContainer from "./GameContainer/GameContainer.jsx";
import styles from "./PlayAndEarn.module.css";

function PlayAndEarn({ onReward }) {
  return (
    <section className={styles.card}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Level-Up Arcade</h2>
        <p className={styles.subtitle}>
          Something fun to do right now while you climb.
        </p>
      </div>
      <GameContainer onReward={onReward} />
    </section>
  );
}

export default PlayAndEarn;
