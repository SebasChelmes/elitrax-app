import { C, font, gcard } from '../tokens.js';
import MetricRow from '../components/MetricRow.jsx';

export default function HeatmapScreen({ session, onBack }) {
  const s = session;
  return (
    <div style={{ height:'100%', overflowY:'auto', padding:'0 0 20px' }}>
      <div style={{ padding:'20px 20px 16px', display:'flex', alignItems:'center', gap:12 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}>
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1L1 8.5L9 16" stroke={C.cian} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div>
          <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:20, color:C.white }}>Mapa de calor</div>
          <div style={{ fontFamily:font.dm, fontSize:12, color:C.muted }}>{s.date} · {s.type}</div>
        </div>
      </div>

      <div style={{ padding:'0 20px', marginBottom:16 }}>
        <div style={{ ...gcard(18), padding:16 }}>
          <svg width="100%" viewBox="0 0 300 200" style={{ display:'block' }}>
            <rect width="300" height="200" rx="8" fill="#0A2A18"/>
            <rect x="4" y="4" width="292" height="192" rx="6" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
            <line x1="150" y1="4" x2="150" y2="196" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
            <circle cx="150" cy="100" r="30" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
            <circle cx="150" cy="100" r="2" fill="rgba(255,255,255,0.20)"/>
            <rect x="4" y="60" width="50" height="80" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
            <rect x="246" y="60" width="50" height="80" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
            <rect x="0" y="80" width="10" height="40" rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            <rect x="290" y="80" width="10" height="40" rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            <ellipse cx="100" cy="100" rx="55" ry="50" fill="rgba(243,108,58,0.12)"/>
            <ellipse cx="95" cy="105" rx="38" ry="35" fill="rgba(243,108,58,0.22)"/>
            <ellipse cx="90" cy="108" rx="24" ry="22" fill="rgba(243,108,58,0.38)"/>
            <ellipse cx="88" cy="110" rx="14" ry="12" fill="rgba(255,80,40,0.58)"/>
            <ellipse cx="87" cy="111" rx="7"  ry="6"  fill="rgba(255,40,20,0.80)"/>
            <ellipse cx="70"  cy="60"  rx="20" ry="15" fill="rgba(70,199,240,0.15)"/>
            <ellipse cx="130" cy="80"  rx="15" ry="12" fill="rgba(70,199,240,0.12)"/>
            <ellipse cx="60"  cy="140" rx="18" ry="14" fill="rgba(70,199,240,0.10)"/>
            <ellipse cx="140" cy="130" rx="12" ry="10" fill="rgba(243,108,58,0.15)"/>
            <ellipse cx="180" cy="90"  rx="16" ry="13" fill="rgba(70,199,240,0.08)"/>
            <circle cx="87" cy="111" r="4" fill={C.cian} opacity="0.9"/>
            <circle cx="87" cy="111" r="9" fill={C.cian} opacity="0.2"/>
          </svg>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12 }}>
            <span style={{ fontFamily:font.dm, fontSize:11, color:C.faint }}>Menos tiempo</span>
            <div style={{ flex:1, height:6, borderRadius:3, margin:'0 10px',
              background:'linear-gradient(90deg, rgba(70,199,240,0.3), rgba(243,108,58,0.6), rgba(255,40,20,0.9))' }}/>
            <span style={{ fontFamily:font.dm, fontSize:11, color:C.faint }}>Más tiempo</span>
          </div>
        </div>
      </div>

      <div style={{ padding:'0 20px' }}>
        <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:14, color:C.white, marginBottom:10 }}>
          Zonas de actividad
        </div>
        <div style={{ ...gcard(18), padding:'4px 16px' }}>
          <MetricRow label="Zona dominante"    value={s.heatZone}                        unit="" color={C.naranja}/>
          <MetricRow label="Tiempo en zona"    value="38"                                unit="min" color={C.cian}/>
          <MetricRow label="Distancia en zona" value="4.8"                               unit="km"  color={C.cian}/>
          <MetricRow label="Sprints en zona"   value={Math.floor(s.sprints * 0.6)} unit=""    color={C.naranja} last/>
        </div>
      </div>
    </div>
  );
}
