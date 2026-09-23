import { Gem, Play, Sparkles, Timer, Trophy, ShoppingCart } from "lucide-react";
import { gameConfig } from "../../../data/levelData.js";
import { playClick } from "../../../utils/audio.js";
import styles from "../Game.module.css";

function GameStart({ durationSeconds, onStart }) {
  return (
    <div className={styles.panel}>
      <div className={styles.gameIconRing}>
        <ShoppingCart size={32} strokeWidth={2.2} />
      </div>

      <h3 className={styles.heading}>{gameConfig.name}</h3>
      <p className={styles.desc}>Play to earn XP, Gems &amp; VEs</p>

      <button
        type="button"
        className={styles.primaryBtn}
        onClick={() => {
          playClick();
          onStart();
        }}
      >
        <span className="lightSweep" aria-hidden="true" />
        <Play size={18} /> Play Now
      </button>

      <ul className={styles.ruleChips}>
        <li>
          <Timer size={13} /> {durationSeconds}s
        </li>
        <li>
          <Gem size={13} /> XP, Gems &amp; VEs
        </li>
        <li>
          <Sparkles size={13} /> {gameConfig.multiplierValue}x drops
        </li>
        <li>
          <Trophy size={13} /> {gameConfig.bonusThreshold}+ bonus
        </li>
      </ul>
    </div>
  );
}

export default GameStart;
