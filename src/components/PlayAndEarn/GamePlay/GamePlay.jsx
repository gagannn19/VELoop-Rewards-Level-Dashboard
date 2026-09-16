import { useCallback, useEffect, useRef, useState } from "react";
import { Timer } from "lucide-react";
import { gameConfig } from "../../../data/levelData.js";
import styles from "../Game.module.css";

const HOOP_WIDTH_PCT = 15; // catch band width, matches the hoop's visual footprint
const ITEM_SPEED_PCT_PER_TICK = 1.5;
const TICK_MS = 30;
const SPAWN_MS = 600;

const ITEM_DISPLAY = {
  xp: { className: "itemXp", glyph: "XP" },
  gem: { className: "itemGem", glyph: "◆" },
  coin: { className: "itemCoin", glyph: "V" },
};

/** Weighted random pick from gameConfig.itemTypes. */
function pickItemType() {
  const totalWeight = gameConfig.itemTypes.reduce((sum, t) => sum + t.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const type of gameConfig.itemTypes) {
    if (roll < type.weight) return type;
    roll -= type.weight;
  }
  return gameConfig.itemTypes[0];
}

/**
 * Functional mini-game: guide the golden hoop to catch falling XP orbs,
 * Gems, and VE coins for `durationSeconds`, then report the run's totals
 * back to the parent. A rare multiplier doubles a single catch's reward.
 */
function GamePlay({ durationSeconds, onFinish }) {
  const arenaRef = useRef(null);
  const itemsRef = useRef([]);
  const nextIdRef = useRef(1);
  const hoopXRef = useRef(50);
  const totalsRef = useRef({ score: 0, xp: 0, gems: 0, ves: 0 });

  const [hoopX, setHoopX] = useState(50);
  const [items, setItems] = useState([]);
  const [totals, setTotals] = useState({ score: 0, xp: 0, gems: 0, ves: 0 });
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [popText, setPopText] = useState(null);

  const finish = useCallback(() => {
    onFinish(totalsRef.current);
  }, [onFinish]);

  // countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      finish();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // spawn + fall loop
  useEffect(() => {
    const spawn = setInterval(() => {
      const type = pickItemType();
      itemsRef.current = [
        ...itemsRef.current,
        { id: nextIdRef.current++, x: 10 + Math.random() * 80, y: -5, typeKey: type.key },
      ];
    }, SPAWN_MS);

    const tick = setInterval(() => {
      const next = [];
      let gained = null;

      for (const item of itemsRef.current) {
        const y = item.y + ITEM_SPEED_PCT_PER_TICK;
        const inHoopBand = y >= 80 && y <= 94;
        const inHoopX = Math.abs(item.x - hoopXRef.current) < HOOP_WIDTH_PCT / 2;

        if (inHoopBand && inHoopX) {
          const type = gameConfig.itemTypes.find((t) => t.key === item.typeKey);
          const isMultiplier = Math.random() < gameConfig.multiplierChance;
          const mult = isMultiplier ? gameConfig.multiplierValue : 1;

          totalsRef.current = {
            score: totalsRef.current.score + type.score * mult,
            xp: totalsRef.current.xp + (type.xp || 0) * mult,
            gems: totalsRef.current.gems + (type.gems || 0) * mult,
            ves: totalsRef.current.ves + (type.ves || 0) * mult,
          };
          gained = { label: ITEM_DISPLAY[type.key].glyph, mult };
          continue; // caught, remove from field
        }
        if (y < 104) next.push({ ...item, y });
      }

      itemsRef.current = next;
      setItems(next);
      if (gained) {
        setTotals({ ...totalsRef.current });
        setPopText(gained.mult > 1 ? `2x BONUS!` : `+${gained.label}`);
        setTimeout(() => setPopText(null), 420);
      }
    }, TICK_MS);

    return () => {
      clearInterval(spawn);
      clearInterval(tick);
    };
  }, []);

  const moveHoopTo = useCallback((clientX) => {
    const arena = arenaRef.current;
    if (!arena) return;
    const rect = arena.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(94, Math.max(6, pct));
    hoopXRef.current = clamped;
    setHoopX(clamped);
  }, []);

  const handlePointerMove = (e) => moveHoopTo(e.clientX);
  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) moveHoopTo(e.touches[0].clientX);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      hoopXRef.current = Math.max(6, hoopXRef.current - 6);
      setHoopX(hoopXRef.current);
    }
    if (e.key === "ArrowRight") {
      hoopXRef.current = Math.min(94, hoopXRef.current + 6);
      setHoopX(hoopXRef.current);
    }
  };

  const coinType = gameConfig.itemTypes.find((t) => t.key === "coin");

  return (
    <div>
      <div className={styles.playHeader}>
        <span className={styles.playEyebrow}>{gameConfig.name.toUpperCase()}</span>
        <span className={`${styles.timerPill} ${timeLeft <= 5 ? styles.timerBad : ""}`}>
          <Timer size={13} />
          {timeLeft}s
        </span>
      </div>

      <div
        ref={arenaRef}
        className={styles.arena}
        onPointerMove={handlePointerMove}
        onTouchMove={handleTouchMove}
        tabIndex={0}
        role="application"
        aria-label="XP Catcher play area. Use arrow keys or drag to move the hoop."
        onKeyDown={handleKeyDown}
      >
        {popText && <div className={styles.popText}>{popText}</div>}

        {items.map((it) => (
          <div
            key={it.id}
            className={`${styles.fallingItem} ${styles[ITEM_DISPLAY[it.typeKey].className]}`}
            style={{ left: `${it.x}%`, top: `${it.y}%` }}
          >
            {ITEM_DISPLAY[it.typeKey].glyph}
          </div>
        ))}

        <div className={styles.hoop} style={{ left: `${hoopX}%` }}>
          <span className={styles.hoopRing} />
          <span className={styles.hoopNet} />
        </div>
      </div>

      <div className={styles.scorePanel}>
        <span className={styles.scoreLabel}>Your Score</span>
        <span className={styles.scoreBigLive}>{totals.score}</span>
        <span className={styles.scoreCaption}>
          {totals.xp} XP &middot; {totals.gems} Gems &middot; {totals.ves} VEs earned
        </span>
      </div>

      <div className={styles.legendRow}>
        {coinType && (
          <span className={styles.legendChip}>
            <span className={styles.legendDotGold} />+{coinType.ves} VEs
          </span>
        )}
        <span className={styles.legendChip}>
          <span className={styles.legendDotPurple} />
          {gameConfig.multiplierValue}X Multiplier
        </span>
      </div>
    </div>
  );
}

export default GamePlay;
