import { useRef } from 'react';

const STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:72px;z-index:2147483646;width:272px;
    max-height:calc(100vh - 100px);display:flex;flex-direction:column;
    background:rgba(250,249,247,.84);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.22);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none;border-bottom:.5px solid rgba(0,0,0,.06)}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:pointer;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:12px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:6px 0 2px}
  .twk-sect:first-child{padding-top:0}
  .twk-row{display:flex;flex-direction:column;gap:4px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}
  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:4px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:pointer}
  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:pointer;padding:0;flex-shrink:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s;display:block}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}
  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:pointer;padding:4px 4px;line-height:1.2}
  .twk-field{appearance:none;width:100%;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
`;

function TweakSlider({ label, value, min, max, step = 0.01, unit = '', onChange }) {
  return (
    <div className="twk-row">
      <div className="twk-lbl">
        <span>{label}</span>
        <span className="twk-val">{typeof value === 'number' ? value.toFixed(step < 0.1 ? 2 : 0) : value}{unit}</span>
      </div>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
        value={value} onChange={e => onChange(Number(e.target.value))} />
    </div>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
        onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakSeg({ label, value, options, onChange }) {
  const idx = options.indexOf(value);
  const n   = options.length;
  return (
    <div className="twk-row">
      <div className="twk-lbl"><span>{label}</span></div>
      <div className="twk-seg">
        <div className="twk-seg-thumb" style={{
          left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
          width: `calc((100% - 4px) / ${n})`,
        }} />
        {options.map(o => (
          <button key={o} type="button" onClick={() => onChange(o)}>{o}</button>
        ))}
      </div>
    </div>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <div className="twk-row">
      <div className="twk-lbl"><span>{label}</span></div>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)} />
    </div>
  );
}

export default function TweaksPanel({ open, onClose, tweaks, setTweak }) {
  const dragRef  = useRef(null);
  const offsetRef = useRef({ x: 16, y: 72 });

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight  = window.innerWidth  - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: Math.max(8, startRight  - (ev.clientX - sx)),
        y: Math.max(8, startBottom - (ev.clientY - sy)),
      };
      panel.style.right  = offsetRef.current.x + 'px';
      panel.style.bottom = offsetRef.current.y + 'px';
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{STYLE}</style>
      <div ref={dragRef} className="twk-panel"
        style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>Tweaks — Elitrax</b>
          <button className="twk-x" onMouseDown={e => e.stopPropagation()} onClick={onClose}>✕</button>
        </div>
        <div className="twk-body">
          <div className="twk-sect">Usuario</div>
          <TweakSeg label="Plan"
            value={tweaks.plan}
            options={['FREE', 'PRO', 'PRO+']}
            onChange={v => setTweak('plan', v)} />
          <TweakText label="Nombre" value={tweaks.userName} placeholder="Martín (default)"
            onChange={v => setTweak('userName', v)} />

          <div className="twk-sect">Visualización</div>
          <TweakSlider label="Tamaño de texto" value={tweaks.fontSize} min={0.8} max={1.2} step={0.05} unit="x"
            onChange={v => setTweak('fontSize', v)} />
          <TweakToggle label="Mostrar Explosividad" value={tweaks.showExplosivity}
            onChange={v => setTweak('showExplosivity', v)} />

          <div className="twk-sect">Live</div>
          <TweakSlider label="Glow intensidad" value={tweaks.liveGlowIntensity} min={0} max={1} step={0.05}
            onChange={v => setTweak('liveGlowIntensity', v)} />
        </div>
      </div>
    </>
  );
}
