/** Inline 3D-style open treasure chest — the revealed companion to
 * ClosedChest.jsx (same body geometry, so the swap reads as the lid
 * lifting). Warm light spills from the mouth over a mound of gold coins
 * crowned by a champagne gem. */
function OpenChest({ className }) {
  return (
    <svg viewBox="0 0 120 110" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ocBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2f4ea8" />
          <stop offset="60%" stopColor="#1a2e6b" />
          <stop offset="100%" stopColor="#0f1b45" />
        </linearGradient>
        <linearGradient id="ocLidInner" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a1230" />
          <stop offset="100%" stopColor="#1f3578" />
        </linearGradient>
        <linearGradient id="ocGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff4d6" />
          <stop offset="24%" stopColor="#f3d68f" />
          <stop offset="55%" stopColor="#d9a13c" />
          <stop offset="80%" stopColor="#a8741f" />
          <stop offset="100%" stopColor="#f0c878" />
        </linearGradient>
        <linearGradient id="ocGoldSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f6e2b8" />
          <stop offset="45%" stopColor="#e2b155" />
          <stop offset="100%" stopColor="#9c6b1c" />
        </linearGradient>
        <radialGradient id="ocCoinFace" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="50%" stopColor="#f0c14b" />
          <stop offset="100%" stopColor="#a8741f" />
        </radialGradient>
        <linearGradient id="ocGem" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="50%" stopColor="#f6e2b8" />
          <stop offset="100%" stopColor="#c99a4a" />
        </linearGradient>
        <radialGradient id="ocLight" cx="50%" cy="100%" r="100%">
          <stop offset="0%" stopColor="#ffe3a3" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#eec164" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#eec164" stopOpacity="0" />
        </radialGradient>
        <g id="ocCoin">
          <ellipse rx="7" ry="6.2" fill="url(#ocCoinFace)" stroke="#8a5f14" strokeWidth="0.5" />
          <ellipse rx="4.4" ry="3.8" fill="none" stroke="#a8741f" strokeWidth="0.8" opacity="0.75" />
          <path d="M-4.2,-2.6 C-3,-4.4 -0.6,-5 1.4,-4.8" fill="none" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
        </g>
      </defs>

      {/* lid, swung back — we see its dark underside framed in gold */}
      <path d="M14,58 L19,20 C20,14 26,10 34,10 H86 C94,10 100,14 101,20 L106,58 Z" fill="url(#ocLidInner)" />
      <path
        d="M14,58 L19,20 C20,14 26,10 34,10 H86 C94,10 100,14 101,20 L106,58"
        fill="none"
        stroke="url(#ocGold)"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* light spilling out of the mouth */}
      <ellipse cx="60" cy="56" rx="46" ry="34" fill="url(#ocLight)" />

      {/* dark interior */}
      <ellipse cx="60" cy="58" rx="46" ry="6" fill="#070d24" />

      {/* treasure mound */}
      <use href="#ocCoin" x="30" y="54" />
      <use href="#ocCoin" x="90" y="54" />
      <use href="#ocCoin" x="42" y="50" />
      <use href="#ocCoin" x="78" y="50" />
      <use href="#ocCoin" x="36" y="44" />
      <use href="#ocCoin" x="84" y="45" />
      <use href="#ocCoin" x="50" y="44" />
      <use href="#ocCoin" x="70" y="44" />

      {/* champagne gem */}
      <path d="M60,24 L72,36 L60,52 L48,36 Z" fill="url(#ocGem)" stroke="#fff4d6" strokeWidth="0.7" />
      <path d="M48,36 H72 L60,52 Z" fill="#b8873a" opacity="0.35" />
      <path d="M60,24 L64,36 L60,52 L56,36 Z" fill="#ffffff" opacity="0.35" />

      <use href="#ocCoin" x="56" y="54" />
      <use href="#ocCoin" x="66" y="55" />

      {/* body */}
      <rect x="12" y="58" width="96" height="44" rx="6" fill="url(#ocBody)" />
      <rect x="12" y="62" width="96" height="1" fill="#ffffff" opacity="0.07" />
      <rect x="12" y="96" width="96" height="6" rx="3" fill="url(#ocGold)" />
      <rect x="24" y="58" width="9" height="38" fill="url(#ocGoldSide)" />
      <rect x="87" y="58" width="9" height="38" fill="url(#ocGoldSide)" />
      <rect x="10" y="56" width="100" height="6" rx="3" fill="url(#ocGold)" />
      <rect x="12" y="57" width="96" height="1" fill="#ffffff" opacity="0.45" />

      {/* studs */}
      <g fill="#fff4d6" opacity="0.85">
        <circle cx="28.5" cy="68" r="1.3" />
        <circle cx="28.5" cy="90" r="1.3" />
        <circle cx="91.5" cy="68" r="1.3" />
        <circle cx="91.5" cy="90" r="1.3" />
      </g>

      {/* lock plate (unlocked — hasp dropped) */}
      <path
        d="M50,62 H70 V72 C70,78 60,82 60,82 C60,82 50,78 50,72 Z"
        fill="url(#ocGold)"
        stroke="#fff4d6"
        strokeOpacity="0.55"
        strokeWidth="0.8"
      />
      <circle cx="60" cy="70" r="2.6" fill="#1a1206" />

      {/* sparkles */}
      <g fill="#ffffff">
        <path d="M30,28 l1.4,3.6 3.6,1.4 -3.6,1.4 -1.4,3.6 -1.4,-3.6 -3.6,-1.4 3.6,-1.4 Z" opacity="0.9" />
        <path d="M90,24 l1.1,2.8 2.8,1.1 -2.8,1.1 -1.1,2.8 -1.1,-2.8 -2.8,-1.1 2.8,-1.1 Z" opacity="0.8" />
        <path d="M74,18 l0.8,2 2,0.8 -2,0.8 -0.8,2 -0.8,-2 -2,-0.8 2,-0.8 Z" opacity="0.75" />
      </g>
    </svg>
  );
}

export default OpenChest;
