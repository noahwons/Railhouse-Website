# Railhouse Bar & Grill Website

A full-stack website for Railhouse Bar and Grill - Slots & Wings.

## Project Structure

```
Railhouse-Website/
├── frontend/          # React (Vite) frontend
└── backend/           # Node.js (Express) backend
```

## Getting Started

### Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on http://localhost:3000

## API Endpoints

- `GET /api/menu` — Full menu
- `GET /api/menu/:category` — Menu by category (wings, appetizers, burgers, drinks)
- `GET /api/events` — Weekly events and specials
- `POST /api/contact` — Contact form submission
- `GET /api/health` — Health check
