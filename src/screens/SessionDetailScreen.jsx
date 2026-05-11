import { C, font, gcard } from '../tokens.js';
import ArcRing   from '../components/ArcRing.jsx';
import MetricRow from '../components/MetricRow.jsx';
import SpeedLine from '../components/SpeedLine.jsx';

export default function SessionDetailScreen({ session, onBack, onHeatmap, showExplosivity = true }) {
  const s = session;
  return (
    <div style={{ height:'100%', overflowY:'auto', padding:'0 0 20px' }}>
      <div style={{ padding:'20px 20px 0' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer',
          display:'flex', alignItems:'center', gap:8, marginBottom:16, padding:0 }}>
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1L1 8.5L9 16" stroke={C.cian} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontFamily:font.dm, fontSize:14, color:C.cian }}>Volver</span>
        </button>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:22, color:C.white }}>{s.type}</div>
            <div style={{ fontFamily:font.dm, fontSize:13, color:C.muted, marginTop:2 }}>{s.date} · {s.duration}</div>
          </div>
          {showExplosivity && (
            <ArcRing value={s.explosivity} size={64} color={C.naranja} label={s.explosivity} sub="explosiv."/>
          )}
        </div>
      </div>

      {/* Hero metrics */}
      <div style={{ padding:'16px 20px 0' }}>
        <div style={{ display:'flex', gap:10 }}>
          <div style={{ flex:2, ...gcard(18), padding:'16px',
            background:'linear-gradient(135deg, rgba(70,199,240,0.12) 0%, rgba(70,199,240,0.05) 100%)',
            border:'1px solid rgba(70,199,240,0.20)' }}>
            <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted }}>DISTANCIA</div>
            <div style={{ fontFamily:font.mono, fontSize:36, fontWeight:700, color:C.cian, lineHeight:1, marginTop:4 }}>
              {s.distance}
            </div>
            <div style={{ fontFamily:font.dm, fontSize:13, color:C.muted }}>kilómetros</div>
          </div>
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:10 }}>
            <div style={{ ...gcard(14), padding:'12px' }}>
              <div style={{ fontFamily:font.dm, fontSize:10, color:C.muted }}>VEL. MÁX</div>
              <div style={{ fontFamily:font.mono, fontSize:20, fontWeight:700, color:C.cian }}>{s.maxSpeed}</div>
              <div style={{ fontFamily:font.dm, fontSize:10, color:C.faint }}>km/h</div>
            </div>
            <div style={{ ...gcard(14), padding:'12px' }}>
              <div style={{ fontFamily:font.dm, fontSize:10, color:C.muted }}>VEL. PROM</div>
              <div style={{ fontFamily:font.mono, fontSize:20, fontWeight:700, color:C.cian }}>{s.avgSpeed}</div>
              <div style={{ fontFamily:font.dm, fontSize:10, color:C.faint }}>km/h</div>
            </div>
          </div>
        </div>
      </div>

      {/* Speed chart */}
      <div style={{ padding:'16px 20px 0' }}>
        <div style={{ ...gcard(18), padding:'16px' }}>
          <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:14, color:C.white, marginBottom:12 }}>
            Velocidad durante la sesión
          </div>
          <SpeedLine values={[8,14,22,18,28,20,26,16,24,19,28,12,20,18,24]} color={C.cian} width={300} height={48}/>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
            <span style={{ fontFamily:font.dm, fontSize:10, color:C.faint }}>0 min</span>
            <span style={{ fontFamily:font.dm, fontSize:10, color:C.faint }}>{s.duration}</span>
          </div>
        </div>
      </div>

      {/* GPS Metrics */}
      <div style={{ padding:'16px 20px 0' }}>
        <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:14, color:C.cian, marginBottom:10, letterSpacing:1 }}>
          GPS — POSICIÓN Y DESPLAZAMIENTO
        </div>
        <div style={{ ...gcard(18), padding:'4px 16px' }}>
          <MetricRow label="Distancia total"    value={s.distance}  unit="km"   color={C.cian}/>
          <MetricRow label="Velocidad máxima"   value={s.maxSpeed}  unit="km/h" color={C.cian}/>
          <MetricRow label="Velocidad promedio" value={s.avgSpeed}  unit="km/h" color={C.cian}/>
          <MetricRow label="Zona dominante"     value={s.heatZone} unit=""     color={C.muted} last/>
        </div>
      </div>

      {/* IMU Metrics */}
      <div style={{ padding:'16px 20px 0' }}>
        <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:14, color:C.naranja, marginBottom:10, letterSpacing:1 }}>
          IMU — MOVIMIENTO E INTENSIDAD
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16 }}>
          {[
            { label:'Sprints',       value:s.sprints, color:C.naranja },
            { label:'Aceleraciones', value:s.acels,   color:C.naranja },
            { label:'Saltos',        value:s.jumps,   color:C.cian },
            { label:'Impactos',      value:s.impacts, color:C.cian },
          ].map((m, i) => (
            <div key={i} style={{ ...gcard(14), padding:'14px' }}>
              <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted, marginBottom:4 }}>{m.label}</div>
              <div style={{ fontFamily:font.mono, fontSize:28, fontWeight:700, color:m.color }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap preview */}
      <div style={{ padding:'0 20px' }}>
        <button onClick={onHeatmap} style={{
          width:'100%', ...gcard(18), padding:'14px 16px',
          border:'none', cursor:'pointer', textAlign:'left',
          display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <div>
            <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:14, color:C.white }}>Mapa de calor</div>
            <div style={{ fontFamily:font.dm, fontSize:12, color:C.muted, marginTop:2 }}>Zona dominante: {s.heatZone}</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:40, height:28, borderRadius:6,
              background:'linear-gradient(90deg, rgba(70,199,240,0.2), rgba(243,108,58,0.8), rgba(255,40,40,0.9))',
              position:'relative' }}>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'#FF2222', boxShadow:'0 0 8px #FF2222' }}/>
              </div>
            </div>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M1 1l6 6.5L1 13" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
