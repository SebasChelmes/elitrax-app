import { useState } from 'react';
import { C, font, gcard } from '../tokens.js';
import { USER } from '../data.js';
import MetricRow from '../components/MetricRow.jsx';
import PlanBadge from '../components/PlanBadge.jsx';

function Toggle({ on, onToggle }) {
  return (
    <div onClick={onToggle} style={{
      width:44, height:26, borderRadius:13, position:'relative', cursor:'pointer',
      background: on ? C.cian : 'rgba(255,255,255,0.15)', transition:'background 0.25s',
    }}>
      <div style={{
        position:'absolute', top:3, left: on ? 21 : 3, width:20, height:20,
        borderRadius:'50%', background:C.white, transition:'left 0.25s',
        boxShadow:'0 1px 4px rgba(0,0,0,0.3)',
      }}/>
    </div>
  );
}

export default function ProfileScreen({ onSignOut }) {
  const [notif, setNotif] = useState(true);
  const [gps,   setGps]   = useState(true);

  return (
    <div style={{ height:'100%', overflowY:'auto', padding:'0 0 20px' }}>
      <div style={{ padding:'20px 20px 0' }}>
        <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:24, color:C.white, marginBottom:20 }}>Mi Perfil</div>

        {/* Avatar card */}
        <div style={{ ...gcard(20), padding:'20px', display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
          <div style={{ width:64, height:64, borderRadius:'50%',
            background:`linear-gradient(135deg, ${C.cian} 0%, #1A8AB5 100%)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:font.exo, fontWeight:700, fontSize:22, color:C.bg, flexShrink:0 }}>
            {USER.avatar}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:18, color:C.white }}>
              {USER.name} {USER.lastname}
            </div>
            <div style={{ fontFamily:font.dm, fontSize:13, color:C.muted, marginTop:2 }}>{USER.email}</div>
            <div style={{ marginTop:6 }}><PlanBadge plan={USER.plan}/></div>
          </div>
        </div>

        {/* Plan card */}
        <div style={{ ...gcard(18), padding:'16px',
          background:'linear-gradient(135deg, rgba(243,108,58,0.12) 0%, rgba(243,108,58,0.05) 100%)',
          border:'1px solid rgba(243,108,58,0.25)', marginBottom:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:15, color:C.white }}>Plan PRO+</div>
            <PlanBadge plan="PRO+"/>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {['Métricas GPS + IMU completas','IA conversacional','Plataforma web para cuerpo técnico','Hasta 3 usuarios por dispositivo'].map(f => (
              <div key={f} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:16, height:16, borderRadius:'50%', background:C.naranjaDim,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke={C.naranja} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
                </div>
                <span style={{ fontFamily:font.dm, fontSize:13, color:C.muted }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device */}
        <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:13, color:C.muted, letterSpacing:1, marginBottom:8 }}>DISPOSITIVO</div>
        <div style={{ ...gcard(18), padding:'4px 16px', marginBottom:16 }}>
          <MetricRow label="Modelo"   value="ELITRAX Motion" unit="" color={C.white}/>
          <MetricRow label="ID"       value="ELX-2409-A3F"   unit="" color={C.muted}/>
          <MetricRow label="Batería"  value="92"             unit="%" color={C.green}/>
          <MetricRow label="Firmware" value="v1.4.2"         unit="" color={C.muted} last/>
        </div>

        {/* Ajustes */}
        <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:13, color:C.muted, letterSpacing:1, marginBottom:8 }}>AJUSTES</div>
        <div style={{ ...gcard(18), padding:'0 16px', marginBottom:16 }}>
          {[
            { label:'Notificaciones', on:notif, onToggle:() => setNotif(n => !n) },
            { label:'GPS automático', on:gps,   onToggle:() => setGps(g  => !g)  },
          ].map((item, i, arr) => (
            <div key={item.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'14px 0', borderBottom: i < arr.length-1 ? `1px solid ${C.border}` : 'none' }}>
              <span style={{ fontFamily:font.dm, fontSize:15, color:C.white }}>{item.label}</span>
              <Toggle on={item.on} onToggle={item.onToggle}/>
            </div>
          ))}
        </div>

        <button onClick={onSignOut} style={{ width:'100%', background:'rgba(255,80,80,0.08)', border:'1px solid rgba(255,80,80,0.20)',
          borderRadius:14, padding:'14px 0', cursor:'pointer',
          fontFamily:font.dm, fontSize:15, color:'#FF6B6B' }}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
