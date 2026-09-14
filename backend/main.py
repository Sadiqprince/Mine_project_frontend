
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="MineSafe AI API",
    description="API scaffold for mine subsidence monitoring, prediction and early warning.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SENSORS = [
    {"id":"S-101","zone":"A-02","movement":4.2,"vibration":1.2,"tilt":0.3,"battery":94,"status":"normal"},
    {"id":"S-102","zone":"A-02","movement":7.8,"vibration":2.1,"tilt":0.5,"battery":91,"status":"normal"},
    {"id":"S-103","zone":"B-09","movement":14.2,"vibration":3.8,"tilt":0.8,"battery":81,"status":"warning"},
    {"id":"S-104","zone":"B-14","movement":24.7,"vibration":6.2,"tilt":1.7,"battery":76,"status":"critical"},
    {"id":"S-105","zone":"C-03","movement":5.1,"vibration":1.4,"tilt":0.4,"battery":88,"status":"normal"},
    {"id":"S-106","zone":"B-14","movement":21.8,"vibration":5.7,"tilt":1.5,"battery":72,"status":"critical"},
    {"id":"S-107","zone":"B-09","movement":11.6,"vibration":3.1,"tilt":0.7,"battery":84,"status":"warning"},
    {"id":"S-108","zone":"C-03","movement":3.9,"vibration":1.1,"tilt":0.2,"battery":97,"status":"normal"},
]

ZONES = [
    {"id":"A-02","status":"normal","movement":4.2,"vibration":1.2,"tilt":0.3,"risk":12,"sensors":12},
    {"id":"B-09","status":"warning","movement":14.2,"vibration":3.8,"tilt":0.8,"risk":46,"sensors":12},
    {"id":"B-14","status":"critical","movement":24.7,"vibration":6.2,"tilt":1.7,"risk":78,"sensors":12},
    {"id":"C-03","status":"normal","movement":5.1,"vibration":1.4,"tilt":0.4,"risk":16,"sensors":12},
]

ALERTS = [
    {"time":"14:28","zone":"B-14","event":"High subsidence predicted","severity":"high"},
    {"time":"12:16","zone":"B-09","event":"Vibration increase","severity":"medium"},
    {"time":"10:03","zone":"C-03","event":"Displacement above threshold","severity":"medium"},
    {"time":"08:42","zone":"A-02","event":"Sensor offline","severity":"low"},
    {"time":"06:21","zone":"B-11","event":"Unusual ground movement","severity":"medium"},
]

@app.get("/")
def root():
    return {"name":"MineSafe AI API","status":"online","message":"Backend scaffold is running."}

@app.get("/api/health")
def health():
    return {"status":"ok","service":"minesafe-api","timestamp":datetime.now().isoformat()}

@app.get("/api/dashboard")
def dashboard():
    return {
        "status":"SAFE",
        "risk_score":18,
        "ground_displacement":12.4,
        "total_settlement":18.7,
        "active_sensors":48,
        "total_sensors":50,
        "temperature":28,
        "updated_at":datetime.now().isoformat(),
    }

@app.get("/api/sensors")
def sensors():
    return {"items":SENSORS,"count":len(SENSORS),"online":48,"total":50}

@app.get("/api/zones")
def zones():
    return {"items":ZONES}

@app.get("/api/alerts")
def alerts():
    return {"items":ALERTS,"active":3}

@app.get("/api/predictions")
def predictions():
    return {
        "zone":"B-14",
        "risk_probability":78,
        "predicted_subsidence_72h":26.8,
        "confidence":94.6,
        "risk_level":"HIGH",
        "recommendation":"Inspect Zone B-14 within the next 6 hours.",
        "factors":[
            {"name":"Ground Displacement","percentage":42},
            {"name":"Vibration Increase","percentage":27},
            {"name":"Tilt Variation","percentage":18},
            {"name":"Historical Pattern","percentage":13},
        ],
        "forecast":[
            {"time":"Now","value":12.4,"type":"actual"},
            {"time":"12h","value":14.8,"type":"actual"},
            {"time":"24h","value":16.2,"type":"actual"},
            {"time":"48h","value":20.8,"type":"predicted"},
            {"time":"72h","value":26.8,"type":"predicted"},
        ],
    }
