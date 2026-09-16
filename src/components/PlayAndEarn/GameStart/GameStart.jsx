import { Gem, Info, Play, Sparkles, Timer, Trophy } from "lucide-react";
import { gameConfig } from "../../../data/levelData.js";
import styles from "../Game.module.css";

function GameStart({ durationSeconds, onStart }) {
  return (
    <div className={styles.panel}>
      <div className={styles.gameIconRing}>
        <Sparkles size={30} />
      </div>
      <h3 className={styles.heading}>
        {gameConfig.name.toUpperCase()}
        <Info size={15} className={styles.headingInfo} />
      </h3>
      <p className={styles.desc}>
        Catch XP orbs &amp; VE coins. Score high for better rewards!
      </p>

      <ul className={styles.ruleList}>
        <li>
          <Timer size={14} /> {durationSeconds}-second challenge
        </li>
        <li>
          <Gem size={14} /> XP orbs, Gems &amp; VE coins each score differently
        </li>
        <li>
          <Sparkles size={14} /> Rare {gameConfig.multiplierValue}x multiplier on any catch
        </li>
        <li>
          <Trophy size={14} /> Score {gameConfig.bonusThreshold}+ for a bonus VE reward
        </li>
      </ul>

      <button type="button" className={styles.primaryBtn} onClick={onStart}>
        <span className="lightSweep" aria-hidden="true" />
        <Play size={18} /> Start Challenge
      </button>
    </div>
  );
}

export default GameStart;
