import { useState, useEffect } from 'react';
import { C, font, gcard } from '../tokens.js';

export default function OnboardingScreen({ onDone }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => step === 0 && setStep(1), 2200);
    return () => clearTimeout(t);
  }, [step]);

  const ringStyle = (r, opacity, dashRatio = 0) => {
    const circ = 2 * Math.PI * r;
    return { cx:110, cy:110, r, fill:'none',
      stroke:`rgba(70,199,240,${opacity})`, strokeWidth:1,
      ...(dashRatio > 0 ? {
        strokeDasharray:`${circ*dashRatio} ${circ*(1-dashRatio)}`,
        strokeLinecap:'round',
      } : {}) };
  };

  return (
    <div style={{
      height:'100%',
      background:`linear-gradient(180deg, ${C.bg2} 0%, ${C.bg} 100%)`,
      display:'flex', flexDirection:'column',
      alignItems:'center', padding:'28px 24px 60px', overflowY:'auto',
    }}>
      <div style={{ width:'100%', marginBottom:8 }}>
        <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:26, color:C.white }}>Conectá tu dispositivo</div>
        <div style={{ fontFamily:font.dm, fontSize:14, color:C.muted, marginTop:4 }}>
          {step === 0 ? 'Buscando dispositivos ELITRAX cercanos...' :
           step === 1 ? '¡Dispositivo encontrado!' : '¡Conexión exitosa!'}
        </div>
      </div>

      <div style={{ position:'relative', width:220, height:220, margin:'20px 0' }}>
        <svg width="220" height="220" viewBox="0 0 220 220">
          <circle {...ringStyle(100, 0.06)}/>
          <circle {...ringStyle(80,  0.09)}/>
          <circle {...ringStyle(60,  0.14)}/>
          <circle {...ringStyle(40,  0.20)}/>
          <circle cx="110" cy="110" r="100" fill="none" stroke={C.cian} strokeWidth="1.5"
            strokeDasharray={`${2*Math.PI*100*0.25} ${2*Math.PI*100*0.75}`}
            strokeLinecap="round" transform="rotate(-90 110 110)"
            style={{ animation: step === 0 ? 'spin 2s linear infinite' : 'none' }}/>
          <circle cx="110" cy="110" r="24" fill="rgba(70,199,240,0.10)"/>
          <circle cx="110" cy="110" r="16" fill="rgba(70,199,240,0.18)"/>
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:10, color:C.cian, letterSpacing:2, textAlign:'center' }}>
            {step === 0 ? 'SCAN' : step === 1 ? 'LISTO' : '✓'}
          </div>
        </div>
        {step >= 1 && (
          <div style={{ position:'absolute', top:24, right:0, ...gcard(12),
            padding:'8px 14px', display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:8, height:8, borderRadius:'50%',
              background: step === 2 ? C.green : C.cian,
              boxShadow: `0 0 6px ${step === 2 ? C.green : C.cian}` }}/>
            <span style={{ fontFamily:font.dm, fontSize:12, color:C.white, whiteSpace:'nowrap' }}>ELITRAX Motion</span>
          </div>
        )}
      </div>

      {step >= 1 && (
        <div style={{ width:'100%', ...gcard(18), padding:18, marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom: step < 2 ? 16 : 0 }}>
            <div style={{ width:48, height:48, borderRadius:14, background:C.cianDim,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <rect x="8" y="2" width="10" height="18" rx="2.5" stroke={C.cian} strokeWidth="1.4"/>
                <path d="M13 20v4M10 24h6" stroke={C.cian} strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="13" cy="10" r="2.5" fill={C.cian} opacity="0.6"/>
              </svg>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:16, color:C.white }}>ELITRAX Motion</div>
              <div style={{ fontFamily:font.dm, fontSize:12, color:C.muted, marginTop:2 }}>ID: ELX-2409-A3F</div>
            </div>
            <div style={{ ...gcard(20), padding:'4px 10px' }}>
              <span style={{ fontFamily:font.dm, fontSize:11, color:C.green }}>92% 🔋</span>
            </div>
          </div>
          {step === 1 && (
            <button onClick={() => setStep(2)} style={{
              background:`linear-gradient(135deg, ${C.cian} 0%, #2EB5E0 100%)`,
              color:C.bg, border:'none', borderRadius:12,
              height:44, fontFamily:font.exo, fontWeight:700, fontSize:14,
              letterSpacing:1, cursor:'pointer', width:'100%',
              boxShadow:`0 6px 18px rgba(70,199,240,0.25)`,
            }}>CONECTAR DISPOSITIVO</button>
          )}
          {step === 2 && (
            <div style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'center', paddingTop:12 }}>
              <div style={{ width:10, height:10, borderRadius:'50%', background:C.green, boxShadow:`0 0 8px ${C.green}` }}/>
              <span style={{ fontFamily:font.dm, fontWeight:600, fontSize:14, color:C.green }}>Conectado exitosamente</span>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <button onClick={onDone} style={{
          background:`linear-gradient(135deg, ${C.cian} 0%, #2EB5E0 100%)`,
          color:C.bg, border:'none', borderRadius:14,
          height:52, fontFamily:font.exo, fontWeight:700, fontSize:15,
          letterSpacing:1.5, cursor:'pointer', width:'100%',
          boxShadow:`0 8px 24px rgba(70,199,240,0.28)`,
        }}>COMENZAR →</button>
      )}

      <button onClick={onDone} style={{
        background:'none', border:'none', color:C.muted,
        fontFamily:font.dm, fontSize:14, cursor:'pointer', marginTop:16, padding:8,
      }}>Saltar por ahora</button>
    </div>
  );
}
