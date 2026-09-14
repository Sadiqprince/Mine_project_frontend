import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const zones = [
  { id: "A-02", status: "normal", movement: 4.2, vibration: 1.2, tilt: 0.3, risk: 12, sensors: 12 },
  { id: "B-09", status: "warning", movement: 14.2, vibration: 3.8, tilt: 0.8, risk: 46, sensors: 12 },
  { id: "B-14", status: "critical", movement: 24.7, vibration: 6.2, tilt: 1.7, risk: 78, sensors: 12 },
  { id: "C-03", status: "normal", movement: 5.1, vibration: 1.4, tilt: 0.4, risk: 16, sensors: 12 }
];

const sensors = [
  {id:"S-101", zone:"A-02", movement:"4.2 mm", vibration:"1.2 mm/s", tilt:"0.3°", battery:94, status:"normal"},
  {id:"S-102", zone:"A-02", movement:"7.8 mm", vibration:"2.1 mm/s", tilt:"0.5°", battery:91, status:"normal"},
  {id:"S-103", zone:"B-09", movement:"14.2 mm", vibration:"3.8 mm/s", tilt:"0.8°", battery:81, status:"warning"},
  {id:"S-104", zone:"B-14", movement:"24.7 mm", vibration:"6.2 mm/s", tilt:"1.7°", battery:76, status:"critical"},
  {id:"S-105", zone:"C-03", movement:"5.1 mm", vibration:"1.4 mm/s", tilt:"0.4°", battery:88, status:"normal"},
  {id:"S-106", zone:"B-14", movement:"21.8 mm", vibration:"5.7 mm/s", tilt:"1.5°", battery:72, status:"critical"},
  {id:"S-107", zone:"B-09", movement:"11.6 mm", vibration:"3.1 mm/s", tilt:"0.7°", battery:84, status:"warning"},
  {id:"S-108", zone:"C-03", movement:"3.9 mm", vibration:"1.1 mm/s", tilt:"0.2°", battery:97, status:"normal"}
];

const alerts = [
  {time:"14:28", zone:"B-14", event:"High subsidence predicted", severity:"high"},
  {time:"12:16", zone:"B-09", event:"Vibration increase", severity:"medium"},
  {time:"10:03", zone:"C-03", event:"Displacement above threshold", severity:"medium"},
  {time:"08:42", zone:"A-02", event:"Sensor offline", severity:"low"},
  {time:"06:21", zone:"B-11", event:"Unusual ground movement", severity:"medium"}
];

const nav = [
  ["Dashboard","⌂"],["Mine Map","⌖"],["Sensors","◉"],["AI Prediction","◌"],
  ["Alerts","♢"],["Reports","▤"],["Settings","⚙"]
];

function Header({onAlert}) {
  return <header className="header">
    <div className="header-project">
      <div className="project-title">AI-BASED LOW-COST MINE SUBSIDENCE MONITORING,</div>
      <div className="project-title">PREDICTION & EARLY WARNING SYSTEM</div>
    </div>
    <div className="header-right">
      <span className="online-dot"></span><span className="online">System Online</span>
      <span className="date">Sep 14, 2026&nbsp; 14:28:36</span>
      <button className="notification" onClick={onAlert}>♧<b>3</b></button>
      <div className="user"><span className="avatar">K</span><span><strong>Kaif</strong><small>Admin</small></span><span>⌄</span></div>
    </div>
  </header>;
}

function Sidebar({active,setActive}) {
  return <aside className="sidebar">
    <div className="brand-wrap">
      <div className="logo-mountain">⌃</div>
      <div><div className="brand">MINE<span>SAFE</span> AI</div><div className="tagline">Safer Mines • Smarter Decisions • A Safer Tomorrow</div></div>
    </div>
    <nav>{nav.map(([name,icon])=><button key={name} className={"nav-item "+(active===name?"active":"")} onClick={()=>setActive(name)}>
      <span className="nav-icon">{icon}</span><span>{name}</span>{name==="Alerts"&&<b className="alert-count">3</b>}
    </button>)}</nav>
    <div className="sidebar-footer">
      <div className="mine-art"><div className="truck">▰</div><div>“Monitoring today<br/>for a safer tomorrow.”</div></div>
    </div>
  </aside>;
}

function Panel({title,children,action}) {
  return <section className="panel"><div className="panel-head"><h2>{title}</h2>{action}</div>{children}</section>;
}

