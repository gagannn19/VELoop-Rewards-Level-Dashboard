import { useState } from "react";
import { Lock, Sparkles } from "lucide-react";
import LevelRewardCard, { REWARD_ICONS } from "../LevelRewardCard/LevelRewardCard.jsx";
import LevelInfo from "../LevelInfo/LevelInfo.jsx";
import ClosedChest from "./ClosedChest.jsx";
import OpenChest from "./OpenChest.jsx";
import CoinRain from "./CoinRain.jsx";
import styles from "./NextLevelReward.module.css";

function NextLevelReward({ nextLevel, reward, progressPct }) {
  // Opens on the first hover and stays open (and raining) from then on —
  // it never reverts to closed, even after the pointer leaves.
  const [revealed, setRevealed] = useState(false);
  const RewardIcon = REWARD_ICONS[reward?.type] || Sparkles;

  return (
    <div
      className={`${styles.card} premiumCard`}
      onMouseEnter={() => setRevealed(true)}
      onFocus={() => setRevealed(true)}
      onClick={() => setRevealed(true)}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Next Level Reward</h2>
        <LevelInfo text="The displayed reward is associated with the next level according to the current reward configuration." />
      </div>

      <div className={styles.rewardBlock}>
        <div className={styles.iconWrap}>
          <Lock size={18} />
        </div>
        <LevelRewardCard reward={reward} size="lg" />
      </div>

      <p className={styles.unlockText}>
        Reach Level {String(nextLevel).padStart(2, "0")} to unlock
      </p>

      <div className={`${styles.preview} ${revealed ? styles.revealed : ""}`}>
        <div className={styles.stage}>
          <span className={styles.orbit} aria-hidden="true" />
          <span className={styles.halo} aria-hidden="true" />
          <span className={styles.rays} aria-hidden="true" />
          <span className={styles.pedestal} aria-hidden="true" />
          <span className={styles.burst} aria-hidden="true" />
          <div className={styles.chest}>
            <ClosedChest className={`${styles.chestArt} ${styles.chestClosed}`} />
            <OpenChest className={`${styles.chestArt} ${styles.chestOpen}`} />
          </div>
          <CoinRain />
        </div>

        {/* one slot below the chest: an invitation while closed, the
            reward itself once opened (the chip above already announces
            the reward to screen readers, so both are decorative) */}
        <div className={styles.revealSlot} aria-hidden="true">
          <span className={styles.hint}>
            <Sparkles size={12} />
            <span className={styles.hintHover}>Hover to reveal</span>
            <span className={styles.hintTouch}>Tap to reveal</span>
          </span>
          {reward && (
            <span className={styles.rewardPill}>
              <span className={styles.rewardIcon}>
                <RewardIcon size={14} strokeWidth={2.4} />
              </span>
              <span className={styles.rewardAmount}>{reward.amount}</span>
              <span className={styles.rewardType}>{reward.type}</span>
            </span>
          )}
        </div>
      </div>

      <div className={styles.progressFooter}>
        <span className={styles.miniLabel}>Progress to Level {String(nextLevel).padStart(2, "0")}</span>
        <span className={styles.miniPct}>{progressPct}%</span>
      </div>
      <div className={styles.miniTrack}>
        <div className={styles.miniFill} style={{ width: `${progressPct}%` }} />
      </div>
    </div>
  );
}

export default NextLevelReward;
