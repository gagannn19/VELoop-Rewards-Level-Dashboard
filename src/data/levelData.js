// Central data/config layer for the Level-Up Dashboard.
// Kept separate from UI so real backend data can replace this object
// without touching any component (see project README, "Data Architecture").
// All numeric values below are DEVELOPMENT / DEMO data only.

export const levelNames = [
  "Newcomer",
  "Explorer",
  "Achiever",
  "Voyager",
  "Champion",
  "Elite",
  "Master",
  "Legend",
];

export const userLevelData = {
  currentLevel: 4,
  currentLevelName: levelNames[3],
  currentXP: 6420,
  requiredXP: 8000,
  nextLevel: 5,
  nextLevelName: levelNames[4],
  nextLevelReward: {
    type: "VEs",
    amount: 500,
    icon: "coins",
  },
};

// Full roadmap. Status is derived at render time from currentLevel,
// but rewards / names live here so they're easy to swap for real data.
export const levelRoadmap = [
  { level: 1, name: levelNames[0], reward: { type: "VEs", amount: 100 } },
  { level: 2, name: levelNames[1], reward: { type: "VEs", amount: 150 } },
  { level: 3, name: levelNames[2], reward: { type: "Gems", amount: 10 } },
  { level: 4, name: levelNames[3], reward: { type: "Gems", amount: 15 } },
  { level: 5, name: levelNames[4], reward: { type: "VEs", amount: 500 } },
  { level: 6, name: levelNames[5], reward: { type: "Spins", amount: 2 } },
  { level: 7, name: levelNames[6], reward: { type: "VEs", amount: 900 } },
  { level: 8, name: levelNames[7], reward: { type: "Gems", amount: 40 } },
];

// "Coming Soon" = concept only, not wired to a real backend yet (per spec
// section 23: only ship earning mechanisms approved by the product team).
export const earningFeatures = [
  {
    id: "watch-earn",
    title: "Watch & Earn",
    description: "Complete eligible ad-watching activities.",
    xp: 50,
    icon: "play",
    status: "live",
  },
  {
    id: "daily-tasks",
    title: "Daily Tasks",
    description: "Complete today's set of daily activities.",
    xp: 30,
    icon: "check-square",
    status: "live",
  },
  {
    id: "refer-earn",
    title: "Refer & Earn",
    description: "Invite friends and earn eligible rewards.",
    xp: 100,
    icon: "users",
    status: "live",
  },
  {
    id: "play-earn",
    title: "Play & Earn",
    description: "Complete the VE Coin Catch mini-game.",
    xp: 25,
    icon: "gamepad",
    status: "live",
  },
  {
    id: "streak-bonus",
    title: "Streak Bonus",
    description: "Maintain your daily engagement streak.",
    xp: 25,
    icon: "flame",
    status: "live",
  },
  {
    id: "reward-hunt",
    title: "Reward Hunt",
    description: "Find hidden reward elements around the platform.",
    xp: 40,
    icon: "search",
    status: "coming-soon",
  },
  {
    id: "weekly-quest",
    title: "Weekly Quest",
    description: "Complete a bigger weekly objective.",
    xp: 150,
    icon: "calendar",
    status: "coming-soon",
  },
];

export const xpActivity = [
  { id: 1, xp: 20, label: "Referral Bonus", time: "Today, 10:45 AM" },
  { id: 2, xp: 50, label: "Daily Mission Completed", time: "Today, 09:12 AM" },
  { id: 3, xp: 75, label: "Mini Game Win", time: "Today, 08:30 AM" },
  { id: 4, xp: 10, label: "XP Catcher Reward", time: "Today, 07:50 AM" },
  { id: 5, xp: 25, label: "Streak Bonus", time: "Today, 07:20 AM" },
];

export const gameConfig = {
  name: "VE Coin Catch",
  durationSeconds: 20,
  rewardPerCoin: 5, // XP
  bonusThreshold: 80, // score needed for bonus VEs
  bonusReward: { type: "VEs", amount: 12 },
};
