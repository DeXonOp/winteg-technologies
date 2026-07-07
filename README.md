# Winteg Technologies

Full-service digital agency website — React frontend + FastAPI backend.

## Project Structure

```
winteg-technologies/
├── run.py                  ← Start both servers with one command
├── client/                 ← React + TypeScript + Vite frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       └── components/
│           ├── About/
│           ├── Contact/
│           ├── Footer/
│           ├── Hero/
│           ├── Navbar/
│           ├── Portfolio/
│           ├── Services/
│           ├── TechStack/
│           ├── Testimonials/
│           └── WhyChooseUs/
└── server/                 ← Python FastAPI backend
    ├── requirements.txt
    ├── .env.example
    └── app/
        ├── main.py         ← FastAPI entry point
        ├── config.py       ← Settings / env vars
        ├── models/         ← Pydantic schemas
        ├── routers/        ← API endpoints
        │   ├── health.py
        │   ├── contact.py
        │   ├── projects.py
        │   └── newsletter.py
        ├── services/       ← Business logic
        │   └── email_service.py
        └── utils/          ← Helper functions
            └── response.py
```

## Quick Start

### Prerequisites
- **Node.js** (v18+) and npm
- **Python** (3.10+) and pip

### Run Everything (Recommended)

```bash
python run.py
```

This will:
1. Auto-install npm dependencies if missing
2. Auto-install Python dependencies if missing
3. Start the Vite frontend on **http://localhost:5173**
4. Start the FastAPI backend on **http://localhost:8000**

### Run Individually

```bash
# Frontend only
python run.py --client

# Backend only
python run.py --server
```

### Manual Setup

```bash
# Frontend
cd client
npm install
npm run dev

# Backend (in another terminal)
cd server
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

| Method | Endpoint            | Description                    |
|--------|---------------------|--------------------------------|
| GET    | `/api/health`       | Health check                   |
| POST   | `/api/contact`      | Submit contact form            |
| GET    | `/api/projects`     | List portfolio projects        |
| GET    | `/api/projects/:id` | Get single project             |
| POST   | `/api/newsletter`   | Subscribe to newsletter        |
| GET    | `/api/docs`         | Swagger API documentation      |

## Tech Stack

**Frontend**: React 19, TypeScript, Vite  
**Backend**: Python, FastAPI, Pydantic, Uvicorn
