import React from 'react';
import { C, font, gcard } from '../tokens.js';

const TABS = [
  { id:'home',     label:'Inicio',   icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 20v-7h6v7" strokeWidth="1.6" strokeLinecap="round"/></svg> },
  { id:'sessions', label:'Sesiones', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="16" height="16" rx="3" strokeWidth="1.6"/><path d="M7 11h8M7 7h5M7 15h3" strokeWidth="1.6" strokeLinecap="round"/></svg> },
  { id:'vitrina',  label:'Vitrina',  icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3C7 3 3.5 5.8 3 9.5c-.1.8-.1 1.7 0 2.5C3.5 16 7 19 11 19s7.5-3 8-7c.1-.8.1-1.7 0-2.5C18.5 5.8 15 3 11 3z" strokeWidth="1.6"/><circle cx="11" cy="11" r="3" strokeWidth="1.6"/></svg> },
  { id:'profile',  label:'Perfil',   icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" strokeWidth="1.6"/><path d="M3 20c0-4 3.6-7 8-7s8 3 8 7" strokeWidth="1.6" strokeLinecap="round"/></svg> },
];

export default function BottomNav({ tab, onChange }) {
  return (
    <div style={{ ...gcard(0), borderTop:`1px solid ${C.border}`, borderRadius:0,
      display:'flex', padding:'8px 0 20px', flexShrink:0 }}>
      {TABS.map(t => {
        const active = t.id === tab;
        const color  = t.id === 'vitrina' ? (active ? C.naranja : C.muted) : active ? C.cian : C.muted;
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
            style={{ flex:1, background:'none', border:'none', cursor:'pointer',
              display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'4px 0' }}>
            <div style={{ color, transition:'color 0.2s' }}>
              {React.cloneElement(t.icon, { stroke: color })}
            </div>
            <span style={{ fontFamily:font.dm, fontSize:10, color, fontWeight: active ? 600 : 400, transition:'color 0.2s' }}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
