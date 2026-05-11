import { C, font, gcard } from '../tokens.js';

function ElitraxLogo({ size = 100 }) {
  const r1 = size * 0.44, r2 = size * 0.33, cx = size / 2, cy = size / 2;
  const circ1 = 2 * Math.PI * r1;
  return (
    <div style={{ position:'relative', width:size, height:size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r1} fill="none" stroke="rgba(70,199,240,0.12)" strokeWidth="1"/>
        <circle cx={cx} cy={cy} r={r1} fill="none" stroke={C.cian} strokeWidth="1.8"
          strokeDasharray={`${circ1*0.70} ${circ1*0.30}`}
          strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>
        <circle cx={cx} cy={cy} r={r2} fill="rgba(70,199,240,0.07)"/>
        <circle cx={cx} cy={cy} r={r2} fill="none" stroke="rgba(70,199,240,0.20)" strokeWidth="1"/>
        <circle cx={cx + r1*0.7} cy={cy - r1*0.7} r="4" fill={C.naranja}/>
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <svg width={size*0.32} height={size*0.32} viewBox="0 0 32 32" fill="none">
          <rect x="4"  y="5"  width="22" height="3" rx="1.5" fill={C.cian}/>
          <rect x="4"  y="14" width="16" height="3" rx="1.5" fill={C.cian}/>
          <rect x="4"  y="23" width="22" height="3" rx="1.5" fill={C.cian}/>
          <rect x="24" y="5"  width="3"  height="21" rx="1.5" fill={C.naranja} opacity="0.7"/>
        </svg>
      </div>
    </div>
  );
}

export { ElitraxLogo };

export default function SplashScreen({ onLogin, onRegister }) {
  return (
    <div style={{
      height:'100%',
      background:`linear-gradient(160deg, ${C.bg2} 0%, ${C.bg} 55%, #0D1E3C 100%)`,
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'space-between',
      padding:'80px 28px 56px',
    }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20, flex:1, justifyContent:'center' }}>
        <ElitraxLogo size={120}/>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily:font.exo, fontWeight:800, fontSize:38, color:C.white, letterSpacing:7, lineHeight:1 }}>
            ELITRAX
          </div>
          <div style={{ fontFamily:font.dm, fontSize:11, color:C.cian, letterSpacing:3.5, marginTop:10, opacity:0.85 }}>
            CONOCÉ TU RENDIMIENTO REAL
          </div>
        </div>
      </div>
      <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:12 }}>
        <button onClick={onLogin} style={{
          background:`linear-gradient(135deg, ${C.cian} 0%, #2EB5E0 100%)`,
          color:C.bg, border:'none', borderRadius:14,
          height:52, fontFamily:font.exo, fontWeight:700, fontSize:15,
          letterSpacing:1.5, cursor:'pointer', width:'100%',
          boxShadow:`0 8px 24px rgba(70,199,240,0.30)`,
        }}>INGRESAR</button>
        <button onClick={onRegister} style={{
          ...gcard(14), background:'rgba(255,255,255,0.06)',
          color:C.white, border:`1px solid ${C.border}`,
          height:52, fontFamily:font.dm, fontSize:15,
          cursor:'pointer', width:'100%',
        }}>Crear cuenta gratuita</button>
        <div style={{ textAlign:'center', paddingTop:4 }}>
          <span style={{ fontFamily:font.dm, fontSize:12, color:C.faint }}>¿No tenés el dispositivo? </span>
          <span style={{ fontFamily:font.dm, fontSize:12, color:C.cian, fontWeight:600 }}>
            Compralo en elitrax.com →
          </span>
        </div>
      </div>
    </div>
  );
}
