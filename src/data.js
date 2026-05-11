export const USER = {
  name:     'Martín',
  lastname: 'García',
  email:    'martin.g@email.com',
  plan:     'PRO+',
  avatar:   'MG',
};

export const SESSIONS = [
  { id:1, date:'10 May', duration:'90 min', type:'Partido',       distance:9.8,  maxSpeed:32.1, avgSpeed:13.2, sprints:27, acels:42, jumps:8,  impacts:156, heatZone:'Mediocampo izq.', explosivity:78 },
  { id:2, date:'8 May',  duration:'75 min', type:'Entrenamiento', distance:7.2,  maxSpeed:28.4, avgSpeed:10.8, sprints:18, acels:31, jumps:5,  impacts:98,  heatZone:'Centro',           explosivity:64 },
  { id:3, date:'6 May',  duration:'90 min', type:'Partido',       distance:10.1, maxSpeed:33.8, avgSpeed:14.1, sprints:29, acels:47, jumps:9,  impacts:172, heatZone:'Banda izquierda',  explosivity:85 },
  { id:4, date:'4 May',  duration:'80 min', type:'Entrenamiento', distance:8.6,  maxSpeed:29.2, avgSpeed:11.6, sprints:22, acels:38, jumps:7,  impacts:121, heatZone:'Mediocampo',       explosivity:71 },
  { id:5, date:'2 May',  duration:'90 min', type:'Partido',       distance:9.1,  maxSpeed:31.5, avgSpeed:12.8, sprints:25, acels:41, jumps:8,  impacts:148, heatZone:'Mediocampo izq.',  explosivity:74 },
];

export const WEEKLY = [
  { day:'L', km:0    },
  { day:'M', km:9.8  },
  { day:'M', km:0    },
  { day:'J', km:7.2  },
  { day:'V', km:0    },
  { day:'S', km:10.1 },
  { day:'D', km:0    },
];

export const AI_MSGS = [
  { role:'ai', text:'¡Hola Martín! Soy tu entrenador IA. Puedo analizar tus sesiones y darte recomendaciones personalizadas. ¿En qué te puedo ayudar hoy?' },
];
