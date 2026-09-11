import {
  Calendar,
  CheckSquare,
  Flame,
  Gamepad2,
  Play,
  Search,
  Users,
} from "lucide-react";
import styles from "./EarnMoreXP.module.css";

const ICONS = {
  play: Play,
  "check-square": CheckSquare,
  users: Users,
  gamepad: Gamepad2,
  flame: Flame,
  search: Search,
  calendar: Calendar,
};

function EarnMoreXP({ features, onQuickEarn }) {
  return (
    <section className={styles.card}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Earn More XP & Rewards</h2>
        <p className={styles.subtitle}>
          Actionable ways to progress toward your next level.
        </p>
      </div>

      <div className={styles.grid}>
        {features.map((f) => {
          const Icon = ICONS[f.icon] || Play;
          const isComingSoon = f.status === "coming-soon";
          return (
            <button
              key={f.id}
              type="button"
              className={`${styles.tile} ${isComingSoon ? styles.soon : ""}`}
              disabled={isComingSoon}
              onClick={() => onQuickEarn(f)}
            >
              {isComingSoon && (
                <span className={styles.soonTag}>Coming Soon</span>
              )}
              <span className={styles.iconWrap}>
                <Icon size={20} />
              </span>
              <span className={styles.tileTitle}>{f.title}</span>
              <span className={styles.tileDesc}>{f.description}</span>
              <span className={styles.tileXp}>+{f.xp} XP</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default EarnMoreXP;