function StatCards() {
  const cards = [
    ["✓","Current Status","SAFE","No immediate subsidence threat detected.","safe"],
    ["◔","AI Risk Score","18%","LOW RISK","blue"],
    ["↕","Ground Displacement","12.4 mm","+1.2 mm","blue"],
    ["≋","Total Settlement","18.7 mm","+2.3 mm","purple"],
    ["⌁","Active Sensors","48 / 50","96% Online","green"],
    ["°","Temperature","28 °C","Normal","cyan"]
  ];
  return <div className="stats-grid">{cards.map(c=><div className={"stat-card "+c[4]} key={c[2]}>
    <div className="stat-icon">{c[0]}</div><div className="stat-label">{c[1]}</div><div className="stat-value">{c[2]}</div><div className={c[4]==="blue"&&c[3]==="LOW RISK"?"stat-pill":"stat-detail"}>{c[3]}</div><div className="spark"></div>
  </div>)}</div>;
}

function MiniMap() {
  const dots=[["12%","22%","normal"],["32%","28%","normal"],["45%","43%","warning"],["62%","52%","critical"],["72%","29%","normal"],["81%","68%","normal"],["23%","71%","normal"],["42%","78%","warning"],["58%","74%","critical"],["88%","43%","normal"],["35%","56%","warning"],["68%","80%","normal"]];
  return <div className="mine-map mini">
    <div className="map-tunnel m1"></div><div className="map-tunnel m2"></div><div className="map-tunnel m3"></div>
    {dots.map((d,i)=><span key={i} className={"sensor-dot "+d[2]} style={{left:d[0],top:d[1]}}></span>)}
    <div className="zone-label za">Zone A<br/><small>Stable</small></div><div className="zone-label zb">Zone B<br/><small>Monitoring</small></div>
    <div className="risk-label">⚠ <span>Zone B-14<br/><small>High Risk</small></span></div><div className="zone-label zc">Zone C<br/><small>Stable</small></div>
    <div className="map-legend"><div><i className="normal"></i>Normal</div><div><i className="warning"></i>Warning</div><div><i className="critical"></i>Critical</div></div>
    <div className="map-controls">＋<hr/>−<hr/>≋</div><div className="compass">N</div>
  </div>;
}

function PredictionChart({large=false}) {
  return <div className={"chart "+(large?"large":"")}>
    <div className="y-labels"><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span></div>
    <div className="chart-grid"></div>
    <svg viewBox="0 0 600 230" preserveAspectRatio="none">
      <polyline points="0,205 80,190 160,160 235,145" className="actual-line"/>
      <polyline points="235,145 330,115 440,92 580,45" className="pred-line"/>
      <circle cx="235" cy="145" r="5" className="point"/><circle cx="580" cy="45" r="7" className="future-point"/>
    </svg>
    <div className="x-labels"><span>Now</span><span>12h</span><span>24h</span><span>48h</span><span>72h</span></div>
    <div className="future-value">26.8 mm</div>
    <div className="chart-key">━ Actual&nbsp;&nbsp;&nbsp;&nbsp; ╌ Predicted</div>
  </div>;
}

function Dashboard({setActive}) {
  return <main className="content">
    <StatCards/>
    <div className="middle-grid">
      <Panel title="▧  Live Mine Map" action={<button className="select" onClick={()=>setActive("Mine Map")}>View: Underground ▾</button>}><MiniMap/></Panel>
      <Panel title="⌁  Subsidence Prediction" action={<button className="select" onClick={()=>setActive("AI Prediction")}>Next 72 Hours ▾</button>}>
        <PredictionChart/>
        <div className="prediction-cards">
          <div><small>Predicted Subsidence in 72 Hours</small><strong>26.8 mm</strong></div>
          <div><small>Risk Probability</small><strong className="danger">78% <em>HIGH RISK</em></strong></div>
          <div><small>AI Recommendation</small><strong className="recommend">⚠ Inspect Zone B-14<br/><span>within the next 6 hours.</span></strong></div>
        </div>
      </Panel>
    </div>
    <div className="bottom-grid">
      <Panel title="♟  Recent Alerts" action={<button className="view-all" onClick={()=>setActive("Alerts")}>View All →</button>}><AlertTable compact/></Panel>
      <Panel title="⌁  Sensor Data (Live)" action={<button className="view-all" onClick={()=>setActive("Sensors")}>View All →</button>}><SensorTable compact/></Panel>
      <AIAnalysis/>
    </div>
  </main>;
}

