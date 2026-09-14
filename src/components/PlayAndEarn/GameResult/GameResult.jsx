import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import LevelRewardCard from "../../LevelRewardCard/LevelRewardCard.jsx";
import styles from "../Game.module.css";

/**
 * "Challenge Complete" screen: final score, a reward breakdown (XP / Gems
 * / VEs earned this run, plus any bonus), and an optional mini progress
 * bar toward the next level once the dashboard has applied the reward.
 */
function GameResult({ run, progress, onPlayAgain, onBack }) {
  const { score, xpEarned, gemsEarned, vesEarned, bonusReward } = run;

  const pct =
    progress && progress.requiredXP
      ? Math.min(100, Math.round((progress.currentXP / progress.requiredXP) * 100))
      : null;

  return (
    <div className={styles.panel}>
      <div className={styles.gameIconRing}>
        <Trophy size={30} />
      </div>
      <h3 className={styles.heading}>Challenge Complete!</h3>
      <div className={styles.scoreBig}>{score}</div>
      <p className={styles.desc}>Final score</p>

      <div className={styles.rewardRow}>
        {xpEarned > 0 && <LevelRewardCard reward={{ type: "XP", amount: xpEarned }} size="lg" />}
        {gemsEarned > 0 && <LevelRewardCard reward={{ type: "Gems", amount: gemsEarned }} size="lg" />}
        {vesEarned > 0 && <LevelRewardCard reward={{ type: "VEs", amount: vesEarned }} size="lg" />}
        {bonusReward && <LevelRewardCard reward={bonusReward} size="lg" />}
      </div>

      {pct !== null && (
        <div className={styles.resultProgress}>
          <div className={styles.resultProgressLabels}>
            <span>{progress.levelName || "Current Level"}</span>
            <span>{progress.nextLevelName || "Next Level"}</span>
          </div>
          <div className={styles.resultProgressTrack}>
            <div className={styles.resultProgressFill} style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className={styles.btnRow}>
        <button type="button" className={styles.primaryBtn} onClick={onPlayAgain}>
          <RotateCcw size={16} /> Play Again
        </button>
        {onBack && (
          <button type="button" className={styles.secondaryBtn} onClick={onBack}>
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}

export default GameResult;
