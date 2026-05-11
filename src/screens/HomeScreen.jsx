import { C, font, gcard } from '../tokens.js';
import { USER, SESSIONS, WEEKLY } from '../data.js';
import ArcRing   from '../components/ArcRing.jsx';
import WeeklyBar from '../components/WeeklyBar.jsx';
import PlanBadge from '../components/PlanBadge.jsx';

export default function HomeScreen({ onStartLive, onSessionDetail }) {
  const last     = SESSIONS[0];
  const totalKm  = SESSIONS.reduce((s, x) => s + x.distance, 0).toFixed(1);

  return (
    <div style={{ overflowY:'auto', height:'100%', padding:'0 0 12px' }}>
      <div style={{ padding:'20px 20px 0' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
          <div>
            <div style={{ fontFamily:font.dm, fontSize:13, color:C.muted }}>Buenas tardes,</div>
            <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:24, color:C.white }}>
              {USER.name}{' '}
              <span style={{ fontFamily:font.mono, fontSize:13, verticalAlign:'middle' }}>
                <PlanBadge plan={USER.plan}/>
              </span>
            </div>
          </div>
          <div style={{ width:44, height:44, borderRadius:'50%',
            background:`linear-gradient(135deg, ${C.cian} 0%, #1A8AB5 100%)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:font.exo, fontWeight:700, fontSize:14, color:C.bg }}>
            {USER.avatar}
          </div>
        </div>
        <div style={{ ...gcard(20), display:'inline-flex', alignItems:'center', gap:7,
          padding:'5px 14px', marginTop:10 }}>
          <div style={{ width:7, height:7, borderRadius:'50%', background:C.green,
            boxShadow:`0 0 5px ${C.green}` }}/>
          <span style={{ fontFamily:font.dm, fontSize:12, color:C.white }}>ELITRAX Motion conectado</span>
          <span style={{ fontFamily:font.mono, fontSize:11, color:C.muted }}>92%</span>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding:'16px 20px 0' }}>
        <button onClick={onStartLive} style={{
          width:'100%', background:`linear-gradient(135deg, ${C.naranja} 0%, #D4502A 100%)`,
          border:'none', borderRadius:18, padding:'18px 20px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          cursor:'pointer', boxShadow:`0 8px 24px rgba(243,108,58,0.30)`,
        }}>
          <div style={{ textAlign:'left' }}>
            <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:18, color:C.white }}>Iniciar Sesión</div>
            <div style={{ fontFamily:font.dm, fontSize:12, color:'rgba(255,255,255,0.75)', marginTop:2 }}>GPS + IMU activos</div>
          </div>
          <div style={{ width:48, height:48, borderRadius:'50%',
            background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polygon points="6,3 17,10 6,17" fill="white"/>
            </svg>
          </div>
        </button>
      </div>

      {/* Esta semana */}
      <div style={{ padding:'20px 20px 0' }}>
        <div style={{ ...gcard(20), padding:'18px 18px 14px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:14, color:C.white }}>Esta semana</div>
              <div style={{ fontFamily:font.mono, fontSize:26, fontWeight:700, color:C.cian, marginTop:2 }}>
                {totalKm} <span style={{ fontSize:13, color:C.muted, fontFamily:font.dm }}>km</span>
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontFamily:font.dm, fontSize:12, color:C.muted }}>5 sesiones</div>
              <div style={{ fontFamily:font.dm, fontSize:12, color:C.green, marginTop:2 }}>↑ 18% vs anterior</div>
            </div>
          </div>
          <WeeklyBar data={WEEKLY} todayIdx={1}/>
        </div>
      </div>

      {/* Última sesión */}
      <div style={{ padding:'16px 20px 0' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
          <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:15, color:C.white }}>Última sesión</div>
          <span style={{ fontFamily:font.dm, fontSize:12, color:C.cian, cursor:'pointer' }}>Ver todas →</span>
        </div>
        <button onClick={() => onSessionDetail(last)} style={{
          width:'100%', ...gcard(18), padding:'16px', border:'none', cursor:'pointer', textAlign:'left',
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
            <div>
              <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:15, color:C.white }}>{last.type}</div>
              <div style={{ fontFamily:font.dm, fontSize:12, color:C.muted, marginTop:2 }}>{last.date} · {last.duration}</div>
            </div>
            <ArcRing value={last.explosivity} size={58} color={C.naranja} label={last.explosivity} sub="exp."/>
          </div>
          <div style={{ display:'flex', gap:0 }}>
            {[
              { v:last.distance, u:'km',   label:'Distancia', c:C.cian },
              { v:last.maxSpeed, u:'km/h', label:'Vel. máx',  c:C.cian },
              { v:last.sprints,  u:'',     label:'Sprints',   c:C.naranja },
            ].map((m, i) => (
              <div key={i} style={{ flex:1, textAlign:'center',
                borderRight: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ fontFamily:font.mono, fontSize:20, fontWeight:700, color:m.c }}>{m.v}</div>
                <div style={{ fontFamily:font.dm, fontSize:10, color:C.muted, marginTop:1 }}>{m.u} {m.label}</div>
              </div>
            ))}
          </div>
        </button>
      </div>

      {/* Resumen del mes */}
      <div style={{ padding:'16px 20px 0' }}>
        <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:15, color:C.white, marginBottom:10 }}>
          Resumen del mes
        </div>
        <div style={{ display:'flex', gap:10 }}>
          {[
            { label:'Dist. promedio', value:'9.6',  unit:'km',   color:C.cian   },
            { label:'Vel. máx prom.', value:'28.2', unit:'km/h', color:C.cian   },
            { label:'Sprints prom.',  value:'24.2', unit:'',     color:C.naranja },
          ].map((m, i) => (
            <div key={i} style={{ flex:1, ...gcard(14), padding:'14px 10px', textAlign:'center' }}>
              <div style={{ fontFamily:font.mono, fontSize:19, fontWeight:700, color:m.color }}>{m.value}</div>
              <div style={{ fontFamily:font.dm, fontSize:10, color:C.muted, marginTop:3 }}>{m.unit} {m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
