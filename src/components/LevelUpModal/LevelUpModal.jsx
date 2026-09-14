import { useEffect } from "react";
import { PartyPopper, Sparkles } from "lucide-react";
import LevelRewardCard from "../LevelRewardCard/LevelRewardCard.jsx";
import styles from "./LevelUpModal.module.css";

/**
 * Level-up celebration. `rewards` is an array so a future backend can
 * award more than one reward type (e.g. VEs + Gems) at once without any
 * change here; `perks` is the short list of what the new level unlocks.
 */
function LevelUpModal({ level, levelName, rewards, perks, onContinue }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onContinue();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onContinue]);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.badge}>
          <PartyPopper size={32} />
        </div>
        <p className={styles.eyebrow}>Level Up!</p>
        <h2 className={styles.level}>
          Level {String(level).padStart(2, "0")}
        </h2>
        <p className={styles.name}>{levelName}</p>

        {rewards && rewards.length > 0 && (
          <div className={styles.rewardRow}>
            {rewards.map((reward, i) => (
              <LevelRewardCard key={`${reward.type}-${i}`} reward={reward} size="lg" />
            ))}
          </div>
        )}

        {perks && perks.length > 0 && (
          <ul className={styles.perkList}>
            {perks.map((perk) => (
              <li key={perk}>
                <Sparkles size={13} />
                {perk}
              </li>
            ))}
          </ul>
        )}

        <p className={styles.achievement}>Achievement Unlocked</p>

        <button type="button" className={styles.continueBtn} onClick={onContinue}>
          Claim Rewards
        </button>
      </div>
    </div>
  );
}

export default LevelUpModal;
