import { useState } from 'react';
import { C, font, gcard } from '../tokens.js';

function IconMail() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
      <rect x="1" y="1" width="16" height="12" rx="2" stroke={C.muted} strokeWidth="1.4"/>
      <path d="M1 4l8 5 8-5" stroke={C.muted} strokeWidth="1.4"/>
    </svg>
  );
}
function IconLock() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <rect x="2" y="8" width="12" height="9" rx="2" stroke={C.muted} strokeWidth="1.4"/>
      <path d="M5 8V6a3 3 0 016 0v2" stroke={C.muted} strokeWidth="1.4"/>
      <circle cx="8" cy="13" r="1.5" fill={C.muted}/>
    </svg>
  );
}

export default function LoginScreen({ onBack, onSuccess }) {
  const [email, setEmail] = useState('martin.g@email.com');
  const [pass,  setPass]  = useState('••••••••');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleLogin = () => {
    if (!email) { setErr('Ingresá tu correo electrónico'); return; }
    setErr(''); setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1400);
  };

  return (
    <div style={{
      height:'100%',
      background:`linear-gradient(180deg, ${C.bg2} 0%, ${C.bg} 100%)`,
      display:'flex', flexDirection:'column',
      padding:'20px 24px 48px', overflowY:'auto',
    }}>
      <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer',
        display:'flex', alignItems:'center', gap:8, padding:'4px 0', marginBottom:32 }}>
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
          <path d="M9 1L1 8.5L9 16" stroke={C.cian} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontFamily:font.dm, fontSize:14, color:C.cian }}>Volver</span>
      </button>

      <div style={{ marginBottom:36 }}>
        <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:30, color:C.white, lineHeight:1.1 }}>Bienvenido</div>
        <div style={{ fontFamily:font.dm, fontSize:14, color:C.muted, marginTop:6 }}>Ingresá con tu cuenta Elitrax</div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:8 }}>
        <div>
          <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted, letterSpacing:0.8, marginBottom:8 }}>CORREO ELECTRÓNICO</div>
          <div style={{ ...gcard(13), padding:'14px 16px', display:'flex', alignItems:'center', gap:12, border:`1px solid ${C.border}` }}>
            <IconMail/>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="vos@ejemplo.com"
              style={{ background:'none', border:'none', outline:'none', flex:1, fontFamily:font.dm, fontSize:15, color:C.white }}/>
          </div>
        </div>
        <div>
          <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted, letterSpacing:0.8, marginBottom:8 }}>CONTRASEÑA</div>
          <div style={{ ...gcard(13), padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
            <IconLock/>
            <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="••••••••"
              style={{ background:'none', border:'none', outline:'none', flex:1, fontFamily:font.dm, fontSize:15, color:C.white }}/>
          </div>
        </div>
      </div>

      {err && <div style={{ fontFamily:font.dm, fontSize:13, color:'#FF6B6B', marginBottom:8 }}>{err}</div>}
      <div style={{ textAlign:'right', marginBottom:28 }}>
        <span style={{ fontFamily:font.dm, fontSize:13, color:C.cian, cursor:'pointer' }}>¿Olvidaste tu contraseña?</span>
      </div>

      {/* Fingerprint */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, marginBottom:18 }}>
        <button onClick={handleLogin} style={{ background:'none', border:'none', cursor:'pointer',
          display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:8 }}>
          <div style={{ width:56, height:56, borderRadius:16,
            background:'rgba(70,199,240,0.08)', border:`1px solid rgba(70,199,240,0.22)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 0 18px rgba(70,199,240,0.12)' }}>
            <svg width="30" height="34" viewBox="0 0 30 34" fill="none">
              <path d="M15 2C9.477 2 5 6.477 5 12v1" stroke={C.cian} strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M25 12v1c0 5.523-4.477 10-10 10" stroke={C.cian} strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M15 8c-2.209 0-4 1.791-4 4v2c0 2.209 1.791 4 4 4s4-1.791 4-4v-2c0-2.209-1.791-4-4-4z" stroke={C.cian} strokeWidth="1.6"/>
              <path d="M8 16c0 3.866 3.134 7 7 7s7-3.134 7-7" stroke={C.cian} strokeWidth="1.6" strokeLinecap="round" opacity="0.5"/>
              <path d="M10 22c0 2.761 2.239 5 5 5s5-2.239 5-5" stroke={C.cian} strokeWidth="1.6" strokeLinecap="round" opacity="0.3"/>
              <path d="M12 27.5c0 1.657 1.343 3 3 3s3-1.343 3-3" stroke={C.cian} strokeWidth="1.6" strokeLinecap="round" opacity="0.15"/>
            </svg>
          </div>
          <span style={{ fontFamily:font.dm, fontSize:11, color:C.muted }}>Ingresar con huella</span>
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:10, width:'100%' }}>
          <div style={{ flex:1, height:1, background:C.border }}/>
          <span style={{ fontFamily:font.dm, fontSize:11, color:C.faint }}>o con contraseña</span>
          <div style={{ flex:1, height:1, background:C.border }}/>
        </div>
      </div>

      <button onClick={handleLogin} disabled={loading} style={{
        background: loading ? C.cianDim : `linear-gradient(135deg, ${C.cian} 0%, #2EB5E0 100%)`,
        color: loading ? C.cian : C.bg,
        border: loading ? `1px solid ${C.cian}` : 'none',
        borderRadius:14, height:52,
        fontFamily:font.exo, fontWeight:700, fontSize:15, letterSpacing:1.5,
        cursor:'pointer', width:'100%',
        boxShadow: loading ? 'none' : `0 8px 24px rgba(70,199,240,0.28)`,
        transition:'all 0.25s',
      }}>
        {loading ? 'INGRESANDO...' : 'INGRESAR'}
      </button>

      <div style={{ display:'flex', alignItems:'center', gap:12, margin:'24px 0' }}>
        <div style={{ flex:1, height:1, background:C.border }}/>
        <span style={{ fontFamily:font.dm, fontSize:12, color:C.faint }}>o continuá con</span>
        <div style={{ flex:1, height:1, background:C.border }}/>
      </div>

      <div style={{ display:'flex', gap:12 }}>
        <button style={{ flex:1, ...gcard(12), padding:'12px 0', border:`1px solid ${C.border}`,
          color:C.white, fontFamily:font.dm, fontSize:14, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button style={{ flex:1, ...gcard(12), padding:'12px 0', border:`1px solid ${C.border}`,
          color:C.white, fontFamily:font.dm, fontSize:14, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          <svg width="16" height="19" viewBox="0 0 16 19" fill="none">
            <path d="M13.173 10.018c-.02-2.137 1.745-3.173 1.824-3.222-1-1.457-2.547-1.656-3.092-1.673-1.316-.134-2.573.777-3.239.777-.667 0-1.693-.758-2.785-.737-1.43.021-2.754.833-3.488 2.112-1.492 2.583-.383 6.415 1.073 8.515.714 1.03 1.563 2.185 2.676 2.144 1.077-.043 1.482-.692 2.784-.692 1.302 0 1.667.692 2.806.67 1.156-.021 1.886-1.053 2.594-2.086.82-1.191 1.155-2.35 1.173-2.408-.026-.01-2.24-.862-2.326-3.4z" fill="white"/>
            <path d="M11.07 3.28C11.65 2.574 12.04 1.6 11.93.61c-.843.036-1.87.562-2.474 1.268-.54.625-.997 1.627-.871 2.582.938.073 1.9-.477 2.485-1.18z" fill="white"/>
          </svg>
          Apple
        </button>
      </div>
    </div>
  );
}
