import { useState, useRef, useEffect } from 'react';
import { C, font, gcard } from '../tokens.js';
import { AI_MSGS } from '../data.js';

export default function AIChatOverlay({ onClose }) {
  const [msgs,   setMsgs]   = useState(AI_MSGS);
  const [input,  setInput]  = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollTop = endRef.current.scrollHeight;
  }, [msgs, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMsgs(m => [...m, { role:'user', text:userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { role:'ai', text:'Analizando tus datos... Basándome en tus últimas 5 sesiones, tu rendimiento va en alza. ¡Seguí así!' }]);
    }, 1600);
  };

  return (
    <div style={{ position:'absolute', inset:0, zIndex:100, display:'flex', flexDirection:'column' }}>
      <div onClick={onClose} style={{ flex:1, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(4px)' }}/>
      <div style={{ background:`linear-gradient(180deg, #0D1E38 0%, ${C.bg2} 100%)`,
        borderTop:`1px solid ${C.border}`, borderRadius:'24px 24px 0 0',
        padding:'0 0 40px', maxHeight:'75%', display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', justifyContent:'center', padding:'12px 0 0' }}>
          <div style={{ width:40, height:4, borderRadius:2, background:C.border }}/>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 20px 16px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:12,
              background:`linear-gradient(135deg, ${C.cian} 0%, #1A8AB5 100%)`,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="7" r="5" stroke={C.bg} strokeWidth="1.6"/>
                <circle cx="6.5" cy="7" r="1" fill={C.bg}/>
                <circle cx="11.5" cy="7" r="1" fill={C.bg}/>
                <path d="M4.5 12.5C3 14 2.5 16 2.5 16h13s-.5-2-2-3.5" stroke={C.bg} strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:15, color:C.white }}>ELITRAX IA</div>
              <div style={{ fontFamily:font.dm, fontSize:11, color:C.green }}>● En línea</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer',
            color:C.muted, fontSize:22, lineHeight:1, padding:4 }}>×</button>
        </div>
        <div ref={endRef} style={{ flex:1, overflowY:'auto', padding:'0 16px', display:'flex', flexDirection:'column', gap:10 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display:'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth:'82%', padding:'10px 14px',
                borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: m.role === 'user'
                  ? `linear-gradient(135deg, ${C.cian} 0%, #2EB5E0 100%)`
                  : C.card,
                border: m.role === 'ai' ? `1px solid ${C.border}` : 'none',
                fontFamily:font.dm, fontSize:14, lineHeight:1.5,
                color: m.role === 'user' ? C.bg : C.white,
              }}>{m.text}</div>
            </div>
          ))}
          {typing && (
            <div style={{ display:'flex', gap:5, padding:'10px 14px', ...gcard(18), alignSelf:'flex-start', width:60 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:C.cian, opacity:0.6,
                  animation:`bounce 1s infinite ${i*0.15}s` }}/>
              ))}
            </div>
          )}
        </div>
        <div style={{ padding:'12px 16px 0', display:'flex', gap:10, alignItems:'center' }}>
          <div style={{ flex:1, ...gcard(24), padding:'12px 16px', display:'flex', alignItems:'center' }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Preguntale algo a tu entrenador IA..."
              style={{ background:'none', border:'none', outline:'none', flex:1,
                fontFamily:font.dm, fontSize:14, color:C.white }}/>
          </div>
          <button onClick={send} style={{
            width:44, height:44, borderRadius:'50%', flexShrink:0,
            background:`linear-gradient(135deg, ${C.cian} 0%, #2EB5E0 100%)`,
            border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 4px 14px rgba(70,199,240,0.30)`,
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M12 5l4 4-4 4" stroke={C.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
