import { C, font } from '../tokens.js';

export default function PlanBadge({ plan }) {
  const cfg = {
    'FREE':  { color: C.muted,   bg: 'rgba(255,255,255,0.07)' },
    'PRO':   { color: C.cian,    bg: C.cianDim },
    'PRO+':  { color: C.naranja, bg: C.naranjaDim },
  }[plan] || { color: C.muted, bg: 'rgba(255,255,255,0.07)' };
  return (
    <span style={{
      fontFamily:font.dm, fontSize:10, fontWeight:700,
      color:cfg.color, background:cfg.bg,
      border:`1px solid ${cfg.color}33`, borderRadius:20,
      padding:'2px 8px', letterSpacing:0.4,
    }}>{plan}</span>
  );
}
