import { useEffect, useState } from "react";
import LevelHero from "../../components/LevelHero/LevelHero.jsx";
import NextLevelReward from "../../components/NextLevelReward/NextLevelReward.jsx";
import LevelRoadmap from "../../components/LevelRoadmap/LevelRoadmap.jsx";
import {
  DashboardSkeleton,
  ErrorState,
} from "../../components/StateViews/StateViews.jsx";
import { useLevelData } from "../../hooks/useLevelData.js";
import styles from "./LevelDashboard.module.css";

/**
 * DAY 1 SCOPE — dashboard skeleton only:
 *   Hero (current level + XP progress) + Level Roadmap + Next Level Reward.
 *
 * Not wired in yet on purpose (already built in src/components, arriving
 * in later days per the plan):
 *   - PlayAndEarn (mini-game)      -> Day 2
 *   - EarnMoreXP + XPActivity      -> Day 3
 *   - LevelUpModal (celebration)   -> wired once the game can award XP
 */
function LevelDashboard() {
  const { status, data, retry } = useLevelData();
  const [progress, setProgress] = useState(null);

  // initialize local progress state once the simulated fetch resolves
  useEffect(() => {
    if (status === "ready" && data) {
      setProgress({
        level: data.currentLevel,
        levelName: data.currentLevelName,
        xp: data.currentXP,
        requiredXP: data.requiredXP,
        nextLevel: data.nextLevel,
        nextLevelReward: data.nextLevelReward,
      });
    }
  }, [status, data]);

  if (status === "loading") {
    return (
      <div className="container-page">
        <DashboardSkeleton />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container-page">
        <ErrorState onRetry={retry} />
      </div>
    );
  }

  if (!progress) return null;

  const progressPct = Math.min(
    100,
    Math.round((progress.xp / progress.requiredXP) * 100),
  );

  return (
    <div className="container-page">
      <LevelHero
        level={progress.level}
        levelName={progress.levelName}
        currentXP={progress.xp}
        requiredXP={progress.requiredXP}
      />

      <div className={styles.gridTwo}>
        <LevelRoadmap roadmap={data.roadmap} currentLevel={progress.level} />
        <NextLevelReward
          nextLevel={progress.nextLevel}
          reward={progress.nextLevelReward}
          progressPct={progressPct}
        />
      </div>
    </div>
  );
}

export default LevelDashboard;
