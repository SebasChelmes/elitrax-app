import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import TweaksPanel from './TweaksPanel.jsx';
import IOSDevice from './components/IOSFrame.jsx';

const TWEAK_DEFAULTS = {
  plan: 'PRO+',
  userName: '',
  fontSize: 1,
  showExplosivity: true,
  liveGlowIntensity: 0.45,
};

function Root() {
  const [tweaks,     setTweaksState] = useState(TWEAK_DEFAULTS);
  const [panelOpen,  setPanelOpen]   = useState(false);

  const setTweak = (key, val) => setTweaksState(t => ({ ...t, [key]: val }));

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #111827 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      boxSizing: 'border-box',
    }}>
      <IOSDevice>
        <App tweaks={tweaks} />
      </IOSDevice>

      <button
        onClick={() => setPanelOpen(o => !o)}
        title="Tweaks"
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          zIndex: 2147483640,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: panelOpen
            ? 'rgba(41,38,27,0.9)'
            : 'rgba(250,249,247,0.88)',
          border: '.5px solid rgba(255,255,255,0.5)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          transition: 'background 0.2s',
        }}
      >
        {panelOpen ? '✕' : '⚙️'}
      </button>

      <TweaksPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        tweaks={tweaks}
        setTweak={setTweak}
      />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
