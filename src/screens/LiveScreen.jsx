import { useState, useEffect } from 'react';
import { C, font, gcard } from '../tokens.js';

export default function LiveScreen({ onStop }) {
  const [seconds,  setSeconds]  = useState(0);
  const [paused,   setPaused]   = useState(false);
  const [distance, setDistance] = useState(0.00);
  const [speed,    setSpeed]    = useState(0.0);
  const [sprints,  setSprints]  = useState(0);
  const [acels,    setAcels]    = useState(0);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setSeconds(s => s + 1);
      setDistance(d => +(d + 0.0021 + Math.random() * 0.0008).toFixed(4));
      setSpeed(() => +(10 + Math.random() * 18).toFixed(1));
      if (Math.random() < 0.04) setSprints(s => s + 1);
      if (Math.random() < 0.08) setAcels(a => a + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [paused]);

  const fmt = s => {
    const m = Math.floor(s / 60), sec = s % 60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  return (
    <div style={{ height:'100%', background:`linear-gradient(180deg, #060E1A 0%, ${C.bg} 100%)`,
      display:'flex', flexDirection:'column', padding:'20px 20px 32px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:18, color:C.white }}>Sesión en vivo</div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'#FF4444',
              boxShadow:'0 0 8px #FF4444', animation:'pulse 1s infinite' }}/>
            <span style={{ fontFamily:font.dm, fontSize:12, color:C.muted }}>GPS + IMU activos</span>
          </div>
        </div>
        <div style={{ ...gcard(20), padding:'6px 14px' }}>
          <span style={{ fontFamily:font.dm, fontSize:12, color:C.green }}>92% 🔋</span>
        </div>
      </div>

      <div style={{ textAlign:'center', marginBottom:28 }}>
        <div style={{ fontFamily:font.mono, fontSize:56, fontWeight:700, color:C.white, letterSpacing:-2 }}>
          {fmt(seconds)}
        </div>
        <div style={{ fontFamily:font.dm, fontSize:12, color:C.muted, marginTop:4 }}>
          {paused ? '⏸ EN PAUSA' : 'GRABANDO'}
        </div>
      </div>

      {/* GPS track */}
      <div style={{ ...gcard(18), padding:16, marginBottom:16, flex:'none' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
          <span style={{ fontFamily:font.dm, fontSize:12, color:C.muted }}>Recorrido GPS</span>
          <span style={{ fontFamily:font.mono, fontSize:12, color:C.cian }}>{distance.toFixed(2)} km</span>
        </div>
        <svg width="100%" height="80" viewBox="0 0 280 80" preserveAspectRatio="xMidYMid meet">
          <rect width="280" height="80" rx="8" fill="rgba(70,199,240,0.04)"/>
          <line x1="0" y1="40" x2="280" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          <line x1="140" y1="0" x2="140" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          <polyline
            points="20,60 45,35 70,50 95,25 120,40 145,55 170,30 195,45 220,20 245,38 260,55"
            fill="none" stroke={C.cian} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
          <circle cx="260" cy="55" r="5" fill={C.cian} opacity="1"/>
          <circle cx="260" cy="55" r="10" fill={C.cian} opacity="0.2"/>
        </svg>
      </div>

      {/* Live metrics */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:20 }}>
        {[
          { label:'Velocidad actual', value: paused ? '0.0' : speed.toFixed(1), unit:'km/h', color:C.cian },
          { label:'Vel. máxima',      value:'28.4', unit:'km/h', color:C.cian },
          { label:'Sprints',          value:sprints, unit:'',    color:C.naranja },
          { label:'Aceleraciones',    value:acels,   unit:'',    color:C.naranja },
        ].map((m, i) => (
          <div key={i} style={{ ...gcard(14), padding:'12px 14px' }}>
            <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted, marginBottom:4 }}>{m.label}</div>
            <div style={{ fontFamily:font.mono, fontSize:22, fontWeight:700, color:m.color }}>
              {m.value} <span style={{ fontSize:11, color:C.faint, fontFamily:font.dm }}>{m.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display:'flex', gap:12, marginTop:'auto' }}>
        <button onClick={() => setPaused(p => !p)} style={{
          flex:1, ...gcard(14), padding:'16px 0', border:'none', cursor:'pointer',
          fontFamily:font.exo, fontWeight:700, fontSize:14, color:C.white, letterSpacing:1,
        }}>{paused ? '▶ CONTINUAR' : '⏸ PAUSAR'}</button>
        <button onClick={onStop} style={{
          flex:1, background:'rgba(255,80,80,0.15)', border:'1px solid rgba(255,80,80,0.40)',
          borderRadius:14, padding:'16px 0', cursor:'pointer',
          fontFamily:font.exo, fontWeight:700, fontSize:14, color:'#FF6B6B', letterSpacing:1,
        }}>■ DETENER</button>
      </div>
    </div>
  );
}
