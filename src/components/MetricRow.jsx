import { C, font } from '../tokens.js';

export default function MetricRow({ label, value, unit, color, last = false }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'13px 0', borderBottom: last ? 'none' : `1px solid ${C.border}` }}>
      <span style={{ fontFamily:font.dm, fontSize:14, color:C.muted }}>{label}</span>
      <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
        <span style={{ fontFamily:font.mono, fontSize:15, fontWeight:700, color }}>{value}</span>
        {unit && <span style={{ fontFamily:font.dm, fontSize:12, color:C.faint }}>{unit}</span>}
      </div>
    </div>
  );
}
