import { C, font } from '../tokens.js';

export default function WeeklyBar({ data, todayIdx }) {
  const max = Math.max(...data.map(d => d.km), 1);
  const BAR = 36;
  return (
    <div style={{ display:'flex', gap:5, alignItems:'flex-end' }}>
      {data.map((d, i) => {
        const isToday = i === todayIdx;
        const h = d.km > 0 ? Math.max((d.km / max) * BAR, 5) : 3;
        return (
          <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
            <div style={{
              width:'100%', height:`${h}px`, borderRadius:3,
              background: isToday ? C.cian : d.km > 0 ? 'rgba(70,199,240,0.38)' : 'rgba(255,255,255,0.05)',
              transition:'height 0.4s ease',
            }}/>
            <span style={{ fontFamily:font.dm, fontSize:9, color: isToday ? C.cian : C.faint }}>{d.day}</span>
          </div>
        );
      })}
    </div>
  );
}
