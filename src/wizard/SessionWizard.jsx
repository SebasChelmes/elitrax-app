import { useState, useEffect } from 'react';
import { C, font, gcard } from '../tokens.js';

const CAMPOS_PREV = [
  { id:1, name:'Club Atlético Belgrano',  address:'Av. Colón 1234, Córdoba',    type:'Césped natural',   half:false },
  { id:2, name:'Cancha Municipal Norte',  address:'Bv. San Juan 890, Córdoba',  type:'Césped sintético', half:false },
  { id:3, name:'Centro Deportivo Sur',    address:'Ruta 9 km 14, Córdoba',      type:'Piso de madera',   half:true  },
];

function WizardProgress({ step, total = 6 }) {
  return (
    <div style={{ padding:'0 20px', marginBottom:4 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
        <span style={{ fontFamily:font.dm, fontSize:12, color:C.muted }}>Paso {step} de {total}</span>
        <span style={{ fontFamily:font.mono, fontSize:12, color:C.cian }}>{Math.round((step/total)*100)}%</span>
      </div>
      <div style={{ height:3, background:'rgba(255,255,255,0.08)', borderRadius:2 }}>
        <div style={{ height:'100%', borderRadius:2,
          background:`linear-gradient(90deg, ${C.cian}, #2EB5E0)`,
          width:`${(step/total)*100}%`, transition:'width 0.4s ease' }}/>
      </div>
    </div>
  );
}

function WizardHeader({ onBack, title, subtitle }) {
  return (
    <div style={{ padding:'14px 20px 0' }}>
      <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer',
        display:'flex', alignItems:'center', gap:8, padding:0, marginBottom:14 }}>
        <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
          <path d="M9 1L1 8.5L9 16" stroke={C.cian} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontFamily:font.dm, fontSize:14, color:C.cian }}>Volver</span>
      </button>
      <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:22, color:C.white, lineHeight:1.15 }}>{title}</div>
      {subtitle && <div style={{ fontFamily:font.dm, fontSize:13, color:C.muted, marginTop:4 }}>{subtitle}</div>}
    </div>
  );
}

function WizardCTA({ label, onClick, disabled = false, color = 'cian' }) {
  const bg = color === 'naranja'
    ? `linear-gradient(135deg, ${C.naranja} 0%, #D4502A 100%)`
    : `linear-gradient(135deg, ${C.cian} 0%, #2EB5E0 100%)`;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width:'100%', background: disabled ? 'rgba(255,255,255,0.06)' : bg,
      border: disabled ? `1px solid ${C.border}` : 'none',
      borderRadius:14, height:52,
      fontFamily:font.exo, fontWeight:700, fontSize:15, letterSpacing:1.2,
      color: disabled ? C.faint : (color === 'naranja' ? C.white : C.bg),
      cursor: disabled ? 'default' : 'pointer',
      boxShadow: disabled ? 'none' : color === 'naranja'
        ? '0 8px 24px rgba(243,108,58,0.30)' : '0 8px 24px rgba(70,199,240,0.28)',
      transition:'all 0.25s',
    }}>{label}</button>
  );
}

