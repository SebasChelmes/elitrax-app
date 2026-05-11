import { C, font } from '../tokens.js';

export default function ArcRing({ value, size = 60, color, label, sub, strokeWidth = 5 }) {
  const r   = (size - strokeWidth * 2) / 2;
  const cir = 2 * Math.PI * r;
  const cx  = size / 2, cy = size / 2;
  return (
    <div style={{ position:'relative', width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={strokeWidth}/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={`${cir*(value/100)} ${cir*(1-value/100)}`}
          strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center' }}>
        <div style={{ fontFamily:font.mono, fontSize:size*0.26, fontWeight:700, color, lineHeight:1 }}>{label}</div>
        {sub && <div style={{ fontFamily:font.dm, fontSize:size*0.14, color:C.faint, marginTop:1 }}>{sub}</div>}
      </div>
    </div>
  );
}
