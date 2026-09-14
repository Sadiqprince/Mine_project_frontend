# MineSafe AI Backend Scaffold

Run from this folder:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API documentation:
- http://127.0.0.1:8000/docs
- http://127.0.0.1:8000/api/health

The current API returns demo data. The next step is replacing these in-memory values with PostgreSQL + real sensor ingestion + the AI model.