function AlertTable({compact=false}) {
  const data=compact?alerts:alerts.concat([{time:"05:17",zone:"A-07",event:"Tilt variation detected",severity:"low"}]);
  return <div className="table-wrap"><table><thead><tr><th>Time</th><th>Zone</th><th>Event</th><th>Severity</th></tr></thead><tbody>
    {data.map((a,i)=><tr key={i}><td>{a.time}</td><td className={a.zone==="B-14"?"red-text":""}>{a.zone}</td><td>{a.event}</td><td><span className={"severity "+a.severity}>{a.severity}</span></td></tr>)}
  </tbody></table></div>;
}

function SensorTable({compact=false}) {
  const data=compact?sensors.slice(0,5):sensors;
  return <div className="table-wrap"><table><thead><tr><th>Sensor ID</th><th>Displacement</th><th>Vibration</th><th>Status</th></tr></thead><tbody>
    {data.map(s=><tr key={s.id}><td>{s.id}</td><td className={s.status!=="normal"?"red-text":""}>{s.movement}</td><td className={s.status==="critical"?"red-text":""}>{s.vibration}</td><td><span className={"status "+s.status}><i></i>{s.status}</span></td></tr>)}
  </tbody></table></div>;
}

function AIAnalysis() {
  return <Panel title="◉  AI Analysis"><div className="ai-content"><div className="risk-ring"><strong>78%</strong><span>Risk Score</span></div>
    <div className="factors">{[["Ground Displacement",42],["Vibration Increase",27],["Tilt Variation",18],["Historical Pattern",13]].map(([n,v])=><div key={n}><span>{n}</span><b>{v}%</b><i style={{width:v+"%"}}></i></div>)}</div>
  </div><div className="ai-insight"><span>💡</span><div><strong>AI Insight</strong><p>Rapid ground displacement combined with increased vibration detected in Zone B-14. High probability of subsidence in the next 72 hours.</p></div></div></Panel>;
}

function FullMineMap() {
  const [selected,setSelected]=React.useState(zones[2]);
  return <main className="page-content"><PageTitle title="Live Mine Map" desc="Real-time spatial view of underground mine conditions and sensor zones." action={<><span className="live-badge"><i></i> LIVE DATA</span><button className="select">Underground View ▾</button></>}/>
    <div className="full-map-layout"><Panel title="▧  Mine Layout & Sensor Network" action={<span className="map-updated">Updated 14:28:36</span>}><div className="full-mine-map">
      <div className="mine-grid"></div><div className="map-tunnel ft1"></div><div className="map-tunnel ft2"></div><div className="map-tunnel ft3"></div><div className="map-tunnel ft4"></div><div className="map-tunnel ft5"></div>
      {zones.map(z=><button key={z.id} className={"map-zone "+z.status+(selected.id===z.id?" selected":"")} style={{left:(parseFloat(z.id==="A-02"?"15%":z.id==="B-09"?"43%":z.id==="B-14"?"61%":"78%")),top:(z.id==="A-02"?"25%":z.id==="B-09"?"32%":z.id==="B-14"?"55%":"65%")}} onClick={()=>setSelected(z)}><span></span><b>{z.id}</b></button>)}
      <div className="full-map-legend"><div><i className="normal"></i>Normal</div><div><i className="warning"></i>Warning</div><div><i className="critical"></i>Critical</div></div><div className="map-scale">100 m</div><div className="north">N</div>
    </div></Panel>
    <aside className="map-side"><Panel title="Selected Zone"><div className="selected-zone-body"><div className="zone-head"><span className={"big-status "+selected.status}></span><div><small>SELECTED ZONE</small><h2>Zone {selected.id}</h2></div></div>
      <div className={"risk-banner "+selected.status}><span>AI RISK</span><strong>{selected.risk}%</strong></div>
      <div className="zone-metrics"><div><small>Ground Movement</small><strong>{selected.movement} mm</strong></div><div><small>Active Sensors</small><strong>{selected.sensors} / 12</strong></div><div><small>Vibration</small><strong>{selected.vibration} mm/s</strong></div><div><small>Last Reading</small><strong>14:28:31</strong></div></div>
      <button className="primary-btn">View Zone Details →</button></div></Panel>
      <Panel title="Mine Zones"><div className="zone-list">{zones.map(z=><button key={z.id} className="zone-row" onClick={()=>setSelected(z)}><span className={"zone-dot "+z.status}></span><span><b>Zone {z.id}</b><small>{z.movement} mm movement</small></span><strong>{z.risk}%</strong></button>)}</div></Panel>
    </aside></div>
  </main>;
}

