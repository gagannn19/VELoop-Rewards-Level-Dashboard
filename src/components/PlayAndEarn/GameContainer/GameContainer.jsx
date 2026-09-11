import { useState } from "react";
import GameStart from "../GameStart/GameStart.jsx";
import GamePlay from "../GamePlay/GamePlay.jsx";
import GameResult from "../GameResult/GameResult.jsx";
import { gameConfig } from "../../../data/levelData.js";

/**
 * Orchestrates the mini-game's three states: start -> playing -> result.
 * `onReward` is called once per completed run so the dashboard can add
 * the earned XP (and trigger a level-up if the threshold is crossed).
 */
function GameContainer({ onReward }) {
  const [phase, setPhase] = useState("start"); // start | playing | result
  const [lastRun, setLastRun] = useState(null);

  const handleFinish = (coinsCaught) => {
    const score = coinsCaught * 10;
    const xpEarned = coinsCaught * gameConfig.rewardPerCoin;
    const earnedBonus = score >= gameConfig.bonusThreshold;
    const bonusReward = earnedBonus ? gameConfig.bonusReward : null;

    setLastRun({ score, xpEarned, bonusReward });
    setPhase("result");
    onReward({ xpEarned, bonusReward });
  };

  return (
    <>
      {phase === "start" && (
        <GameStart
          durationSeconds={gameConfig.durationSeconds}
          rewardPerCoin={gameConfig.rewardPerCoin}
          onStart={() => setPhase("playing")}
        />
      )}

      {phase === "playing" && (
        <GamePlay
          durationSeconds={gameConfig.durationSeconds}
          rewardPerCoin={gameConfig.rewardPerCoin}
          onFinish={handleFinish}
        />
      )}

      {phase === "result" && lastRun && (
        <GameResult
          score={lastRun.score}
          xpEarned={lastRun.xpEarned}
          bonusReward={lastRun.bonusReward}
          onPlayAgain={() => setPhase("start")}
        />
      )}
    </>
  );
}

export default GameContainer;