function Step1Tipo({ data, onChange, onNext, onBack }) {
  const opts = [
    { id:'entrenamiento', label:'Entrenamiento', desc:'Práctica individual o grupal sin resultado oficial',
      icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="11" stroke={data.tipo==='entrenamiento'?C.bg:C.cian} strokeWidth="1.6"/><path d="M9 14l3.5 3.5L19 10" stroke={data.tipo==='entrenamiento'?C.bg:C.cian} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    { id:'competencia', label:'Competencia', desc:'Partido oficial, torneo o encuentro con resultado',
      icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 4l2.5 5 5.5.8-4 3.9.9 5.5L14 16.5l-4.9 2.7.9-5.5-4-3.9 5.5-.8L14 4z" stroke={data.tipo==='competencia'?C.bg:C.naranja} strokeWidth="1.6" strokeLinejoin="round"/></svg>,
    },
  ];
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', overflowY:'auto' }}>
      <WizardProgress step={1}/>
      <WizardHeader onBack={onBack} title="¿Qué tipo de sesión es?" subtitle="Esto ajusta las métricas que se registran"/>
      <div style={{ flex:1, padding:'20px 20px 0', display:'flex', flexDirection:'column', gap:12 }}>
        {opts.map(o => {
          const sel = data.tipo === o.id;
          const accent = o.id === 'competencia' ? C.naranja : C.cian;
          return (
            <button key={o.id} onClick={() => onChange('tipo', o.id)} style={{
              ...gcard(20), padding:'20px', border:`1.5px solid ${sel ? accent : C.border}`,
              background: sel ? (o.id==='competencia' ? C.naranjaDim : C.cianDim) : C.card,
              cursor:'pointer', textAlign:'left', transition:'all 0.2s',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:16,
                  background: sel ? accent : 'rgba(255,255,255,0.06)',
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {o.icon}
                </div>
                <div>
                  <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:17,
                    color: sel ? (o.id==='competencia' ? C.naranja : C.cian) : C.white }}>{o.label}</div>
                  <div style={{ fontFamily:font.dm, fontSize:12, color:C.muted, marginTop:3, lineHeight:1.4 }}>{o.desc}</div>
                </div>
                {sel && (
                  <div style={{ marginLeft:'auto', width:22, height:22, borderRadius:'50%',
                    background:accent, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4l3 3 6-6" stroke={C.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ padding:'20px' }}>
        <WizardCTA label="CONTINUAR →" onClick={onNext} disabled={!data.tipo}
          color={data.tipo === 'competencia' ? 'naranja' : 'cian'}/>
      </div>
    </div>
  );
}

function Step2Campo({ data, onChange, onNext, onBack }) {
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAddr, setNewAddr] = useState('');
  const [newType, setNewType] = useState('Césped natural');
  const [campos,  setCampos]  = useState(CAMPOS_PREV);

  const addCampo = () => {
    if (!newName.trim()) return;
    const nc = { id: Date.now(), name:newName, address:newAddr||'Ubicación manual', type:newType, half:false };
    setCampos(c => [nc, ...c]);
    onChange('campo', nc);
    setShowNew(false);
  };

  if (showNew) return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', overflowY:'auto' }}>
      <WizardProgress step={2}/>
      <WizardHeader onBack={() => setShowNew(false)} title="Nuevo campo de juego" subtitle="Ingresá los datos del lugar"/>
      <div style={{ flex:1, padding:'20px', display:'flex', flexDirection:'column', gap:14 }}>
        <div>
          <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted, letterSpacing:0.8, marginBottom:7 }}>NOMBRE DEL CAMPO</div>
          <div style={{ ...gcard(12), padding:'13px 16px' }}>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Ej: Cancha de La Tablada"
              style={{ background:'none', border:'none', outline:'none', width:'100%', fontFamily:font.dm, fontSize:14, color:C.white }}/>
          </div>
        </div>
        <div>
          <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted, letterSpacing:0.8, marginBottom:7 }}>TIPO DE SUPERFICIE</div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {['Césped natural','Césped sintético','Piso de madera','Cemento','Otro'].map(t => (
              <button key={t} onClick={() => setNewType(t)} style={{
                ...gcard(20), padding:'6px 13px', border:'none', cursor:'pointer',
                background: newType===t ? C.cian : C.card,
                fontFamily:font.dm, fontSize:12, color: newType===t ? C.bg : C.muted,
                fontWeight: newType===t ? 600 : 400,
              }}>{t}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted, letterSpacing:0.8, marginBottom:7 }}>DIRECCIÓN</div>
          <div style={{ ...gcard(12), padding:'13px 16px' }}>
            <input value={newAddr} onChange={e => setNewAddr(e.target.value)} placeholder="Av. Ejemplo 1234, Córdoba"
              style={{ background:'none', border:'none', outline:'none', width:'100%', fontFamily:font.dm, fontSize:14, color:C.white }}/>
          </div>
        </div>
      </div>
      <div style={{ padding:'16px 20px 20px' }}>
        <WizardCTA label="GUARDAR CAMPO" onClick={addCampo} disabled={!newName.trim()}/>
      </div>
    </div>
  );

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', overflowY:'auto' }}>
      <WizardProgress step={2}/>
      <WizardHeader onBack={onBack} title="¿En qué campo jugás?" subtitle="Seleccioná uno o agregá uno nuevo"/>
      <div style={{ flex:1, padding:'16px 20px 0', display:'flex', flexDirection:'column', gap:10 }}>
        <button onClick={() => setShowNew(true)} style={{
          ...gcard(16), padding:'14px 16px', border:`1.5px dashed rgba(70,199,240,0.30)`,
          cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:12,
          background:'rgba(70,199,240,0.04)',
        }}>
          <div style={{ width:40, height:40, borderRadius:12, background:C.cianDim,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 4v10M4 9h10" stroke={C.cian} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily:font.dm, fontWeight:600, fontSize:14, color:C.cian }}>Agregar nuevo campo</div>
            <div style={{ fontFamily:font.dm, fontSize:12, color:C.muted, marginTop:1 }}>Por dirección o coordenadas GPS</div>
          </div>
        </button>
        <div style={{ fontFamily:font.dm, fontSize:11, color:C.faint, letterSpacing:0.8, marginTop:4 }}>CAMPOS ANTERIORES</div>
        {campos.map(c => {
          const sel = data.campo?.id === c.id;
          return (
            <button key={c.id} onClick={() => onChange('campo', c)} style={{
              ...gcard(16), padding:'14px 16px',
              border:`1.5px solid ${sel ? C.cian : C.border}`,
              background: sel ? C.cianDim : C.card,
              cursor:'pointer', textAlign:'left', transition:'all 0.2s',
            }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:12,
                  background: sel ? 'rgba(70,199,240,0.20)' : 'rgba(255,255,255,0.06)',
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <path d="M9 1C5.686 1 3 3.686 3 7c0 5 6 12 6 12s6-7 6-12c0-3.314-2.686-6-6-6z"
                      stroke={sel ? C.cian : C.muted} strokeWidth="1.4"/>
                    <circle cx="9" cy="7" r="2" stroke={sel ? C.cian : C.muted} strokeWidth="1.4"/>
                  </svg>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:font.dm, fontWeight:600, fontSize:14, color: sel ? C.cian : C.white }}>{c.name}</div>
                  <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted, marginTop:2 }}>{c.address}</div>
                  <div style={{ ...gcard(20), display:'inline-block', padding:'2px 8px', marginTop:5 }}>
                    <span style={{ fontFamily:font.dm, fontSize:10, color:C.faint }}>{c.type}</span>
                  </div>
                </div>
                {sel && (
                  <div style={{ width:20, height:20, borderRadius:'50%', background:C.cian,
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 3.5l2.5 2.5 6-5.5" stroke={C.bg} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ padding:'20px' }}>
        <WizardCTA label="CONTINUAR →" onClick={onNext} disabled={!data.campo}/>
      </div>
    </div>
  );
}

function Step3Heatmap({ data, onChange, onNext, onBack }) {
  const opts = [
    { id:'mitad',    label:'Mitad del campo',   desc:'Solo el sector donde jugás habitualmente',
      svg: <svg width="110" height="72" viewBox="0 0 110 72"><rect width="110" height="72" rx="5" fill="#0A2A18"/><rect x="2" y="2" width="106" height="68" rx="4" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/><line x1="55" y1="2" x2="55" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/><rect x="2" y="2" width="53" height="68" rx="4" fill="rgba(70,199,240,0.18)"/><rect x="2" y="2" width="53" height="68" rx="4" fill="none" stroke="#46C7F0" strokeWidth="1.5"/></svg>,
    },
    { id:'completo', label:'Campo completo',     desc:'Todo el campo de juego, de portería a portería',
      svg: <svg width="110" height="72" viewBox="0 0 110 72"><rect width="110" height="72" rx="5" fill="#0A2A18"/><rect x="2" y="2" width="106" height="68" rx="4" fill="rgba(70,199,240,0.18)" stroke="#46C7F0" strokeWidth="1.5"/><line x1="55" y1="2" x2="55" y2="70" stroke="rgba(255,255,255,0.20)" strokeWidth="1"/><circle cx="55" cy="36" r="14" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/></svg>,
    },
  ];
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <WizardProgress step={3}/>
      <WizardHeader onBack={onBack} title="¿Qué zona cubrir con el mapa de calor?" subtitle="Define el área de análisis de tu posición"/>
      <div style={{ flex:1, padding:'20px', display:'flex', flexDirection:'column', gap:14 }}>
        {opts.map(o => {
          const sel = data.heatmap === o.id;
          return (
            <button key={o.id} onClick={() => onChange('heatmap', o.id)} style={{
              ...gcard(18), padding:'18px',
              border:`1.5px solid ${sel ? C.cian : C.border}`,
              background: sel ? C.cianDim : C.card,
              cursor:'pointer', textAlign:'left', transition:'all 0.2s',
            }}>
              <div style={{ display:'flex', gap:14, alignItems:'center' }}>
                <div style={{ borderRadius:10, overflow:'hidden', flexShrink:0,
                  border: sel ? `1.5px solid ${C.cian}` : `1px solid ${C.border}` }}>
                  {o.svg}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:16,
                    color: sel ? C.cian : C.white, marginBottom:4 }}>{o.label}</div>
                  <div style={{ fontFamily:font.dm, fontSize:12, color:C.muted, lineHeight:1.4 }}>{o.desc}</div>
                </div>
                {sel && (
                  <div style={{ width:22, height:22, borderRadius:'50%', background:C.cian, flexShrink:0,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4l3 3 6-6" stroke={C.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ padding:'0 20px 20px' }}>
        <WizardCTA label="CONTINUAR →" onClick={onNext} disabled={!data.heatmap}/>
      </div>
    </div>
  );
}

function Step4Porteria({ data, onChange, onNext, onBack }) {
  const opts = [
    { id:'arriba',    label:'Portería arriba',    cx:130, cy:18 },
    { id:'abajo',     label:'Portería abajo',     cx:130, cy:152 },
    { id:'izquierda', label:'Portería izquierda', cx:14,  cy:85 },
    { id:'derecha',   label:'Portería derecha',   cx:246, cy:85 },
  ];
  const sel = data.porteria;
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <WizardProgress step={4}/>
      <WizardHeader onBack={onBack} title="¿Dónde está la portería rival?" subtitle="Tocá en el campo para indicar la posición"/>
      <div style={{ flex:1, padding:'16px 20px 0', display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ ...gcard(16), padding:16 }}>
          <div style={{ fontFamily:font.dm, fontSize:12, color:C.muted, marginBottom:10, textAlign:'center' }}>
            Tocá la portería rival
          </div>
          <svg width="100%" viewBox="0 0 260 170" style={{ display:'block', cursor:'pointer' }}>
            <rect width="260" height="170" rx="8" fill="#0A2A18"/>
            <rect x="3" y="3" width="254" height="164" rx="6" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
            <line x1="3" y1="85" x2="257" y2="85" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
            <circle cx="130" cy="85" r="28" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
            <rect x="3" y="52" width="42" height="66" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
            <rect x="215" y="52" width="42" height="66" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1"/>
            <rect x="0" y="70" width="8" height="30" rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
            <rect x="252" y="70" width="8" height="30" rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
            {opts.map(o => {
              const isSel = sel === o.id;
              const isHoriz = o.id === 'izquierda' || o.id === 'derecha';
              return (
                <ellipse key={o.id} cx={o.cx} cy={o.cy}
                  rx={isHoriz ? 10 : 50} ry={isHoriz ? 35 : 10}
                  fill={isSel ? 'rgba(243,108,58,0.35)' : 'rgba(70,199,240,0.08)'}
                  stroke={isSel ? C.naranja : 'rgba(70,199,240,0.30)'}
                  strokeWidth={isSel ? 2 : 1}
                  style={{ cursor:'pointer', transition:'all 0.2s' }}
                  onClick={() => onChange('porteria', o.id)}/>
              );
            })}
            {sel && (() => {
              const o = opts.find(x => x.id === sel);
              return o ? (
                <>
                  <circle cx={o.cx} cy={o.cy} r="7" fill={C.naranja}/>
                  <circle cx={o.cx} cy={o.cy} r="14" fill={C.naranja} opacity="0.2"/>
                  <text x={o.cx} y={o.cy+1} textAnchor="middle" dominantBaseline="middle"
                    fontSize="8" fontFamily="sans-serif" fontWeight="bold" fill={C.bg}>P</text>
                </>
              ) : null;
            })()}
          </svg>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {opts.map(o => {
            const isSel = sel === o.id;
            return (
              <button key={o.id} onClick={() => onChange('porteria', o.id)} style={{
                ...gcard(12), padding:'10px 12px',
                border:`1.5px solid ${isSel ? C.naranja : C.border}`,
                background: isSel ? C.naranjaDim : C.card,
                cursor:'pointer',
                fontFamily:font.dm, fontSize:12, color: isSel ? C.naranja : C.muted,
                fontWeight: isSel ? 600 : 400, transition:'all 0.2s',
              }}>{o.label}</button>
            );
          })}
        </div>
      </div>
      <div style={{ padding:'16px 20px 20px' }}>
        <WizardCTA label="CONTINUAR →" onClick={onNext} disabled={!sel} color="naranja"/>
      </div>
    </div>
  );
}

function Step5Info({ data, onChange, onNext, onBack }) {
  const now     = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toTimeString().slice(0,5);

  useEffect(() => {
    if (!data.fecha)  onChange('fecha',  dateStr);
    if (!data.hora)   onChange('hora',   timeStr);
    if (!data.nombre) onChange('nombre', data.tipo === 'competencia' ? 'Partido' : 'Entrenamiento');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', overflowY:'auto' }}>
      <WizardProgress step={5}/>
      <WizardHeader onBack={onBack} title="Detalle de la sesión" subtitle="Poné un nombre y la hora de inicio"/>
      <div style={{ flex:1, padding:'20px', display:'flex', flexDirection:'column', gap:14 }}>
        <div>
          <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted, letterSpacing:0.8, marginBottom:7 }}>NOMBRE DE LA SESIÓN</div>
          <div style={{ ...gcard(12), padding:'13px 16px' }}>
            <input value={data.nombre||''} onChange={e => onChange('nombre', e.target.value)}
              placeholder={data.tipo === 'competencia' ? 'Ej: Final Liga Amateur' : 'Ej: Práctica táctica'}
              style={{ background:'none', border:'none', outline:'none', width:'100%',
                fontFamily:font.dm, fontSize:15, color:C.white }}/>
          </div>
        </div>
        <div>
          <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted, letterSpacing:0.8, marginBottom:7 }}>
            DESCRIPCIÓN <span style={{ color:C.faint, fontSize:10 }}>(opcional)</span>
          </div>
          <div style={{ ...gcard(12), padding:'13px 16px', minHeight:80 }}>
            <textarea value={data.descripcion||''} onChange={e => onChange('descripcion', e.target.value)}
              placeholder="Ej: Trabaja defensa de pelota parada..." rows={3}
              style={{ background:'none', border:'none', outline:'none', width:'100%', resize:'none',
                fontFamily:font.dm, fontSize:14, color:C.white, lineHeight:1.5 }}/>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <div>
            <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted, letterSpacing:0.8, marginBottom:7 }}>FECHA</div>
            <div style={{ ...gcard(12), padding:'13px 14px', display:'flex', alignItems:'center', gap:8 }}>
              <input type="date" value={data.fecha||dateStr} onChange={e => onChange('fecha', e.target.value)}
                style={{ background:'none', border:'none', outline:'none', flex:1,
                  fontFamily:font.dm, fontSize:13, color:C.white, colorScheme:'dark' }}/>
            </div>
          </div>
          <div>
            <div style={{ fontFamily:font.dm, fontSize:11, color:C.muted, letterSpacing:0.8, marginBottom:7 }}>HORA</div>
            <div style={{ ...gcard(12), padding:'13px 14px', display:'flex', alignItems:'center', gap:8 }}>
              <input type="time" value={data.hora||timeStr} onChange={e => onChange('hora', e.target.value)}
                style={{ background:'none', border:'none', outline:'none', flex:1,
                  fontFamily:font.dm, fontSize:13, color:C.white, colorScheme:'dark' }}/>
            </div>
          </div>
        </div>
        <div style={{ ...gcard(16), padding:'14px 16px',
          background:'linear-gradient(135deg, rgba(70,199,240,0.06) 0%, rgba(70,199,240,0.02) 100%)',
          border:'1px solid rgba(70,199,240,0.15)' }}>
          <div style={{ fontFamily:font.exo, fontWeight:600, fontSize:12, color:C.cian, letterSpacing:1, marginBottom:10 }}>RESUMEN</div>
          {[
            { k:'Tipo',     v: data.tipo === 'competencia' ? '⭐ Competencia' : '🏃 Entrenamiento' },
            { k:'Campo',    v: data.campo?.name || '—' },
            { k:'Calor',    v: data.heatmap === 'mitad' ? 'Mitad del campo' : 'Campo completo' },
            { k:'Portería', v: data.porteria ? data.porteria.charAt(0).toUpperCase()+data.porteria.slice(1) : '—' },
          ].map((r, i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between',
              paddingBottom: i<3 ? 7 : 0, marginBottom: i<3 ? 7 : 0,
              borderBottom: i<3 ? `1px solid ${C.border}` : 'none' }}>
              <span style={{ fontFamily:font.dm, fontSize:12, color:C.faint }}>{r.k}</span>
              <span style={{ fontFamily:font.dm, fontSize:12, color:C.muted, fontWeight:500 }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'16px 20px 20px' }}>
        <WizardCTA label="CONTINUAR →" onClick={onNext} disabled={!data.nombre?.trim()}/>
      </div>
    </div>
  );
}

function Step6Start({ data, onStart, onBack }) {
  const [countdown, setCountdown] = useState(null);
  const [ready,     setReady]     = useState(false);

  const handleStart = () => { setCountdown(3); setReady(true); };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) { onStart(); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]); // eslint-disable-line react-hooks/exhaustive-deps

  const isComp     = data.tipo === 'competencia';
  const accentColor = isComp ? C.naranja : C.cian;

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', overflowY:'auto' }}>
      <WizardProgress step={6}/>
      <div style={{ padding:'16px 20px 0', marginBottom:4 }}>
        <button onClick={onBack} disabled={ready} style={{ background:'none', border:'none',
          cursor: ready ? 'default' : 'pointer', display:'flex', alignItems:'center', gap:8, padding:0, opacity: ready ? 0.3 : 1 }}>
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M9 1L1 8.5L9 16" stroke={C.cian} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontFamily:font.dm, fontSize:14, color:C.cian }}>Volver</span>
        </button>
      </div>

      {ready && countdown !== null && countdown > 0 && (
        <div style={{ position:'absolute', inset:0, zIndex:100,
          background:'rgba(6,14,26,0.94)', display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', gap:16 }}>
          <div style={{ fontFamily:font.exo, fontWeight:800, fontSize:90, color:accentColor, lineHeight:1,
            textShadow:`0 0 40px ${accentColor}` }}>{countdown}</div>
          <div style={{ fontFamily:font.dm, fontSize:16, color:C.muted }}>Iniciando sesión...</div>
        </div>
      )}

      <div style={{ flex:1, padding:'10px 20px 0', display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ ...gcard(20), padding:'22px 20px',
          background: isComp
            ? 'linear-gradient(135deg, rgba(243,108,58,0.14) 0%, rgba(243,108,58,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(70,199,240,0.12) 0%, rgba(70,199,240,0.04) 100%)',
          border: `1.5px solid ${isComp ? 'rgba(243,108,58,0.28)' : 'rgba(70,199,240,0.22)'}` }}>
          <div style={{ textAlign:'center', marginBottom:14 }}>
            <div style={{ fontFamily:font.exo, fontWeight:700, fontSize:22, color:C.white, marginBottom:4 }}>
              {data.nombre}
            </div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6,
              ...gcard(20), padding:'4px 14px', background: isComp ? C.naranjaDim : C.cianDim }}>
              <span style={{ fontSize:14 }}>{isComp ? '⭐' : '🏃'}</span>
              <span style={{ fontFamily:font.dm, fontSize:12, fontWeight:600, color: isComp ? C.naranja : C.cian }}>
                {isComp ? 'Competencia' : 'Entrenamiento'}
              </span>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[
              { label:'Campo',     value: data.campo?.name?.split(' ').slice(0,2).join(' ') || '—' },
              { label:'Mapa calor', value: data.heatmap === 'mitad' ? 'Mitad' : 'Completo' },
              { label:'Portería',  value: data.porteria ? data.porteria.charAt(0).toUpperCase()+data.porteria.slice(1) : '—' },
              { label:'Hora',      value: data.hora || '—' },
            ].map((m, i) => (
              <div key={i} style={{ ...gcard(12), padding:'10px 12px' }}>
                <div style={{ fontFamily:font.dm, fontSize:10, color:C.faint, marginBottom:3 }}>{m.label}</div>
                <div style={{ fontFamily:font.dm, fontSize:13, fontWeight:600, color:C.white }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...gcard(16), padding:'12px 16px', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:10, height:10, borderRadius:'50%', background:'#4ADE80',
            boxShadow:'0 0 8px #4ADE80', flexShrink:0 }}/>
          <span style={{ fontFamily:font.dm, fontSize:13, color:C.white }}>ELITRAX Motion conectado · 92%</span>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" style={{ marginLeft:'auto' }}>
            <path d="M1 7l4.5 5L17 1" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div style={{ display:'flex', gap:10 }}>
          {[{ label:'GPS', icon:'📡' }, { label:'IMU', icon:'🔄' }, { label:'Señal', icon:'📶' }].map((s, i) => (
            <div key={i} style={{ flex:1, ...gcard(12), padding:'10px', textAlign:'center' }}>
              <div style={{ fontSize:18, marginBottom:4 }}>{s.icon}</div>
              <div style={{ fontFamily:font.mono, fontSize:11, color:'#4ADE80' }}>✓ {s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:'16px 20px 20px' }}>
        <button onClick={handleStart} disabled={ready} style={{
          width:'100%',
          background: ready ? 'rgba(255,255,255,0.06)' : `linear-gradient(135deg, ${isComp ? C.naranja : C.cian} 0%, ${isComp ? '#D4502A' : '#2EB5E0'} 100%)`,
          border:'none', borderRadius:14, height:58,
          fontFamily:font.exo, fontWeight:800, fontSize:18, letterSpacing:2,
          color: ready ? C.faint : (isComp ? C.white : C.bg),
          cursor: ready ? 'default' : 'pointer',
          boxShadow: ready ? 'none' : `0 10px 28px ${isComp ? 'rgba(243,108,58,0.38)' : 'rgba(70,199,240,0.35)'}`,
          transition:'all 0.25s',
        }}>
          {ready ? 'INICIANDO...' : '▶  INICIAR SESIÓN'}
        </button>
      </div>
    </div>
  );
}

export default function SessionWizard({ onCancel, onStart }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    tipo:null, campo:null, heatmap:null, porteria:null,
    nombre:'', descripcion:'', fecha:'', hora:'',
  });

  const update = (key, val) => setData(d => ({ ...d, [key]: val }));
  const next   = () => setStep(s => s + 1);
  const prev   = () => step > 1 ? setStep(s => s - 1) : onCancel();

  const screens = {
    1: <Step1Tipo     data={data} onChange={update} onNext={next} onBack={prev}/>,
    2: <Step2Campo    data={data} onChange={update} onNext={next} onBack={prev}/>,
    3: <Step3Heatmap  data={data} onChange={update} onNext={next} onBack={prev}/>,
    4: <Step4Porteria data={data} onChange={update} onNext={next} onBack={prev}/>,
    5: <Step5Info     data={data} onChange={update} onNext={next} onBack={prev}/>,
    6: <Step6Start    data={data} onStart={() => onStart(data)} onBack={prev}/>,
  };

  return (
    <div style={{ height:'100%', background:`linear-gradient(180deg, #060E1A 0%, ${C.bg} 100%)`,
      display:'flex', flexDirection:'column' }}>
      <div style={{ height:8 }}/>
      <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
        <div key={step} style={{ height:'100%', animation:'screenIn 0.25s cubic-bezier(0.25,0.46,0.45,0.94)', overflow:'hidden' }}>
          {screens[step]}
        </div>
      </div>
    </div>
  );
}
