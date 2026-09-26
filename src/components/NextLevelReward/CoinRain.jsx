import { useMemo } from "react";
import styles from "./NextLevelReward.module.css";

/**
 * A one-shot fountain of gold coins and gems that bursts out of the chest
 * mouth as it opens. Purely visual — the animation only plays once the
 * preview is revealed (see `.preview.revealed .coin`/`.gem` in
 * NextLevelReward.module.css); this just lays out the randomized arcs and
 * timing once per mount.
 */
function CoinRain({ count = 14 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const isGem = i % 3 === 0;
        // alternate sides so the burst stays balanced around the chest
        const side = i % 2 === 0 ? -1 : 1;
        return {
          id: i,
          isGem,
          size: isGem ? 7 + Math.random() * 3 : 8 + Math.random() * 4,
          dx: side * (24 + Math.random() * 64),
          rise: -(26 + Math.random() * 30),
          rot: side * (160 + Math.random() * 200),
          delay: 0.28 + Math.random() * 0.32,
          duration: 1.05 + Math.random() * 0.45,
        };
      }),
    [count],
  );

  return (
    <div className={styles.coinRain} aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={p.isGem ? styles.gem : styles.coin}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            "--dx": `${p.dx}px`,
            "--rise": `${p.rise}px`,
            "--rot": `${p.rot}deg`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default CoinRain;
