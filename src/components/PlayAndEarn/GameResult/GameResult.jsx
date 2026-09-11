import { RotateCcw, Trophy } from "lucide-react";
import LevelRewardCard from "../../LevelRewardCard/LevelRewardCard.jsx";
import styles from "../Game.module.css";

function GameResult({ score, xpEarned, bonusReward, onPlayAgain }) {
  return (
    <div className={styles.panel}>
      <div className={styles.gameIconRing}>
        <Trophy size={30} />
      </div>
      <h3 className={styles.heading}>Challenge Complete!</h3>
      <div className={styles.scoreBig}>{score}</div>
      <p className={styles.desc}>Final score</p>

      <div className={styles.rewardRow}>
        <LevelRewardCard reward={{ type: "XP", amount: xpEarned }} size="lg" />
        {bonusReward && <LevelRewardCard reward={bonusReward} size="lg" />}
      </div>

      <div className={styles.btnRow}>
        <button type="button" className={styles.primaryBtn} onClick={onPlayAgain}>
          <RotateCcw size={16} /> Play Again
        </button>
      </div>
    </div>
  );
}

export default GameResult;
