
# AppointmentApp

Lightweight meeting planner: Angular frontend + Express/SQLite backend. Works locally or on Heroku (serving the built Angular app from Node).

## Highlights
- Add, view, delete appointments
- Mark appointments as important
- Month calendar view with per-day counts
- SQLite persistence locally (ephemeral on Heroku)

## Tech stack
- Angular 16 (TypeScript)
- Node.js 18 + Express 5
- SQLite (`appointments.db`)

## Quick start (local dev)
Requirements: Node.js 18+, npm

```powershell
# install dependencies
npm ci

# start backend API (http://localhost:3000)
node server.js

# in another terminal: start frontend (dev)
npx ng serve --open
```

## Local production build & run
```powershell
npm ci
npm run build          # builds frontend to dist/appointment-app
npm start              # runs server.js and serves dist
```

## Environment variables
- `PORT` – listen port (default 3000; overridden on Heroku)
- `DATABASE_URL` – SQLite file path (default `./appointments.db`)

## REST API
- `GET /appointments` – list appointments
- `POST /appointments` – { title, date, time, notes?, important? }
- `DELETE /appointments/:id` – delete appointment

## Tests
```powershell
npm test -- --watch=false --browsers=ChromeHeadless
```

## Heroku deploy (short)
1) `heroku create <app-name>`
2) `git push heroku main`
3) Note: SQLite on Heroku is ephemeral — use Heroku Postgres for production. See `HEROKU_DEPLOYMENT.md` for details.

## Why it’s candidate-friendly
- Clear FE/BE split, simple data model
- Simple manual deploy to Heroku
- Minimal env config (prod/dev) with relative-API fallback in production build

## Author
Rafal Wojcicki
