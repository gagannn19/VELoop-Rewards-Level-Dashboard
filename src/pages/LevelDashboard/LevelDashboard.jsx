import { useEffect, useRef, useState } from "react";
import LevelHero from "../../components/LevelHero/LevelHero.jsx";
import NextLevelReward from "../../components/NextLevelReward/NextLevelReward.jsx";
import LevelRoadmap from "../../components/LevelRoadmap/LevelRoadmap.jsx";
import PlayAndEarn from "../../components/PlayAndEarn/PlayAndEarn.jsx";
import EarnMoreXP from "../../components/EarnMoreXP/EarnMoreXP.jsx";
import XPActivity from "../../components/XPActivity/XPActivity.jsx";
import LevelUpModal from "../../components/LevelUpModal/LevelUpModal.jsx";
import {
  DashboardSkeleton,
  ErrorState,
} from "../../components/StateViews/StateViews.jsx";
import { useLevelData } from "../../hooks/useLevelData.js";
import { todaysBoost } from "../../data/levelData.js";
import styles from "./LevelDashboard.module.css";

// Fixed XP-requirement step applied every time a level is crossed.
// Dummy/demo value — a real backend would supply the next threshold.
const XP_STEP = 2000;

function findRoadmapEntry(roadmap, level) {
  return roadmap?.find((r) => r.level === level);
}

/**
 * Owns all "real" dashboard progress state (level/XP/roadmap position),
 * the XP activity log, and orchestrates the mini-game + quick-earn
 * actions that feed XP back into that state. Game internals stay
 * isolated inside PlayAndEarn/GameContainer — only the final result of
 * a run reaches this component via onReward.
 */
function LevelDashboard() {
  const { status, data, retry } = useLevelData();
  const [progress, setProgress] = useState(null);
  const [activity, setActivity] = useState([]);
  const [pendingLevelUp, setPendingLevelUp] = useState(null);
  const playAndEarnRef = useRef(null);

  // initialize local progress state once the simulated fetch resolves
  useEffect(() => {
    if (status === "ready" && data) {
      const nextEntry = findRoadmapEntry(data.roadmap, data.nextLevel);
      setProgress({
        level: data.currentLevel,
        levelName: data.currentLevelName,
        xp: data.currentXP,
        requiredXP: data.requiredXP,
        nextLevel: data.nextLevel,
        nextLevelName: nextEntry?.name || data.nextLevelName,
        nextLevelReward: data.nextLevelReward,
      });
      setActivity(data.xpActivity);
    }
  }, [status, data]);

  const logActivity = (label, xp, meta) => {
    setActivity((prev) => [
      { id: `local-${Date.now()}-${Math.random()}`, label, xp, meta, time: "Just now" },
      ...prev,
    ]);
  };

  const addXP = (amount) => {
    if (!amount || !progress || !data) return;

    const xp = progress.xp + amount;

    if (xp < progress.requiredXP) {
      setProgress({ ...progress, xp });
      return;
    }

    // Level up — carry the overflow XP into the new level, never reset to 0.
    const overflow = xp - progress.requiredXP;
    const newLevel = progress.nextLevel;
    const newLevelEntry = findRoadmapEntry(data.roadmap, newLevel);
    const newNextLevel = newLevel + 1;
    const newNextLevelEntry = findRoadmapEntry(data.roadmap, newNextLevel);
    const newLevelName = newLevelEntry?.name || progress.nextLevelName;

    setProgress({
      ...progress,
      xp: overflow,
      level: newLevel,
      levelName: newLevelName,
      requiredXP: progress.requiredXP + XP_STEP,
      nextLevel: newNextLevel,
      nextLevelName: newNextLevelEntry?.name || newLevelName,
      nextLevelReward: newNextLevelEntry?.reward || progress.nextLevelReward,
    });

    setPendingLevelUp({
      level: newLevel,
      levelName: newLevelName,
      rewards: [newLevelEntry?.reward].filter(Boolean),
      perks: data.nextLevelPerks || [],
    });
  };

  const handleQuickEarn = (feature) => {
    if (feature.status === "coming-soon") return;

    if (feature.id === "play-earn") {
      playAndEarnRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    addXP(feature.xp);
    logActivity(feature.title, feature.xp);
  };

  const handleGameReward = (run) => {
    const { xpEarned, gemsEarned, vesEarned, bonusReward } = run;
    if (xpEarned > 0) addXP(xpEarned);

    const parts = [];
    if (xpEarned > 0) parts.push(`+${xpEarned} XP`);
    if (gemsEarned > 0) parts.push(`+${gemsEarned} Gems`);
    if (vesEarned > 0) parts.push(`+${vesEarned} VEs`);
    if (bonusReward) parts.push(`+${bonusReward.amount} bonus ${bonusReward.type}`);

    logActivity("XP Catcher Reward", xpEarned, parts.join(" · ") || undefined);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        boost={todaysBoost}
      />

      <div className={styles.gridTwo}>
        <LevelRoadmap roadmap={data.roadmap} currentLevel={progress.level} />
        <NextLevelReward
          nextLevel={progress.nextLevel}
          reward={progress.nextLevelReward}
          progressPct={progressPct}
        />
      </div>

      <div ref={playAndEarnRef} className={styles.section}>
        <PlayAndEarn
          onReward={handleGameReward}
          onBack={handleBackToTop}
          progress={{
            currentXP: progress.xp,
            requiredXP: progress.requiredXP,
            levelName: progress.levelName,
            nextLevelName: progress.nextLevelName,
          }}
        />
      </div>

      <div className={styles.section}>
        <EarnMoreXP features={data.earningFeatures} onQuickEarn={handleQuickEarn} />
      </div>

      <div className={styles.section}>
        <XPActivity activity={activity} />
      </div>

      {pendingLevelUp && (
        <LevelUpModal
          level={pendingLevelUp.level}
          levelName={pendingLevelUp.levelName}
          rewards={pendingLevelUp.rewards}
          perks={pendingLevelUp.perks}
          onContinue={() => setPendingLevelUp(null)}
        />
      )}
    </div>
  );
}

export default LevelDashboard;