function SensorsPage() {
  const [filter,setFilter]=React.useState("all");
  const visible=sensors.filter(s=>filter==="all"||s.status===filter);
  return <main className="page-content"><PageTitle title="Sensor Monitoring" desc="Low-cost IoT sensor network for continuous ground-condition monitoring." action={<span className="live-badge"><i></i> 48 / 50 ONLINE</span>}/>
    <div className="sensor-summary"><div><small>Total Sensors</small><strong>50</strong></div><div><small>Online</small><strong className="green-text">48</strong></div><div><small>Warnings</small><strong className="yellow-text">8</strong></div><div><small>Critical</small><strong className="red-text">2</strong></div><div><small>Avg. Battery</small><strong>86%</strong></div></div>
    <Panel title="⌁  Live Sensor Network" action={<div className="filters">{["all","normal","warning","critical"].map(x=><button key={x} className={filter===x?"filter active":"filter"} onClick={()=>setFilter(x)}>{x}</button>)}</div>}>
      <div className="sensor-grid">{visible.map(s=><div className={"sensor-card "+s.status} key={s.id}><div className="sensor-card-head"><div><span className={"sensor-state "+s.status}></span><strong>{s.id}</strong></div><span className={"severity "+(s.status==="normal"?"low":s.status)}>{s.status}</span></div><small>Zone {s.zone}</small><div className="sensor-values"><div><span>Displacement</span><b>{s.movement}</b></div><div><span>Vibration</span><b>{s.vibration}</b></div><div><span>Tilt</span><b>{s.tilt}</b></div></div><div className="battery"><span>Battery</span><b>{s.battery}%</b><i><em style={{width:s.battery+"%"}}></em></i></div></div>)}</div>
    </Panel>
  </main>;
}

function PredictionPage() {
  return <main className="page-content"><PageTitle title="AI Subsidence Prediction" desc="Machine-learning analysis of displacement, vibration, tilt and historical patterns." action={<span className="model-badge">MODEL v1.4 • 96.2% ACCURACY</span>}/>
    <div className="prediction-top"><div className="big-risk panel"><div className="big-risk-ring"><strong>78%</strong><span>HIGH RISK</span></div><div><small>Current AI Risk Assessment</small><h2>Zone B-14 requires attention</h2><p>Rapid displacement growth is combined with elevated vibration and tilt variation.</p><button className="primary-btn">Open Early Warning →</button></div></div>
      <div className="panel prediction-kpis"><div><small>Predicted 72h Movement</small><strong>26.8 mm</strong></div><div><small>Risk Change</small><strong className="red-text">+31%</strong></div><div><small>Confidence</small><strong>94.6%</strong></div></div></div>
    <Panel title="⌁  72-Hour Subsidence Forecast" action={<button className="select">Zone B-14 ▾</button>}><PredictionChart large/></Panel>
    <div className="prediction-bottom"><Panel title="AI Contributing Factors"><div className="factor-list">{[["Ground Displacement","42%","High"],["Vibration Increase","27%","High"],["Tilt Variation","18%","Medium"],["Historical Pattern","13%","Low"]].map(f=><div key={f[0]}><span>{f[0]}</span><strong>{f[1]}</strong><em>{f[2]}</em><i><b style={{width:f[1]}}></b></i></div>)}</div></Panel>
      <Panel title="AI Recommendation"><div className="recommendation"><div className="recommend-icon">⚠</div><h3>Inspect Zone B-14 within 6 hours</h3><p>Reduce personnel exposure in the affected area and verify structural conditions before continuing operations.</p><div className="recommend-actions"><button className="primary-btn">Acknowledge</button><button className="secondary-btn">Create Inspection</button></div></div></Panel></div>
  </main>;
}

function AlertsPage() {
  const [ack,setAck]=React.useState(false);
  return <main className="page-content"><PageTitle title="Early Warning & Alerts" desc="Prioritized safety events generated from sensor data and AI predictions." action={<span className="alert-status">3 ACTIVE ALERTS</span>}/>
    <div className="alert-hero"><div><span className="warning-icon">⚠</span><div><small>CRITICAL PREDICTION</small><h1>Zone B-14 — High Subsidence Risk</h1><p>AI predicts 26.8 mm displacement within 72 hours with a 78% risk probability.</p></div></div><div className="alert-hero-actions"><button className="primary-btn" onClick={()=>setAck(true)}>{ack?"ACKNOWLEDGED":"ACKNOWLEDGE ALERT"}</button><button className="secondary-btn">View Zone</button></div></div>
    <div className="alert-layout"><Panel title="Recent Safety Events"><AlertTable/></Panel><Panel title="Recommended Response"><div className="response-list"><div><b>01</b><span><strong>Inspect affected zone</strong><small>Complete structural inspection within 6 hours.</small></span></div><div><b>02</b><span><strong>Limit personnel exposure</strong><small>Restrict non-essential personnel from B-14.</small></span></div><div><b>03</b><span><strong>Continue sensor observation</strong><small>Maintain continuous monitoring and verify trends.</small></span></div></div></Panel></div>
  </main>;
}

