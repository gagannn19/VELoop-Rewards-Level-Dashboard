import { Check, Lock } from "lucide-react";
import LevelRewardCard from "../LevelRewardCard/LevelRewardCard.jsx";
import styles from "./LevelRoadmap.module.css";

function statusFor(levelNumber, currentLevel) {
  if (levelNumber < currentLevel) return "completed";
  if (levelNumber === currentLevel) return "current";
  return "locked";
}

// Each level's wing gets its own tip hue, cycling every 8 levels — purely
// decorative, independent of completed/current/locked status. Every wing
// shares the same warm gold root color, like the feathered-wing reference
// (orange at the body, colored toward the tip).
const WING_ROOT = "#f5a23c";
const WING_TIERS = [
  "#e8834a", // copper
  "#3ddc8a", // green
  "#3fb8c9", // teal
  "#f0c14b", // gold
  "#4f8ef7", // blue
  "#9b6bf2", // purple
  "#e0559f", // magenta
  "#c7ccd6", // silver
];

// One feather shape, fanned at increasing/decreasing angle+length so the
// group reads as a swept, layered wing rather than a rigid star burst.
// Rendered back-to-front (lowest angle first) so each feather overlaps
// the one before it, like real plumage.
const FEATHERS = [
  { angle: 6, len: 0.58, wid: 0.9 },
  { angle: -14, len: 0.82, wid: 0.98 },
  { angle: -32, len: 1.02, wid: 1.04 },
  { angle: -50, len: 1.14, wid: 1.02 },
  { angle: -66, len: 1.02, wid: 0.92 },
  { angle: -80, len: 0.72, wid: 0.8 },
];
const FEATHER_D = "M0,0 C8,-11 30,-9 40,0 C30,9 8,11 0,0 Z";

function Wing({ side, tipColor, gradId }) {
  return (
    <svg
      className={`${styles.wing} ${styles[side]}`}
      viewBox="-6 -52 58 58"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={WING_ROOT} />
          <stop offset="100%" stopColor={tipColor} />
        </linearGradient>
      </defs>
      {FEATHERS.map((f, i) => (
        <g key={i} transform={`rotate(${f.angle}) scale(${f.len} ${f.wid})`}>
          <path
            d={FEATHER_D}
            fill={`url(#${gradId})`}
            stroke="rgba(20, 12, 0, 0.3)"
            strokeWidth="0.7"
          />
        </g>
      ))}
    </svg>
  );
}

function LevelRoadmap({ roadmap, currentLevel }) {
  return (
    <div className={`${styles.card} premiumCard`}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Level Progression Roadmap</h2>
        <p className={styles.subtitle}>Current, upcoming, and future levels</p>
      </div>

      <div className={styles.track}>
        {roadmap.map((item) => {
          const status = statusFor(item.level, currentLevel);
          const tipColor = WING_TIERS[(item.level - 1) % WING_TIERS.length];
          return (
            <div key={item.level} className={styles.step}>
              <div className={styles.badge}>
                <Wing side="wingLeft" tipColor={tipColor} gradId={`wingL${item.level}`} />
                <div className={`${styles.node} ${styles[status]}`}>
                  <span className={styles.nodeInner}>
                    {status === "completed" && <Check size={17} strokeWidth={3} />}
                    {status === "locked" && <Lock size={14} />}
                    {status === "current" && item.level}
                  </span>
                </div>
                <Wing side="wingRight" tipColor={tipColor} gradId={`wingR${item.level}`} />
              </div>
              <div className={styles.levelLabel}>
                Level {String(item.level).padStart(2, "0")}
              </div>
              <div className={styles.levelName}>{item.name}</div>
              <LevelRewardCard
                reward={item.reward}
                size="sm"
                locked={status === "locked"}
              />
              {status === "current" && (
                <span className={styles.hereTag}>You are here</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LevelRoadmap;
