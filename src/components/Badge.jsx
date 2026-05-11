import { C, font } from '../tokens.js';

export default function Badge({ label, color }) {
  color = color || C.cian;
  const bg = color === C.cian    ? C.cianDim
           : color === C.naranja ? C.naranjaDim
           : color === C.green   ? C.greenDim
           : 'rgba(255,255,255,0.07)';
  return (
    <span style={{
      fontFamily:font.dm, fontSize:10, fontWeight:600, color,
      background:bg, border:`1px solid ${color}22`, borderRadius:20,
      padding:'2px 8px', letterSpacing:0.4, whiteSpace:'nowrap',
    }}>{label}</span>
  );
}