function ReportsPage() {
  return <main className="page-content"><PageTitle title="Reports & Analytics" desc="Historical mine-condition trends for safety review and decision support." action={<button className="primary-btn">＋ Generate Report</button>}/>
    <div className="report-kpis"><div className="panel"><small>30-Day Avg. Risk</small><strong>24%</strong><span className="green-text">↓ 8% vs previous period</span></div><div className="panel"><small>Total Alerts</small><strong>37</strong><span>5 high severity</span></div><div className="panel"><small>Predictions Evaluated</small><strong>142</strong><span className="green-text">96.2% model accuracy</span></div><div className="panel"><small>Sensor Uptime</small><strong>97.4%</strong><span className="green-text">Excellent</span></div></div>
    <Panel title="Subsidence Trend — Last 30 Days"><PredictionChart large/></Panel>
    <div className="report-grid"><Panel title="Zone Risk Summary"><table className="report-table"><thead><tr><th>Zone</th><th>Current Risk</th><th>Movement</th><th>Trend</th></tr></thead><tbody>{zones.map(z=><tr key={z.id}><td>Zone {z.id}</td><td><span className={"status-chip "+z.status}>{z.risk}%</span></td><td>{z.movement} mm</td><td>{z.status==="critical"?"↑ Rapid":z.status==="warning"?"↑ Rising":"→ Stable"}</td></tr>)}</tbody></table></Panel>
      <Panel title="Recent Generated Reports"><div className="report-files">{["Weekly Mine Safety Report","AI Prediction Accuracy Report","Sensor Health Report","Zone B-14 Incident Assessment"].map((x,i)=><div key={x}><span>▤</span><b>{x}<small>PDF • Sep {14-i}, 2026</small></b><button>Open →</button></div>)}</div></Panel></div>
  </main>;
}

function SettingsPage() {
  return <main className="page-content"><PageTitle title="System Settings" desc="Configure monitoring thresholds, alert channels and model preferences."/>
    <div className="settings-grid"><Panel title="Monitoring Thresholds"><SettingRow name="Warning Displacement" value="12 mm"/><SettingRow name="Critical Displacement" value="20 mm"/><SettingRow name="Warning Vibration" value="3.0 mm/s"/><SettingRow name="Critical Vibration" value="5.0 mm/s"/></Panel>
      <Panel title="Alert Preferences"><Toggle name="Critical alerts" on/><Toggle name="AI prediction alerts" on/><Toggle name="Sensor offline alerts" on/><Toggle name="Daily safety summary" /></Panel>
      <Panel title="AI Model"><SettingRow name="Model Version" value="v1.4"/><SettingRow name="Prediction Window" value="72 hours"/><SettingRow name="Confidence Threshold" value="85%"/><SettingRow name="Last Trained" value="Sep 10, 2026"/></Panel>
      <Panel title="System Information"><SettingRow name="Connected Sensors" value="48 / 50"/><SettingRow name="Data Refresh" value="10 seconds"/><SettingRow name="API Status" value="Online"/><SettingRow name="Database" value="PostgreSQL"/></Panel></div>
  </main>;
}
function SettingRow({name,value}){return <div className="setting-row"><span>{name}</span><b>{value}</b></div>}
function Toggle({name,on=false}){const [v,setV]=React.useState(on);return <button className="toggle-row" onClick={()=>setV(!v)}><span>{name}</span><i className={v?"on":""}><b></b></i></button>}

function PageTitle({title,desc,action}){return <div className="page-title-row"><div><h1>{title}</h1><p>{desc}</p></div>{action&&<div className="page-actions">{action}</div>}</div>}

function App(){
  const [active,setActive]=React.useState("Dashboard");
  const page = active==="Dashboard"?<Dashboard setActive={setActive}/>:
    active==="Mine Map"?<FullMineMap/>:active==="Sensors"?<SensorsPage/>:
    active==="AI Prediction"?<PredictionPage/>:active==="Alerts"?<AlertsPage/>:
    active==="Reports"?<ReportsPage/>:<SettingsPage/>;

  return <div className="app"><Sidebar active={active} setActive={setActive}/><div className="main"><Header onAlert={()=>setActive("Alerts")}/>{page}</div></div>;
}

createRoot(document.getElementById("root")).render(<App/>);
