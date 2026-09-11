import { Coins, Play, Timer, Trophy } from "lucide-react";
import styles from "../Game.module.css";

function GameStart({ durationSeconds, rewardPerCoin, onStart }) {
  return (
    <div className={styles.panel}>
      <div className={styles.gameIconRing}>
        <Coins size={30} />
      </div>
      <h3 className={styles.heading}>VE Coin Catch</h3>
      <p className={styles.desc}>
        Move your collector and catch as many falling VE coins as you can
        before time runs out.
      </p>

      <ul className={styles.ruleList}>
        <li>
          <Timer size={14} /> {durationSeconds}-second challenge
        </li>
        <li>
          <Coins size={14} /> +{rewardPerCoin} XP per coin caught
        </li>
        <li>
          <Trophy size={14} /> Score 80+ for a bonus VE reward
        </li>
      </ul>

      <button type="button" className={styles.primaryBtn} onClick={onStart}>
        <Play size={18} /> Start Challenge
      </button>
    </div>
  );
}

export default GameStart;
