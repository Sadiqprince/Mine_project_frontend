# MineSafe AI Frontend + API Scaffold

AI-Based Low-Cost Mine Subsidence Monitoring, Prediction & Early Warning System.

## Frontend

```bash
npm install
npm run dev
```

## Backend API scaffold

Open a second terminal:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs:
`http://127.0.0.1:8000/docs`

## Current status

The UI is a complete hackathon prototype with simulated data.
The backend now provides API endpoints for:
- dashboard metrics
- sensors
- mine zones
- alerts
- AI predictions
- health check

`src/api.js` is ready for frontend API calls.

## Next integration

1. Replace UI hardcoded values with API responses.
2. Add PostgreSQL.
3. Add real sensor ingestion.
4. Connect the AI prediction model.
5. Implement real-time updates/WebSockets.
6. Add authentication and role-based access.
