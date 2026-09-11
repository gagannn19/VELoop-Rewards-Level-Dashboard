import { useEffect } from "react";
import { PartyPopper } from "lucide-react";
import LevelRewardCard from "../LevelRewardCard/LevelRewardCard.jsx";
import styles from "./LevelUpModal.module.css";

function LevelUpModal({ level, levelName, reward, onContinue }) {
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

        {reward && (
          <div className={styles.rewardRow}>
            <LevelRewardCard reward={reward} size="lg" />
          </div>
        )}

        <p className={styles.achievement}>Achievement Unlocked</p>

        <button type="button" className={styles.continueBtn} onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default LevelUpModal;
