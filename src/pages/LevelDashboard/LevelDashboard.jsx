import { useEffect, useRef, useState } from "react";
import TopBar from "../../components/TopBar/TopBar.jsx";
import BottomNav from "../../components/BottomNav/BottomNav.jsx";
import Toast from "../../components/Toast/Toast.jsx";
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
import { useCenterHighlight } from "../../hooks/useCenterHighlight.js";
import { todaysBoost } from "../../data/levelData.js";
import styles from "./LevelDashboard.module.css";

// Fixed XP-requirement step applied every time a level is crossed.
// Dummy/demo value — a real backend would supply the next threshold.
const XP_STEP = 2000;

const COMING_SOON_MESSAGE = {
  wallet: "Wallet is coming soon!",
  profile: "Profile is coming soon!",
};

function findRoadmapEntry(roadmap, level) {
  return roadmap?.find((r) => r.level === level);
}

/**
 * Owns all "real" dashboard progress state (level/XP/roadmap position),
 * the XP activity log, and orchestrates the mini-game + quick-earn
 * actions that feed XP back into that state. Game internals stay
 * isolated inside PlayAndEarn/GameContainer — only the final result of
 * a run reaches this component via onReward.
 *
 * Still a single route: TopBar's drawer and BottomNav only smooth-scroll
 * within this one page (or surface a "coming soon" notice) — no new URL
 * routes are introduced anywhere.
 */
function LevelDashboard() {
  const { status, data, retry } = useLevelData();
  const [progress, setProgress] = useState(null);
  const [activity, setActivity] = useState([]);
  const [pendingLevelUp, setPendingLevelUp] = useState(null);
  const [bestScore, setBestScore] = useState(0);
  const [activeNav, setActiveNav] = useState("home");
  const [toastMessage, setToastMessage] = useState(null);

  const playAndEarnRef = useRef(null);
  const earnRef = useRef(null);
  const rewardsRef = useRef(null);
  const activityRef = useRef(null);

  useCenterHighlight(Boolean(progress));

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

  const logActivity = ({ label, xp = 0, ves = 0, gems = 0, meta }) => {
    setActivity((prev) => [
      { id: `local-${Date.now()}-${Math.random()}`, label, xp, ves, gems, meta, time: "Just now" },
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
    logActivity({ label: feature.title, xp: feature.xp });
  };

  const handleGameReward = (run) => {
    const { score, xpEarned, gemsEarned, vesEarned, bonusReward } = run;
    if (xpEarned > 0) addXP(xpEarned);
    setBestScore((prev) => Math.max(prev, score));

    const parts = [];
    if (xpEarned > 0) parts.push(`+${xpEarned} XP`);
    if (gemsEarned > 0) parts.push(`+${gemsEarned} Gems`);
    if (vesEarned > 0) parts.push(`+${vesEarned} VEs`);
    if (bonusReward) parts.push(`+${bonusReward.amount} bonus ${bonusReward.type}`);

    logActivity({
      label: "XP Catcher Reward",
      xp: xpEarned,
      ves: vesEarned,
      gems: gemsEarned,
      meta: parts.join(" · ") || undefined,
    });
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (key) => {
    if (key === "wallet" || key === "profile") {
      setActiveNav(key);
      setToastMessage(COMING_SOON_MESSAGE[key]);
      return;
    }

    setActiveNav(key);
    setToastMessage(null);

    if (key === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (key === "earn") {
      earnRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (key === "rewards") {
      rewardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleToastDone = () => {
    setToastMessage(null);
    setActiveNav("home");
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
      <TopBar activity={activity} onNavigate={handleNavigate} />

      <div className={styles.gridHero}>
        <LevelHero
          level={progress.level}
          levelName={progress.levelName}
          currentXP={progress.xp}
          requiredXP={progress.requiredXP}
          nextLevel={progress.nextLevel}
          boost={todaysBoost}
          onViewActivity={() =>
            activityRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        />

        <div ref={playAndEarnRef} className={styles.playAndEarnCol}>
          <PlayAndEarn
            onReward={handleGameReward}
            onBack={handleBackToTop}
            bestScore={bestScore}
            progress={{
              currentXP: progress.xp,
              requiredXP: progress.requiredXP,
              levelName: progress.levelName,
              nextLevelName: progress.nextLevelName,
            }}
          />
        </div>
      </div>

      <div className={styles.gridTwo}>
        <LevelRoadmap roadmap={data.roadmap} currentLevel={progress.level} />
        <div ref={rewardsRef}>
          <NextLevelReward
            nextLevel={progress.nextLevel}
            reward={progress.nextLevelReward}
            progressPct={progressPct}
          />
        </div>
      </div>

      <div className={styles.gridTwoEven}>
        <div ref={earnRef}>
          <EarnMoreXP features={data.earningFeatures} onQuickEarn={handleQuickEarn} />
        </div>
        <div ref={activityRef}>
          <XPActivity activity={activity} />
        </div>
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

      <Toast message={toastMessage} onDone={handleToastDone} />

      <BottomNav activeKey={activeNav} onNavigate={handleNavigate} />
    </div>
  );
}

export default LevelDashboard;
