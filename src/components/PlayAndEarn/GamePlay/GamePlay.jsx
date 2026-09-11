import { useCallback, useEffect, useRef, useState } from "react";
import { ShoppingBasket, Timer } from "lucide-react";
import styles from "../Game.module.css";

const BASKET_WIDTH_PCT = 16; // roughly matches the 72px basket at typical arena widths
const COIN_SPEED_PCT_PER_TICK = 1.6;
const TICK_MS = 30;
const SPAWN_MS = 650;

/**
 * Functional mini-game: catch falling coins with the basket for
 * `durationSeconds`, then report the run back to the parent.
 */
function GamePlay({ durationSeconds, rewardPerCoin, onFinish }) {
  const arenaRef = useRef(null);
  const coinsRef = useRef([]);
  const nextIdRef = useRef(1);
  const basketXRef = useRef(50);

  const [basketX, setBasketX] = useState(50);
  const [coins, setCoins] = useState([]);
  const [caught, setCaught] = useState(0);
  const [timeLeft, setTimeLeft] = useState(durationSeconds);

  const finish = useCallback(() => {
    onFinish(caught);
  }, [caught, onFinish]);

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
      coinsRef.current = [
        ...coinsRef.current,
        { id: nextIdRef.current++, x: 10 + Math.random() * 80, y: -5 },
      ];
    }, SPAWN_MS);

    const tick = setInterval(() => {
      const next = [];
      let caughtThisTick = 0;

      for (const coin of coinsRef.current) {
        const y = coin.y + COIN_SPEED_PCT_PER_TICK;
        const inBasketBand = y >= 82 && y <= 96;
        const inBasketX =
          Math.abs(coin.x - basketXRef.current) < BASKET_WIDTH_PCT / 2;

        if (inBasketBand && inBasketX) {
          caughtThisTick += 1;
          continue; // caught, remove from field
        }
        if (y < 104) next.push({ ...coin, y });
      }

      coinsRef.current = next;
      setCoins(next);
      if (caughtThisTick > 0) {
        setCaught((c) => c + caughtThisTick);
      }
    }, TICK_MS);

    return () => {
      clearInterval(spawn);
      clearInterval(tick);
    };
  }, []);

  const moveBasketTo = useCallback((clientX) => {
    const arena = arenaRef.current;
    if (!arena) return;
    const rect = arena.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(94, Math.max(6, pct));
    basketXRef.current = clamped;
    setBasketX(clamped);
  }, []);

  const handlePointerMove = (e) => moveBasketTo(e.clientX);
  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) moveBasketTo(e.touches[0].clientX);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      basketXRef.current = Math.max(6, basketXRef.current - 6);
      setBasketX(basketXRef.current);
    }
    if (e.key === "ArrowRight") {
      basketXRef.current = Math.min(94, basketXRef.current + 6);
      setBasketX(basketXRef.current);
    }
  };

  return (
    <div>
      <div className={styles.playHud}>
        <span>
          Score: <strong>{caught * 10}</strong>
        </span>
        <span className={timeLeft <= 5 ? styles.timerBad : ""}>
          <Timer size={14} style={{ marginRight: 4 }} />
          {timeLeft}s
        </span>
        <span>
          +{rewardPerCoin} XP / coin
        </span>
      </div>

      <div
        ref={arenaRef}
        className={styles.arena}
        onPointerMove={handlePointerMove}
        onTouchMove={handleTouchMove}
        tabIndex={0}
        role="application"
        aria-label="VE Coin Catch play area. Use arrow keys or drag to move the collector."
        onKeyDown={handleKeyDown}
      >
        {coins.map((c) => (
          <div
            key={c.id}
            className={styles.coin}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <span style={{ fontSize: 12, fontWeight: 800 }}>V</span>
          </div>
        ))}

        <div className={styles.basket} style={{ left: `${basketX}%` }}>
          <ShoppingBasket size={20} />
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
