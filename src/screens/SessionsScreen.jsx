import { useState } from 'react';
import { C, font, gcard } from '../tokens.js';
import { SESSIONS } from '../data.js';
import ArcRing from '../components/ArcRing.jsx';

export default function SessionsScreen({ onDetail }) {
  const [filter, setFilter] = useState('Todas');
  const filters = ['Todas', 'Partido', 'Entrenamiento'];
  const shown = filter === 'Todas' ? SESSIONS : SESSIONS.filter(s => s.type === filter);

  return (
    <div style={{ height:'100%', overflowY:'auto', padding:'0 0 12px' }}>
      <div style={{ padding:'20px 20px 0' }}>
        <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:24, color:C.white, marginBottom:16 }}>
          Mis Sesiones
        </div>
        <div style={{ display:'flex', gap:8, marginBottom:16 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              ...gcard(20), padding:'6px 16px', border:'none', cursor:'pointer',
              background: filter === f ? C.cian : C.card,
              fontFamily:font.dm, fontSize:13, fontWeight: filter === f ? 600 : 400,
              color: filter === f ? C.bg : C.muted, transition:'all 0.2s',
            }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 20px', display:'flex', flexDirection:'column', gap:12 }}>
        {shown.map(s => (
          <button key={s.id} onClick={() => onDetail(s)} style={{
            ...gcard(18), padding:'16px', border:`1px solid ${C.border}`,
            cursor:'pointer', textAlign:'left', width:'100%',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:15, color:C.white }}>{s.type}</div>
                  <div style={{ ...gcard(20), padding:'2px 8px',
                    background: s.type === 'Partido' ? C.naranjaDim : C.cianDim }}>
                    <span style={{ fontFamily:font.dm, fontSize:10,
                      color: s.type === 'Partido' ? C.naranja : C.cian }}>{s.type}</span>
                  </div>
                </div>
                <div style={{ fontFamily:font.dm, fontSize:12, color:C.muted, marginTop:3 }}>
                  {s.date} · {s.duration}
                </div>
              </div>
              <div style={{ fontFamily:font.mono, fontSize:22, fontWeight:700, color:C.cian }}>
                {s.distance}<span style={{ fontSize:12, color:C.muted }}> km</span>
              </div>
            </div>
            <div style={{ display:'flex', gap:16 }}>
              {[
                { label:'Vel. máx', value:`${s.maxSpeed}`, unit:'km/h' },
                { label:'Sprints',  value:s.sprints,       unit:'' },
                { label:'Impactos', value:s.impacts,       unit:'' },
              ].map((m, i) => (
                <div key={i}>
                  <div style={{ fontFamily:font.mono, fontSize:14, fontWeight:700, color:C.muted }}>
                    {m.value}<span style={{ fontFamily:font.dm, fontSize:11 }}>{m.unit && ' '+m.unit}</span>
                  </div>
                  <div style={{ fontFamily:font.dm, fontSize:10, color:C.faint, marginTop:1 }}>{m.label}</div>
                </div>
              ))}
              <div style={{ marginLeft:'auto' }}>
                <ArcRing value={s.explosivity} size={44} strokeWidth={4} color={C.naranja} label={s.explosivity} sub=""/>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
