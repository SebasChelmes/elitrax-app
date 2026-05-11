export const C = {
  bg:         '#060E1A',
  bg1:        '#0A1628',
  bg2:        '#0D1E38',
  bg3:        '#112244',
  cian:       '#46C7F0',
  naranja:    '#F36C3A',
  green:      '#4ADE80',
  red:        '#FF5B5B',
  yellow:     '#FBBF24',
  white:      '#FFFFFF',
  muted:      'rgba(255,255,255,0.55)',
  faint:      'rgba(255,255,255,0.22)',
  border:     'rgba(255,255,255,0.08)',
  borderHi:   'rgba(255,255,255,0.16)',
  card:       'rgba(255,255,255,0.04)',
  cardHi:     'rgba(255,255,255,0.07)',
  cianDim:    'rgba(70,199,240,0.10)',
  naranjaDim: 'rgba(243,108,58,0.10)',
  greenDim:   'rgba(74,222,128,0.10)',
};

export const font = {
  exo:  "'Exo 2', sans-serif",
  dm:   "'DM Sans', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

// T merges C + font names — used by VitrinaScreen
export const T = { ...C, ...font };

export const gcard = (r = 12) => ({
  background:           C.card,
  backdropFilter:       'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border:               `1px solid ${C.border}`,
  borderRadius:         r,
});

export const glass = gcard;
