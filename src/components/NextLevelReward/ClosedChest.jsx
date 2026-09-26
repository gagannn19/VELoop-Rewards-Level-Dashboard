/** Inline 3D-style closed treasure chest — original illustration (no
 * stock-image licensing): royal-blue lacquer body with champagne-gold metalwork,
 * matching the dashboard's blue + gold palette. Shown until the card is
 * first hovered/tapped; see OpenChest.jsx for the revealed state. */
function ClosedChest({ className }) {
  return (
    <svg viewBox="0 0 120 110" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ccBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2f4ea8" />
          <stop offset="60%" stopColor="#1a2e6b" />
          <stop offset="100%" stopColor="#0f1b45" />
        </linearGradient>
        <linearGradient id="ccLid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4268cf" />
          <stop offset="65%" stopColor="#23408f" />
          <stop offset="100%" stopColor="#182d68" />
        </linearGradient>
        <linearGradient id="ccGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff4d6" />
          <stop offset="24%" stopColor="#f3d68f" />
          <stop offset="55%" stopColor="#d9a13c" />
          <stop offset="80%" stopColor="#a8741f" />
          <stop offset="100%" stopColor="#f0c878" />
        </linearGradient>
        <linearGradient id="ccGoldSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f6e2b8" />
          <stop offset="45%" stopColor="#e2b155" />
          <stop offset="100%" stopColor="#9c6b1c" />
        </linearGradient>
        <clipPath id="ccLidClip">
          <path d="M10,60 L10,44 C10,24 30,14 60,14 C90,14 110,24 110,44 L110,60 Z" />
        </clipPath>
      </defs>

      {/* body */}
      <rect x="12" y="58" width="96" height="44" rx="6" fill="url(#ccBody)" />
      <rect x="12" y="62" width="96" height="1" fill="#ffffff" opacity="0.07" />
      <rect x="12" y="96" width="96" height="6" rx="3" fill="url(#ccGold)" />

      {/* lid (domed) */}
      <path d="M10,60 L10,44 C10,24 30,14 60,14 C90,14 110,24 110,44 L110,60 Z" fill="url(#ccLid)" />
      <path
        d="M11,44 C11,25 31,15 60,15 C89,15 109,25 109,44"
        fill="none"
        stroke="#8dd0ff"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
      <path d="M20,40 C22,29 34,21 54,18" fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="3" strokeLinecap="round" />

      {/* straps */}
      <g clipPath="url(#ccLidClip)">
        <rect x="24" y="10" width="9" height="52" fill="url(#ccGoldSide)" />
        <rect x="87" y="10" width="9" height="52" fill="url(#ccGoldSide)" />
      </g>
      <rect x="24" y="62" width="9" height="34" fill="url(#ccGoldSide)" />
      <rect x="87" y="62" width="9" height="34" fill="url(#ccGoldSide)" />

      {/* lid lip */}
      <rect x="8" y="54" width="104" height="8" rx="3" fill="url(#ccGold)" />
      <rect x="10" y="55" width="100" height="1" fill="#ffffff" opacity="0.45" />

      {/* studs */}
      <g fill="#fff4d6" opacity="0.85">
        <circle cx="28.5" cy="68" r="1.3" />
        <circle cx="28.5" cy="90" r="1.3" />
        <circle cx="91.5" cy="68" r="1.3" />
        <circle cx="91.5" cy="90" r="1.3" />
      </g>

      {/* lid emblem */}
      <path
        d="M60,24 L62.6,30.4 L69,33 L62.6,35.6 L60,42 L57.4,35.6 L51,33 L57.4,30.4 Z"
        fill="url(#ccGold)"
        stroke="#fff4d6"
        strokeOpacity="0.6"
        strokeWidth="0.6"
      />

      {/* lock plate */}
      <path
        d="M50,52 H70 V67 C70,74 60,79 60,79 C60,79 50,74 50,67 Z"
        fill="url(#ccGold)"
        stroke="#fff4d6"
        strokeOpacity="0.55"
        strokeWidth="0.8"
      />
      <circle cx="60" cy="63" r="3.2" fill="#1a1206" />
      <path d="M58.6,64 L57.8,71 H62.2 L61.4,64 Z" fill="#1a1206" />
    </svg>
  );
}

export default ClosedChest;
